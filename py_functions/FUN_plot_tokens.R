plot_tokens = function(dt, token_lst, bg_map,bg_map2,
                       alpha = .2, pch = 20, cex_points = 2,
                       cex.title = 3, h = 1200, w = 1200){
    # dt = data.table with BusinessName, lat and lon columns
    # token_lst = a list of tokens to subset dt
    # bg_map = a background map 
    source('/Users/duccioa/Documents/02_DataScience/02_Functions/add_alpha.R')
    source('./py_functions/FUN_plot_byClassInt.R')
    nc = length(token_lst)
    pal = add.alpha(rainbow(nc), alpha)
    info = data.frame(Token = NULL, Num_appeareance = NULL)
    for(i in 1:length(token_lst)){
        sel = explore_token[i]
        subset = dt[grepl(sel, dt$BusinessName),]
        info[i,1] = sel; info[i,2] = nrow(subset)
        print(paste(sel, nrow(subset))) # debug
        if(nrow(subset) == 0){next}
        else{coords = cbind(x = subset$lon, y = subset$lat)
        sp = SpatialPoints(coords)
        spdf = SpatialPointsDataFrame(sp, subset)
        
        png(paste0('./Graphs/FoodPremises_Scatter_', sel, '.png'), width = w, height = h)
        par(cex.main = cex.title, cex.sub = cex.title)
        grey_pal = gray.colors(8, start = 0.6, end = 0.1, gamma = 2.2, alpha = NULL)
        plot_spdf_byClassInt(bg_map, plot_variable = 'Mean.2012_13', n_breaks = 8, col_pal = grey_pal)
        plot(bg_map2, border = 'grey15', add = T)
        plot(spdf, pch = pch, cex = cex_points, col = pal[i], add = T)
        title(main = 'Token appearance in food premise names', 
              sub = paste(toupper(sel), 'appears', nrow(subset), 'times'))
        for(i in 1:length(bg_map2)){
            text(x = bg_map2@polygons[i][[1]]@Polygons[[1]]@labpt[1], 
                 bg_map2@polygons[i][[1]]@Polygons[[1]]@labpt[2], 
                 labels = bg_map2@data$NAME[i], cex = 2.5)
        }
        
        dev.off()
        }
        
    }
    return(info)
}