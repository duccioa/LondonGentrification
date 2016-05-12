import geopandas as gp
import pandas as pd
import numpy as np
from py_functions import color_assign as ca
# Add all the relevant features to the wards shapefile and export it to GeoJson for the visualisation on ggoglemap
wards=gp.GeoDataFrame.from_file("./Data/ESRI/Simplified/London_Ward_CityMerged_WGS84.shp") #from shapefile to GeoDataFrame
income = pd.read_csv("./Data/modelled-household-income-estimates-wards.csv")
income_sub = income[['Code', 'Ward name', 'LAD code', 'Borough', 'Median 2012_13']]

#Replace these two lines with the assign_color function when it works
income_col = pd.read_csv('./Data/claire_ward_variables.csv')
income_col.drop(['Ward Name', 'Median Income 2012_13', 'Income Category'], axis=1, inplace=True)
#

med_income = np.median(income_sub['Median 2012_13'])
income_lab = []
for i in range(len(income_sub)):
    if income_sub['Median 2012_13'][i] <= med_income:
        lab = 'LOW'
    else:
        lab = 'HIGH'
    income_lab.append(lab)

m = pd.merge(left=wards,right=income_sub, left_on='GSS_CODE', right_on='Code')
m = pd.merge(left=m, right=income_col, left_on='GSS_CODE', right_on = 'Code')

df = gp.GeoDataFrame({'GSS_code':m['GSS_CODE'],
                      'LB_GSS_Code':m['LB_GSS_CD'],
                      'WardName':m['NAME'],
                      'BoroughName':m['BOROUGH'],
                      'MedianIncome_2012_13':m['Median 2012_13'],
                      'IncomeLabel':income_lab,
                      'Area_Km2':round(m['HECTARES']/100,2),
                      'geometry': m['geometry'],
                      'MedianIncome_col': m['Income Colour']}, index=range(len(m)))

df.to_csv('./Data/WardsIncome.csv', index=False, index_label=True)

# DEBUG the function
#df['Income Color'] = df.apply(lambda row: ca.color_assign(row, df['MedianIncome_2012_13'], 'MedianIncome_2012_13'), axis=1)

df['geometry'] = gp.GeoSeries(df['geometry']) # Reconvert the geometry due to a bug

geo_wards = df.to_json()
string = open("./Data/ESRI/Simplified/London_Ward_CityMerged_WGS84.geojson", "w")
string.write(geo_wards)
string.close()
string = open("./API/data/geo/London_Ward_CityMerged_WGS84.geojson", "w")
string.write(geo_wards)
string.close()
