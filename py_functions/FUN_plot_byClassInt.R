##### Plot a colour map ##########################################################
### Show all the colour schemes available
#display.brewer.all()

plot_spdf_byClassInt <- function(spdf, #SpatialPolygonDataFrame
                                 plot_variable, #Pick the variable to be plotted
                                 n_breaks = 5, #Number of breaks
                                 col_pal, #Colour palette
                                 border_col = "cornsilk3",
                                 style_intervals = "jenks"){ #Pick the style for classIntervals
    require(sp)
    require(rgeos)
    require(maptools)
    require(RColorBrewer)
    require(classInt)
    col_palette <- col_pal
    breaks <- classIntervals(spdf@data[,plot_variable], n = n_breaks, style = style_intervals)
    breaks <- breaks$brks
    plot(spdf,
         col=col_palette[findInterval(spdf@data[,plot_variable],
                                      breaks, 
                                      all.inside = TRUE)], axes=F, lwd = 0.001, border = border_col)
    legend(x=681623.5, y=5727840, legend=leglabs(round(breaks, 2)), 
           fill=col_palette, bty="n", cex = .7, title = plot_variable)
}