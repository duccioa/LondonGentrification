require(sp)
require(rgdal)
# The shapefiles have been previously simplified with mapshaper
wards = readOGR('./Data/ESRI/Simplified', 'London_Ward_CityMerged')
proj4string(wards) = CRS('+init=epsg:27700')
wardsWGS = spTransform(wards, CRS('+init=epsg:4326'))
bor = readOGR('./Data/ESRI/Simplified', 'england_lad_2011Polygon')
proj4string(bor) = CRS('+init=epsg:27700')
borWGS = spTransform(bor, CRS('+init=epsg:4326'))
writeOGR(wardsWGS, './Data/ESRI/Simplified', 'London_Ward_CityMerged_WGS84', driver="ESRI Shapefile")
writeOGR(borWGS, './Data/ESRI/Simplified', 'england_lad_2011Polygon_WGS84', driver="ESRI Shapefile")

