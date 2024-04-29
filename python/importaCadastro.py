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
        nome = row[1]
        cargo = row[2]
        ativo = 1
        # Consulta SQL para verificar se o registro existe
        query = "SELECT COUNT(*) FROM cadastro WHERE id = %s"
        cursor.execute(query, (id,))
        resultado = cursor.fetchone()
        # Verifica se o número de registros encontrados é maior que zero
        if resultado[0] > 0:
            print("O registro com ID {} já existe na tabela.".format(id))
        else:
            print("O registro com ID {} não foi encontrado.".format(id))
            resultado = cursor.fetchone()
            # Insere os dados na tabela
            query = "INSERT INTO cadastro (id, nome, cargo, ativo) VALUES (%s, %s, %s, %s)"
            cursor.execute(query, (id, nome, cargo, ativo))

# Confirma as alterações
conn.commit()

# Fecha a conexão
cursor.close()
conn.close()

print("Dados inseridos com sucesso!")
