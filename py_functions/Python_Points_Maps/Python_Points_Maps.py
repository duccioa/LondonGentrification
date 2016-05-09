import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.cm as cm
import matplotlib.colors
from matplotlib.colors import Normalize
from matplotlib.collections import PatchCollection
from mpl_toolkits.basemap import Basemap #for mapping
from shapely.geometry import Point, Polygon, MultiPoint, MultiPolygon
from shapely.prepared import prep #for processing shapefiles to make operations quicker
from pysal.esda.mapclassify import Natural_Breaks as nb
from descartes import PolygonPatch #to map polygons using matplotlib
import fiona #for reading shapefiles
from itertools import chain
import pyproj #for converting coordinate systems
from py_functions import colorbar as cb

from shapely.geometry import Polygon
from shapely.ops import cascaded_union

#Clear Column Headers for Postcode Files
pc_headers = ['Postcode', 'Positional_quality_indicator', 'E',
              'N', 'Country_code', 'NHS_regional_HA_code',
              'NHS_HA_code', 'Admin_county_code', 'Admin_district_code',
              'Admin_ward_code']

#Code to import and join all postcode tables together for London

#List of postcode districts that apply to London
Lon_pc_dis_lst = ['ec', 'wc', 'e', 'n', 'nw', 'se', 'sw', 'w', 'br', 'cr',
              'da', 'en', 'ha', 'ig', 'kt', 'rm', 'sm', 'tw', 'ub', 'wd']

#Generate list of file directories for concatenation
files_lst = []
direct = "./py_functions/Python_Points_Maps/London_Postcodes_Data/"

for x in Lon_pc_dis_lst:
    files_lst.append( direct + x +'.csv')

Lon_pc_df = pd.concat([pd.read_csv(f, header=None, names=pc_headers) for f in files_lst], axis = 0)

#Remove whitespace in postcode
Lon_pc_df['Postcode'] = Lon_pc_df['Postcode'].astype(str)
Lon_pc_df['Postcode'] = Lon_pc_df['Postcode'].map(lambda x: x.replace(" ", ""))

#Clear Column headers for imported dataset (make sure to channge to suit the current dataset! use 'Postcode' for postcode field)
pp_headers = ['Transaction_ID', 'Price', 'Transfer_Date', 'Postcode',
              'Property_Type', 'Old_New', 'Duration','PAON', 'SAON',
              'Street', 'Locality', 'Town_City','District','County', 'PPD_Category_Type', 'Record_Status']

#Import datadrame (make sure to change the file name!)
df=pd.read_csv('./py_functions/Python_Points_Maps/Data/Complete_PP_2015.csv', header=0, names=pp_headers)

#Remove white space
df['Postcode'] = df['Postcode'].astype(str)
df['Postcode'] = df['Postcode'].map(lambda x: x.replace(" ", ""))

#Convert date column to date format
df['Transfer_Date'] = pd.to_datetime(df['Transfer_Date'])

#Join easting and northing values to the existing dataframe 'df'
df_pc = df.merge(Lon_pc_df, on='Postcode', how='left')

#Add boolean field - True if a London postcode was identified
df_pc['London'] = df_pc.E.notnull()

#Create new dataframe with only London records
df_pc_London = df_pc.loc[df_pc.London == True, :]

#Make into csv
#df_pc_London[['Transaction_ID','E','N']].to_csv('./py_functions/Python_Points_Maps/Data/BNG.csv')

#Convert BNG Eastings and Northings to WGS84 Lat and lon

wgs84=pyproj.Proj("+init=EPSG:4326") # LatLon with WGS84 datum used by GPS units and Google Earth
osgb36=pyproj.Proj("+init=EPSG:27700") # UK Ordnance Survey, 1936 datum

#Convert easting and norththing colloums to an array to allor pyproj.transform operation to work
E_N_array = df_pc_London.as_matrix(columns=['E', 'N'])

