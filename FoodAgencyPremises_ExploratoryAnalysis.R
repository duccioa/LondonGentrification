require(sp)
require(rgdal)
require(data.table)
require(plyr)
source('/Users/duccioa/Documents/02_DataScience/02_Functions/add_alpha.R')
source('./py_functions/FUN_plot_tokens.R')
source('./py_functions/FUN_plot_byClassInt.R')

######### PREPARE DATA #########
tokens = read.csv('./Data/FoodPremises/tokens_spatial.csv', stringsAsFactors = F)
london = readOGR('./Data/ESRI/', 'London_Ward_CityMerged')
london_bor = readOGR('./Data/ESRI/', 'London_Borough_Excluding_MHW')
income = read.csv('./Data/modelled-household-income-estimates-wards.csv', stringsAsFactors = F)
foodpremises = data.table(read.csv('./Data/FoodPremises/london_premises.csv', stringsAsFactors = F))

tokens = tokens[complete.cases(tokens[,c(2,3)]),]
tokens = data.table(tokens)

income = income[,c(1,2,3,4,16,28)]; names(income)[1] = 'CODE_WARDS'

proj4string(london) = CRS('+init=epsg:27700')# From National British Grid
london = spTransform(london, CRS('+init=epsg:4326'))# to WSG84
proj4string(london_bor) = CRS('+init=epsg:27700')# From National British Grid
london_bor = spTransform(london_bor, CRS('+init=epsg:4326'))# to WSG84

sp_data = london@data;  names(sp_data)[2] = 'CODE_WARDS' 
sp_data = join(sp_data, income)
london@data = sp_data;rm(sp_data)




png('./Graphs/EstimatedIncome2013_MeanMedian.png', width = 800, height = 800)
par(cex = 1.5)
plot(income$Median.2012_13, income$Mean.2012_13, 
     pch = 20, cex = 1, xlim = c(0,200000), ylim = c(0,200000), 
     col = add.alpha('blue', 0.2), 
     xlab = 'Estimated Median Income',
     ylab = 'Estimated Mean Income')
abline(0, 1, col = 'red')
title(main = 'Estimated Income 2013 by London Wards', line = 2)
title(main = 'Median against mean', line = 1)
dev.off()


######### PLOT TOKENS #########
summary_appearances = plot_tokens(tokens,
                                  token_lst = explore_token, 
                                  bg_map = london, bg_map2 = london_bor,
                                  alpha = .5, cex_points = 3,
                                  cex.title = 5, h = 2500, w = 2500)

# Explore 'kitchen'
kitchen = foodpremises[grepl('kitchen', foodpremises$BusinessName, ignore.case = T),]





test = foodpremises[grepl('nature', foodpremises$BusinessName, ignore.case = T),]




############## Company Names #########
comp = read.csv('./Data/SORT_DATA/sorted_companies_house_data.csv')
