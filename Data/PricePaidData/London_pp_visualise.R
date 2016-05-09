#Install packages
install.packages(c('spatstat','sp', 'rgeos', 'maptools', 'GISTools'))
install.packages(c('rgdal'))

#load library
library(spatstat)
library(sp)
library(rgeos)
library(maptools)
library(GISTools)

#Set working directory
setwd("C:/Users/Claire/Documents/University/Spatial Data Capture, Storage and Analysis/Price Paid Data")

#String for British national grid projection
BNG = "+init=epsg:27700"

#String for WGS84
WGS84 = "+init=epsg:4326"

#Load map of London boroughs
BoroughMap <- readShapePoly("London_Boroughs.shp", proj4string = CRS(BNG))
#BoroughMap <-spTransform(BoroughMap, CRS("+proj=longlat +datum=WGS84"))

#Read the price paid records for London
London_pp = read.csv("London_pp.csv")

#Create the coordinate pairs for the postcode coordinates
xy=cbind(London_pp$Eastings, London_pp$Northings)

#Create spatial points object with coordinate pairs
xy.sp = SpatialPoints(xy,proj4string = CRS(BNG))

#Create spatial points dataframe by joining price paid dataframe to points. 
xy.spdf = SpatialPointsDataFrame(xy.sp, London_pp)


#Plot the price paid points on top of the borough map

plot(xy.spdf, pch=1, col = 'red')
plot(BoroughMap, add=T)

summary (xy.sp)
summary (BoroughMap)

