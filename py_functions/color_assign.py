#FUNCTION TO ASSIGN COLOURS (EQUAL INTERVAL)
def color_assign (row, data, var, n_col=7):
    """
    :param row: <description>
    :param data: <description>
    :param var: <description>
    :param n_col: number of colours of the spectrum
    :return: <description>

    :example of application to a Selected column of a dataframe:
    df['Color'] = df.apply(lambda row: color_assign (row, df['<Selected Column>'], '<Selected Column>'), axis=1)
    """
    #CREATE A SPECTRUM OF COLOURS
    N = n_col #Number of intervals
    increment = 255/(N+1)
    RGB_tuples = [((230-(x*increment)), ((230-(x*increment))), 255) for x in range(N)]

    #Convert to hex color format for mapping
    hex_colour = []
    for x in RGB_tuples:
        hexa = '#%02x%02x%02x' % (x)
        hex_colour.append(hexa)


    minimum = data.min()
    maximum = data.max()

    N=len(hex_colour)
    intervals = np.linspace(minimum, maximum, num=N+1)
    for x in range(N):
        if row[var] <= intervals[x+1]:
            return hex_colour[x]

