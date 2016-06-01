import geopandas as gp
import pandas as pd

# Add all the relevant features to the wards shapefile and export it to GeoJson for the visualisation on ggoglemap

wards=gp.GeoDataFrame.from_file("./Data/ESRI/Simplified/London_Ward_CityMerged_WGS84.shp") #from shapefile to GeoDataFrame
geometry = gp.GeoSeries(wards['geometry'])
wards_sub = wards[['GSS_CODE', 'HECTARES']]
att = pd.read_csv('./Data/spatial_analysis_wards_output.csv')
att['ward_code'][624] = 'E09000001'
att.head()


df = pd.merge(right = wards_sub, left = att,  right_on = 'GSS_CODE', left_on = 'ward_code')
field_list = df.columns.values
print(field_list)
fields = ['ward_code', 'ward_name', 'code','Code', 'med_income_2012_13', 'income_color',
          'cafe_smooth_lq_color', 'coffee_smooth_lq_color', #'grill_smooth_color',
 'pizza_smooth_lq_color', 'wine_smooth_lq_color', 'sushi_smooth_lq_color',
 'thai_smooth_lq_color', 'chicken_smooth_lq_color', 'fried_smooth_lq_color',
 'fish_smooth_lq_color', 'kebab_smooth_lq_color',
 'costcutter_smooth_lq_color', 'waitrose_smooth_lq_color',
 'sainsburys_smooth_lq_color', 'tesco_smooth_lq_color',
          'cafe_morans_color',
 'coffee_morans_color', 'pizza_morans_color', 'wine_morans_color',
 'sushi_morans_color', 'thai_morans_color', 'chicken_morans_color',
 'fried_morans_color', 'fish_morans_color', 'kebab_morans_color',
 'costcutter_morans_color', 'waitrose_morans_color',
 'sainsburys_morans_color', 'tesco_morans_color', 'grill_morans_color','cluster_colors', 'GSS_CODE']
df2 = pd.DataFrame()
for i in fields:
    df2[i] = df[i]

df2.rename(columns={'sainsburys_morans_color': 'sainsbury_morans_color', 'sainsburys_smooth_lq_color': 'sainsbury_smooth_lq_color'}, inplace=True)


geo_df = gp.GeoDataFrame(df2, crs=None, geometry=geometry)

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
