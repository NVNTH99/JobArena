import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="jobarena"
)

cursor = conn.cursor()

with open('schema.sql', 'r') as file:
    sql = file.read()

sql = sql.split(";")

# print(sql)
for query in sql:
    cursor.execute(query)

conn.commit()
conn.close()