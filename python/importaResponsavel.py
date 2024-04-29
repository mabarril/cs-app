import csv
import mysql.connector

# Configurações do banco de dados
db_config = {
    'host': 'www.iasdcentraldebrasilia.com.br',
    'user': 'iasdc624_sgcs_ad',
    'password': 'F_!cs)E88}E[',
    'database': 'iasdc624_sgcs'
}

# Conecta ao banco de dados
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

# Leitura do arquivo CSV
with open('cadastro.csv', 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    next(csvreader)  # Pula o cabeçalho (se houver)

    for row in csvreader:
        id = row[0]
        pai = row[18]
        mae = row[21]
        resp = row[24]
        query = "INSERT INTO cadastro_responsavel (id_cadastro, nome_responsavel) VALUES (%s, %s)"
        if pai != '':
            cursor.execute(query, (id, pai))
        if mae != '':
            cursor.execute(query, (id, mae))
        if resp != '':
            cursor.execute(query, (id, resp))
# Confirma as alterações
conn.commit()

# Fecha a conexão
cursor.close()
conn.close()

print("Dados inseridos com sucesso!")
