import sqlite3

conn = sqlite3.connect('jobarena.db')
cursor = conn.cursor()

with open('schema.sql', 'r') as file:
    sql = file.read()

sql_commands = sql.split(";")

for command in sql_commands:
    try:
        cursor.execute(command)
    except sqlite3.OperationalError as e:
        print(f"Command skipped: {e}")

conn.commit()
conn.close()