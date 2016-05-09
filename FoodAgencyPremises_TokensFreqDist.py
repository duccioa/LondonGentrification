# A token is the technical name for a sequence of characters —
# such as hairy, his, or :) — that we want to treat as a group.

import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
from py_functions import textFunctions as tf
import nltk
# import imp # debugging
# imp.reload(tf) # debugging
plt.style.use('ggplot')

data_folder = './Data/FoodPremises/'

# Load the complete csv parsed with WIP_parse_data.py
df = pd.read_csv('%slondon_premises.csv' % data_folder)
df.drop('Index', axis=1, inplace=True)

#  Token count
bn = df['BusinessName']  # extract premises' names

tokens = tf.token_split(bn) #
tokens = [x.lower() for x in tokens]
freq1 = nltk.FreqDist(tokens)
freq1.most_common(100)


freq_df = pd.DataFrame.from_dict(data=freq1, orient='index')
freq_df.rename(columns={0:'count'}, inplace=True)
freq_df.sort_values('count', ascending=False, inplace=True)
freq_df.drop(['the', 'ltd', 'of', 'st'], inplace=True)
freq_df[freq_df.index == 'starbucks']

# Histogram of most frequent tokens
plt.cla()
plt.clf()
top50 = freq_df.head(50)
y_pos = np.arange(len(top50.index))[::-1]
plt.barh(y_pos, top50['count'], align='center', alpha=0.4, color='red')
plt.ylim(-1,50)
plt.xlim(0,3500)
plt.yticks(y_pos, top50.index)
plt.xlabel('Tokens')
plt.title('Frequency of appearance by token - Top 50')
plt.cla()

scnd50 = freq_df[50:99]
y_pos = np.arange(start=51,stop=51+len(scnd50.index))[::-1]
plt.barh(y_pos, scnd50['count'], align='center', alpha=0.4, color='blue')
plt.ylim(50,100)
plt.xlim(0,3500)
plt.yticks(y_pos, scnd50.index)
plt.xlabel('Tokens')
plt.title('Frequency of appearance by token - Second 50')
plt.cla()

trd50 = freq_df[100:149]
y_pos = np.arange(start=101,stop=101+len(trd50.index))[::-1]
plt.barh(y_pos, trd50['count'], align='center', alpha=0.4, color='green')
plt.ylim(100,150)
plt.xlim(0,3500)
plt.yticks(y_pos, trd50.index)
plt.xlabel('Tokens')
plt.title('Frequency of appearance by token - Third 50')

# Bubble chart
top_n = 100
df_sample = freq_df[0:top_n]
x_lim = top_n*5000
y_lim = top_n*5000

x = [2500,2000,1500,1000,500,2500,2000,1500,1000,500,2500,2000,1500,1000,500,2500,2000,1500,1000,500,2500,2000,1500,1000,500]
y = [2500,2500,2500,2500,2500,2000,2000,2000,2000,2000,1500,1500,1500,1500,1500,1000,1000,1000,1000,1000,500,500,500,500,500]



fig, ax = plt.subplots()
ax.scatter(x, y, s=freq_df['count'], marker='o', c='red')

for i, txt in enumerate(freq_df.index):  # http://stackoverflow.com/questions/14432557/matplotlib-scatter-plot-with-different-text-at-each-data-point
    ax.annotate(txt, (x[i],y[i]))



