# Convert the downloaded data from www.food.gov.uk/ to a dataframe
# The function is used in iteration in parse_data.py
def parse_xml(xml_file, col_names):
    """
    :param xml_file: an xml file as downloaded from www.food.gov.uk
    :param colnames: csv with the column names of the complete XML
    :return: conversion of the xml to a dataframe, each line is a premise
    """
    import pandas as pd
    import xml.etree.ElementTree as ET
    import extract_from_child as ex
    # read the xml
    tree = ET.parse('%s' % xml_file)
    root = tree.getroot()  # get the root
    root = root[1]  # get the relevant child
    column_names = pd.read_csv('%s' % col_names).columns  # read the columns of the dataframe
    df_temp = pd.DataFrame(columns=[column_names])  # create an empty dataframe to be filled up

    #   Extract the information for each premise and store it in df_temp
    for premise in range(0, len(root), 1):
        tags = ex.extract_tag(root[premise])
        content = ex.extract_content(root[premise])
        df_temp = df_temp.append(ex.make_df(tags, content, column_names), ignore_index=True)

    #   get the relevant variables and convert to appropriate format
    df_final = pd.DataFrame()
    df_final['BusinessName'] = df_temp['BusinessName']
    df_final['BusinessType'] = df_temp['BusinessType']
    df_final['BusinessTypeID'] = pd.to_numeric(df_temp['BusinessTypeID'], errors='coerce')
    # df_final['AddressLine1'] = df_temp['AddressLine1'] #add if necessary
    # df_final['AddressLine2'] = df_temp['AddressLine2']
    # df_final['AddressLine3'] = df_temp['AddressLine3']
    df_final['PostCode'] = df_temp['PostCode']
    df_final['RatingValue'] = pd.to_numeric(df_temp['RatingValue'], errors='coerce')
    df_final['RatingDate'] = pd.to_datetime(df_temp['RatingDate'], errors='coerce')
    df_final['LocalAuthorityCode'] = df_temp['LocalAuthorityCode']
    df_final['LocalAuthorityName'] = df_temp['LocalAuthorityName']
    df_final['Hygiene'] = pd.to_numeric(df_temp['Hygiene'], errors='coerce')
    df_final['Structural'] = pd.to_numeric(df_temp['Structural'])
    df_final['ConfidenceInManagement'] = pd.to_numeric(df_temp['ConfidenceInManagement'], errors='coerce')
    df_final['Longitude'] = pd.to_numeric(df_temp['Longitude'], errors='coerce')
    df_final['Latitude'] = pd.to_numeric(df_temp['Latitude'], errors='coerce')

    return df_final


def parse_xml_folder(data_folder, colnames):
    """
    :param data_folder: address of a folder where XML files are stored
    :param colnames: csv with the column names of the complete XML
    :return: return a dataframe, each line is a premise
    """
    import pandas as pd
    import glob
    xml_list = glob.glob('%s*.xml' % data_folder)
    df_final = pd.DataFrame()
    for xml in xml_list:
        df_xml = parse_xml(xml, colnames)
        df_final = df_final.append(df_xml, ignore_index=True)

    return df_final
