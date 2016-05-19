# Create a dataframe from the downloaded data (see GetData.py)
from py_functions import parseXML as px
data_folder = './Data/FoodPremises/'
colnames = 'Data/FoodPremises/col_names.csv'

# For debugging:
#import imp
#imp.reload(px)

# Iterate through the xml list and put together the results in a single df
df = px.parse_xml_folder(data_folder, colnames)
df.to_csv('%slondon_premises.csv' % data_folder, sep=',', header=True)