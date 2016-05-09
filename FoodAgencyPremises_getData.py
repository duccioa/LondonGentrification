# Download data from www.food.gov.uk/
import pandas as pd
import urllib



fields = pd.read_csv('./Data/col_names.csv', sep=',', encoding='latin1').columns

fields_dict = {}
final_df = pd.DataFrame(columns=fields)
##Download data
links = pd.DataFrame(columns=['address', 'code', 'filename'])
for i in range(501, 534, 1):
    address='http://ratings.food.gov.uk/OpenDataFiles/FHRS%sen-GB.xml' % str(i)
    filename='%s.xml'% str(i)
    df=pd.DataFrame({'address':[address], 'code':[i],'filename': [filename]})
    links=links.append(df)
    urllib.request.urlretrieve(address, 'Data/%s' % filename)


