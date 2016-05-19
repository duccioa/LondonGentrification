# A token is the technical name for a sequence of characters —
# such as hairy, his, or :) — that we want to treat as a group.


def merge_2string(text):  # obsolete
    """
    :param text: a series of names in the foorm of strings
    :return: a single string with all the names, excluding single words
    """
    text_str = str()  # create a single string with all the names, removing single letters
    for i in text:
        for j in i.split():
            if len(j) > 1:
                text_str = text_str + ' %s' %(j)
    return(text_str)


def token_count(text_input, token_list):  # obsolete
    """
    :param text_input: a string
    :param token_list: a list of token
    :return: a dataframe with token counts
    """
    import pandas as pd
    t = list()
    c = list()
    for i in token_list:
        t.append(text_input.count('%s'%i))
        c.append('%s'%i)
    df = pd.DataFrame({'token':c, 'count':t})
    return df


def token_split(premises_names):
    """
    :param premises_names: a column of names from a pd.dataframe
    :return: a list with all the tokens in the column
    """
    tokens = list()
    for i in premises_names:
        for j in i.split():
            if len(j) > 1:  # omit single character tokens
                tokens.append(j)
    return tokens


def token_spatial(dataf):
    """
    :param premises_names: the Food Premises dataset as a pd dataframe
    :return: a dataframe with every business name broken down to single tokens keeping the rest of the information
    """
    import pandas as pd
    column_list = ['Token', 'PostCode', 'RatingValue',
                   'lon', 'lat',
                   'BusinessName', 'BusinessType', 'BusinessTypeID',
                   'LocalAuthorityCode', 'LocalAuthorityName',
                   'Hygiene', 'Structural', 'ConfidenceInManagement']

    df = pd.DataFrame(columns = column_list)

    for i in dataf.index: # for each food premise
        bn = dataf.ix[i]['BusinessName'] # Get the business name of a single premise

        tokens = bn.split() # split the name into single words or tokens
        tokens = [x.lower() for x in tokens] # convert all the letters to lower case

        tmp = pd.DataFrame(columns = column_list)
        for j in range(len(tokens)): # for each token into the name of the food premise
            if len(tokens[j]) > 1: # skip tokens with one letter only
                tmp = tmp.append(pd.DataFrame({'Token': tokens[j],
                                               'PostCode': dataf.ix[i]['PostCode'],
                                               'RatingValue': dataf.ix[i]['RatingValue'],
                                               'lon': dataf.ix[i]['Longitude'],
                                               'lat': dataf.ix[i]['Latitude'],
                                               'BusinessName':dataf.ix[i]['BusinessName'],
                                               'BusinessType':dataf.ix[i]['BusinessType'],
                                               'BusinessTypeID':dataf.ix[i]['BusinessTypeID'],
                                               'LocalAuthorityCode':dataf.ix[i]['LocalAuthorityCode'],
                                               'LocalAuthorityName':dataf.ix[i]['LocalAuthorityName'],
                                               'Hygiene': dataf.ix[i]['Hygiene'],
                                               'Structural': dataf.ix[i]['Structural'],
                                               'ConfidenceInManagement':dataf.ix[i]['ConfidenceInManagement'],
                                               'BusinessID':int(i)},
                                              index= [1]), ignore_index=True)
        df = df.append(tmp, ignore_index= True)
    df = df[df['lat'].notnull()] # remove lines with no geographical information
    return df