x, y = WGS84_x, WGS84_y = pyproj.transform(osgb36, wgs84, E_N_array[:,0], E_N_array[:,1])

#Put back into dataframe

df_pc_London['lon'] = x
df_pc_London['lat'] = y

#Save dataframe to file
#df_pc_London.to_csv('./py_functions/Python_Points_Maps/Data/london_records.csv')

# FIONA
#Extract map boundaries
#Calculated the extent, width and height of our basemap

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
        'poly':[Polygon(xy) for xy in m.london],
        'ward_name':[ward['NAME'] for ward in m.london_info],
        'ward_code':[ward['CODE'] for ward in m.london_info]})

# Calculate area fields
df_map['area_m'] = df_map['poly'].map(lambda x: x.area)
df_map['area_km'] = df_map['area_m']/100000
# Save base map
df_map.to_csv('./Data/ShapesPython/london_wards.csv', index = False, index_label = False)


#Create dataframe with points objects

#Create point objects in map coordinates from dataframe lon and lat values

map_points = pd.Series(
    [Point(m(mapped_x, mapped_y)) for mapped_x, mapped_y in zip(df_pc_London['lon'], df_pc_London['lat'])])
points = MultiPoint(list(map_points.values))
wards_polygon = prep(MultiPolygon(list(df_map['poly'].values)))

#Create dataframe of points objects
df_map_points = pd.DataFrame({'Points':[Point(xy) for xy in points]})
df_map_points =  df_map_points.merge(df_pc_London, left_index=True, right_index=True)

#Subset data by type if desired
#df_map_points = df_map_points.loc[df_map_points.Property_Type == 'F', :]

#Merge ward Boundaries into one shape
merged_boundary = cascaded_union(MultiPolygon(list(df_map['poly'].values)))

#Identify points within boundary
df_map_points['Within_Boundary'] = df_map_points['Points'].map(lambda x: x.within(merged_boundary))

#subset dataframe to points within boundary
df_map_points_sub = df_map_points.loc[df_map_points.Within_Boundary == True, :]
df_map_points_sub = df_map_points['Within_Boundary' == True]





# SCATTER PLOT
#Making a scatter plot
df_map['patches'] = df_map['poly'].map(lambda x: PolygonPatch(x,
                                                             fc='#555555',
                                                             ec='#787878', lw=.25, alpha=.9,
                                                             zorder=4))
plt.clf()
fig = plt.figure()
ax = fig.add_subplot(111, axisbg='w', frame_on=False)

#Color

# define the colormap
cmap = plt.cm.Reds
# extract all colors from the .Reds map
cmaplist = [cmap(i) for i in range(cmap.N)]
# force the first color entry to be grey
cmaplist[0] = (.5,.5,.5,1.0)
# create the new map
cmap = cmap.from_list('Custom cmap', cmaplist, cmap.N)

# define the bins and normalize
bounds = np.linspace(0, 1000000, num=20) #Change the numbers to define bins as appropriate for data
norm = matplotlib.colors.BoundaryNorm(bounds, cmap.N)

# we don't need to pass points to m() because we calculated using map_points and shapefile polygons
dev = m.scatter(
    [geom.x for geom in df_map_points['Points']],
    [geom.y for geom in df_map_points['Points']],
    5, marker='o', lw=.25,
    facecolor=df_map_points['Price'], cmap=cmap, norm=norm, edgecolor='w',
    alpha=0.9, antialiased=True,
    label='Price Paid Points', zorder=3)

# plot boroughs by adding the PatchCollection to the axes instance
ax.add_collection(PatchCollection(df_map['patches'].values, match_original=True))

# make a color bar
plt.colorbar(dev, cmap=cmap, norm=norm, boundaries=bounds) # DEBUG

#Add copyright and source data info

smallprint = ax.text(
    1.03, 0,
    'Data From: %s\nContains Ordnance Survey data\n$\copyright$ Crown copyright and database right etc',
    ha='right', va='bottom',
    size=4,
    color='#555555',
    transform=ax.transAxes)

