import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
desired_width = 320
pd.set_option('display.width', desired_width)
plt.style.use('ggplot')
data_folder = './Data/'
colnames = 'Data/col_names.csv'

#Load the complete csv
df = pd.read_csv('%slondon_premises.csv' % data_folder)
df.drop('Index', axis=1, inplace=True)
df.head(5)
df = df.sort_values('RatingDate', ascending=1)


#Plot 1 - Number of premises by borough
df_grouped = df.groupby('LocalAuthorityName')
df_count = df_grouped.count()
df_count = df_count.sort_values(by='BusinessName', ascending=0)
y_pos = np.arange(len(df_count.index))
count = df_count['BusinessName']
plt.barh(y_pos, count, align='center', alpha=0.4)
plt.yticks(y_pos, df_count.index)
plt.xlabel('Number of premises')
plt.title('Number of premises in Greater London 2016')
#Plot 2 - Number of registered premises per year
df_temp = df[['RatingDate', 'BusinessName']]
groupby_date = df_temp.groupby(['RatingDate'])
groupby_date = groupby_date.count()
plt.plot(pd.to_datetime(groupby_date.index), groupby_date['BusinessName'])
plt.title('Number of premises rated per year')
#Plot 3 - Number of premises registerd - Cumulative Sum
groupby_cumsum = groupby_date.cumsum(0)
plt.plot(pd.to_datetime(groupby_cumsum.index), groupby_cumsum['BusinessName'])
plt.title('Number of premises rated per year - Cumulative Sum')
#
import seaborn as sns
df_temp = df[['RatingDate', 'BusinessName', 'LocalAuthorityName']]
by_borough = df_temp.groupby(['RatingDate', 'LocalAuthorityName'])
by_borough = by_borough.count()
by_borough.reset_index(level=0, inplace=True)
by_borough.reset_index(level=0, inplace=True)

time = pd.to_datetime(df['RatingDate'], format='%Y-%M-%d')
df_temp = df['BusinessName']
df_temp.set_index(time, inplace=True)
df_temp['LocalAuthorityName'] = df['LocalAuthorityName']
df_temp = df_temp.resample('1M', how='sum')


sns.lmplot(x="RatingDate", y="BusinessName", hue='LocalAuthorityName', data=by_borough, fit_reg=False)
#plot 4 - Number of BusinessType
b_types = df.groupby('BusinessType')
b_types = b_types.count()
b_types = b_types.sort_values(by='BusinessName', ascending=1)
y_pos = np.arange(len(b_types.index))
count = b_types['BusinessName']
plt.barh(y_pos, count, align='center', alpha=0.4)
plt.yticks(y_pos, b_types.index)
plt.xlabel('Number of Business Types')
plt.title('Number of premises by Business Types 2016')

