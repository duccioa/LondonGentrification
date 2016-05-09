import pandas as pd
from matplotlib import pyplot as plt
from py_functions import plot_map_scatter as pls
# import imp # debugging
# imp.reload(pls) # debugging
plt.style.use('ggplot')

data_folder = './Data/FoodPremises/'

# Load the complete csv parsed with WIP_parse_data.py
df = pd.read_csv('%slondon_premises.csv' % data_folder)
df.drop('Index', axis=1, inplace=True)


## Test plot scatter function
pls(df_base=df_pc_London, col_palette='Blues')


