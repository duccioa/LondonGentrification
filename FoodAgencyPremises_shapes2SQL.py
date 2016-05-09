import pandas as pd
from mpl_toolkits.basemap import Basemap #for mapping
import fiona #for reading shapefiles
from itertools import chain
from shapely.geometry import Polygon





# WARDS to SQL

shp = fiona.open('./py_functions/Python_Points_Maps/Data/london_wards.shp')
bds = shp.bounds
shp.close()
extra = 0.01
ll = (bds[0], bds[1])
ur = (bds[2], bds[3])
coords = list(chain(ll, ur))
w, h = coords[2] - coords[0], coords[3] - coords[1]

#Create a basemap instance to plot maps on

m = Basemap(
    projection = 'tmerc',
    lon_0 =-2,
    lat_0=49.,
    ellps = 'WGS84',
    llcrnrlon=coords[0] - extra * w,
    llcrnrlat=coords[1] - extra + 0.01 * h,
    urcrnrlon=coords[2] + extra * w,
    urcrnrlat=coords[3] + extra +0.01* h,
    lat_ts=0,
    resolution='i',
    suppress_ticks = True)

m.readshapefile('./py_functions/Python_Points_Maps/Data/london_wards',
    'london',
    color = 'none',
    zorder=2)

#Create dataframe for polygons

df_map = pd.DataFrame({
        'ward_name':[ward['NAME'] for ward in m.london_info],
        'ward_code':[ward['CODE'] for ward in m.london_info]})

df_map['poly'] = [Polygon(xy) for xy in m.london]

# Calculate area fields
df_map['area_m'] = df_map['poly'].map(lambda x: x.area)
df_map['area_km'] = df_map['area_m']/100000
# Save base map
df_map.to_csv('./Data/ShapesPython/london_wards.csv', index = False, index_label = False)


# BOROUGHS to SQL

shp = fiona.open('./Data/ESRI/Boroughs/London_Boroughs_WSG84.shp')
bds = shp.bounds
shp.close()
extra = 0.01
ll = (bds[0], bds[1])
ur = (bds[2], bds[3])
coords = list(chain(ll, ur))
w, h = coords[2] - coords[0], coords[3] - coords[1]

#Create a basemap instance to plot maps on

m = Basemap(
    projection = 'tmerc',
    lon_0 =-2,
    lat_0=49.,
    ellps = 'WGS84',
    llcrnrlon=coords[0] - extra * w,
    llcrnrlat=coords[1] - extra + 0.01 * h,
    urcrnrlon=coords[2] + extra * w,
    urcrnrlat=coords[3] + extra +0.01* h,
    lat_ts=0,
    resolution='i',
    suppress_ticks = True)

m.readshapefile('./Data/ESRI/Boroughs/London_Boroughs_WSG84',
    'london',
    color = 'none',
    zorder=2)

#Create dataframe for polygons

df_map = pd.DataFrame({
        'poly':[Polygon(xy) for xy in m.london],
        'borough_name':[ward['name'] for ward in m.london_info],
        'borough_code':[ward['code'] for ward in m.london_info]})

# Calculate area fields
df_map['area_m'] = df_map['poly'].map(lambda x: x.area)
df_map['area_km'] = df_map['area_m']/100000
# Save base map
df_map.to_csv('./Data/ShapesPython/london_boroughs.csv', index = False, index_label = False)