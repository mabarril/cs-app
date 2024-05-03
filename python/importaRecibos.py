import csv
import mysql.connector
from datetime import datetime

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
with open('output.csv', 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    #next(csvreader)  # Pula o cabeçalho (se houver)

    for row in csvreader:
        data = row[0]
        data = datetime.strptime(data, '%d/%m/%Y').strftime('%Y-%m-%d')
        recibo = row[1]
        nome = row[2]
        valor = row[3]
        # Consulta SQL para verificar se o registro existe
        query = "SELECT COUNT(*) FROM pc_recibo WHERE nr_recibo = %s"
        cursor.execute(query, (recibo,))
        resultado = cursor.fetchone()
        # Verifica se o número de registros encontrados é maior que zero
        if resultado[0] > 0:
            print("O registro com ID {} já existe na tabela.".format(recibo))
        else:
            resultado = cursor.fetchone()
            # Insere os dados na tabela
            query = "INSERT INTO pc_recibo (data_recibo, nr_recibo, nome_recibo, vlr_recibo) VALUES (%s, %s, %s, %s)"
            cursor.execute(query, (data, recibo, nome, valor))

# Confirma as alterações
conn.commit()

# Fecha a conexão
cursor.close()
conn.close()

print("Dados inseridos com sucesso!")