# Draw a map scale

m.drawmapscale(
    coords[0] + 0.08, coords[1] + 0.015,
    coords[0], coords[1],
    10.,
    barstyle = 'fancy', labelstyle='simple',
    fillcolor1='w', fillcolor2 = '#555555',
    fontcolor='#555555',
    zorder=5)

plt.title('House/Flat Price Paid Data 2015')
plt.tight_layout
# this will set the image width to 722px at 100dp
fig.set_size_inches(7.22, 5.25)
plt.savefig('Data/dot_density_map.png', dpi=100, alphe=True)
plt.show()

# CHLOROPLETH
#create a chloropleth map normalised by ward area
#Add fields for density into map dataframe

df_map['count'] = df_map['poly'].map(lambda x: int(len(filter(prep(x).contains, points))))
df_map['density_m'] = df_map['count']/df_map['area_m']
df_map['density_km'] = df_map['count']/df_map['area_km']

# it's easier to work with NaN values when classifying
df_map.replace(to_replace={'density_m': {0: np.nan}, 'density_km': {0: np.nan}}, inplace=True)

#divide wards into classes
breaks = nb(
    df_map[df_map['density_km'].notnull()].density_km.values,
    initial=300,
    k=5)

#The notnull method lets us match indices when joining
jb = pd.DataFrame({'jenks_bins':breaks.yb}, index=df_map[df_map['density_km'].notnull()].index)
df_map = df_map.join(jb)
df_map.jenks_bins.fillna(-1, inplace=True)

#Labels for colour classes
jenks_labels = ["<=%0.1f/km$^2$(%s wards)" % (b,c) for b, c in zip(
    breaks.bins, breaks.counts)]
jenks_labels.insert(0, 'No plaques (%s wards)' % len (df_map[df_map['density_km'].isnull()]))

#cloropleth
plt.clf()
fig = plt.figure()
ax = fig.add_subplot(111, axisbg='w', frame_on=False)

# use a blue colour ramp - we'll be converting it to a map using cmap()
cmap = plt.get_cmap('Blues')
# draw wards with grey outlines
df_map['patches'] = df_map['poly'].map(lambda x: PolygonPatch(x, ec='#555555', lw=.2, alpha=1., zorder=4))
pc = PatchCollection(df_map['patches'], match_original=True)
# impose our colour map onto the patch collection
norm = Normalize()
pc.set_facecolor(cmap(norm(df_map['jenks_bins'].values)))
ax.add_collection(pc)

# Add a colour bar
cb = cb.colorbar_index(ncolors=len(jenks_labels), cmap=cmap, shrink=0.5, labels=jenks_labels)
cb.ax.tick_params(labelsize=6)

# Show highest densities, in descending order
highest = '\n'.join(
    value[1] for _, value in df_map[(df_map['jenks_bins'] == 4)][:10].sort().iterrows())
highest = 'Most Dense Wards:\n\n' + highest
# Subtraction is necessary for precise y coordinate alignment
details = cb.ax.text(
    -1., 0 - 0.007,
    highest,
    ha='right', va='bottom',
    size=5,
    color='#555555')

# Bin method, copyright and source data info
smallprint = ax.text(
    1.03, 0,
    'Classification method: natural breaks etc',
    ha='right', va='bottom',
    size=4,
    color='#555555',
    transform=ax.transAxes)

# Draw a map scale
m.drawmapscale(
    coords[0] + 0.08, coords[1] + 0.015,
    coords[0], coords[1],
    10.,
    barstyle='fancy', labelstyle='simple',
    fillcolor1='w', fillcolor2='#555555',
    fontcolor='#555555',
    zorder=5)

# this will set the image width to 722px at 100dpi
plt.tight_layout()
fig.set_size_inches(7.22, 5.25)
plt.savefig('Graphs/choloropleth.png', dpi=100, alpha=True)
plt.show()