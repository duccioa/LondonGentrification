import geopandas as gp
import pandas as pd
import numpy as np
# Add all the relevant features to the wards shapefile and export it to GeoJson for the visualisation on ggoglemap

import os
os.chdir("C:/Users/Claire/Google Drive/LondonGentrification")

wards=gp.GeoDataFrame.from_file("./Data/ESRI/Simplified/London_Ward_CityMerged_WGS84.shp") #from shapefile to GeoDataFrame
geometry = gp.GeoSeries(wards['geometry'])
wards_sub = wards[['GSS_CODE', 'HECTARES']]
att = pd.read_csv('./Data/spatial_analysis_wards_output.csv')
att['ward_code'][624] = 'E09000001'
att.head()


df = pd.merge(right = wards_sub, left = att,  right_on = 'GSS_CODE', left_on = 'ward_code')
field_list = df.columns.values
print(field_list)

df.drop('Unnamed: 0', 1, inplace = True)
df.drop('position', 1, inplace = True)

geo_df = gp.GeoDataFrame(df, crs=None, geometry=geometry)

geo_wards = geo_df.to_json() # add default handler to avoid error of recurion level reached, see pandas IO tools documentation
string = open("./Data/ESRI/Simplified/London_Ward_CityMerged_WGS84.geojson", "w")
string.write(geo_wards)
string.close()
string = open("./API/public_html/data/geo/London_Ward_CityMerged_WGS84.geojson", "w")
string.write(geo_wards)
string.close()




boroughs=gp.GeoDataFrame.from_file("./Data/ESRI/Simplified/London_Boroughs_WSG84.shp") #from shapefile to GeoDataFrame
geometry_bor = gp.GeoSeries(boroughs['geometry'])
geo_df_bor = gp.GeoDataFrame(boroughs, crs=None, geometry=geometry_bor)

geo_bor = geo_df_bor.to_json() # add default handler to avoid error of recurion level reached, see pandas IO tools documentation
string = open("./Data/ESRI/Simplified/London_Boroughs_WGS84.geojson", "w")
string.write(geo_bor)
string.close()
string = open("./API/public_html/data/geo/London_Boroughs_WGS84.geojson", "w")
string.write(geo_bor)
string.close()
