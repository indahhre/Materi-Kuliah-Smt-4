import pandas as pd

# Baca file CSV atau Excel
data_csv = pd.read_csv('data_cleaned.csv')
# atau
data_excel = pd.read_excel('data_cleaned.xlsx')

# Tampilkan beberapa baris data
print(data_csv.head())
