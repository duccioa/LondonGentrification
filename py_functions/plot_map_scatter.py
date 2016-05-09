def plot_map_scatter(df_base,
                     col_palette = 'Reds'):
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

    #Create dataframe with points objects
    #Create point objects in map coordinates from dataframe lon and lat values
    map_points = pd.Series(
        [Point(m(mapped_x, mapped_y)) for mapped_x, mapped_y in zip(df_base['lon'], df_base['lat'])])
    points = MultiPoint(list(map_points.values))
    wards_polygon = prep(MultiPolygon(list(df_map['poly'].values)))
    #Create dataframe of points objects
    df_map_points = pd.DataFrame({'Points':[Point(xy) for xy in points]})
    df_map_points =  df_map_points.merge(df_base, left_index=True, right_index=True)

    # Merge ward Boundaries into one shape
    #merged_boundary = cascaded_union(MultiPolygon(list(df_map['poly'].values)))
    #Identify points within boundary
    #df_map_points['Within_Boundary'] = df_map_points['Points'].map(lambda x: x.within(merged_boundary))
    #subset dataframe to points within boundary
    #df_map_points = df_map_points.loc[df_map_points.Within_Boundary == True, :]


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
    cmap = plt.cm.__getattribute__(col_palette)
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
    plt.tight_layout()
    # this will set the image width to 722px at 100dp
    fig.set_size_inches(7.22, 5.25)
    plt.savefig('./Graphs/test_map.png', dpi=100, alphe=True)
    plt.show()