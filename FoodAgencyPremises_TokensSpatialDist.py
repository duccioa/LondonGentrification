import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
from py_functions import textFunctions as tf
import pyproj #for converting coordinate systems
import imp # debugging
imp.reload(tf) # debugging
plt.style.use('ggplot')

data_folder = './Data/FoodPremises/'

# Load the complete csv parsed with WIP_parse_data.py
df = pd.read_csv('%slondon_premises.csv' % data_folder)
df.drop('Index', axis=1, inplace=True)

df = tf.token_spatial(df)
df.to_csv('%stokens_spatial.csv' % data_folder, sep=',', header=True, index=False, index_label=False)

#Convert easting and norththing colloums to an array to allor pyproj.transform operation to work
wgs84=pyproj.Proj("+init=EPSG:4326") # LatLon with WGS84 datum used by GPS units and Google Earth
osgb36=pyproj.Proj("+init=EPSG:27700") # UK Ordnance Survey, 1936 datum
E_N_array = df.as_matrix(columns=['lon', 'lat'])
x, y = WGS84_x, WGS84_y = pyproj.transform(osgb36, wgs84, E_N_array[:,0], E_N_array[:,1])
#Put back into dataframe
df['lon'] = x
df['lat'] = y
df = df.replace([np.inf, -np.inf], np.nan).dropna(subset=['lat', 'lon'], how="all")
df.to_csv('%stokens_spatial_WGS84.csv' % data_folder, sep=',', hdfeader=True, index=False, index_label=False)
