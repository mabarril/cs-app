import csv
import mysql.connector
import Levenshtein

def verificar_semelhanca(str1, str2):
    distancia = Levenshtein.distance(str1, str2)
    return 1 - (distancia / max(len(str1), len(str2)))


# # Configurações do banco de dados
db_config = {
    'host': 'www.iasdcentraldebrasilia.com.br',
    'user': 'iasdc624_sgcs_ad',
    'password': 'F_!cs)E88}E[',
    'database': 'iasdc624_sgcs'
}

# Conecta ao banco de dados
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()
query = "SELECT * FROM cadastro_responsavel"

cursor.execute(query)
resp = cursor.fetchall()

# Leitura do arquivo CSV
with open('output.csv', 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    # next(csvreader)  # Pula o cabeçalho (se houver)

    for row in csvreader:
        data = row[0]
        recibo = row[1]
        nome = row[2]
        valor = row[3]
        for rowResp in resp:
            id = rowResp[0]
            nomeResp = rowResp[1]
            resultado = verificar_semelhanca(nome.lower(), nomeResp.lower())    
            if resultado > 0.1:    
                print(f"A semelhança entre {nome} e {nomeResp} é:{resultado:.2f}")

# Fecha a conexão
cursor.close()
conn.close()

print("Dados inseridos com sucesso!")

resultado = verificar_semelhanca("Marcelo Alexandre Barrionuevo", "Giselle Barrionuevo")
print(f"A semelhança entre as strings é: {resultado:.2f}")
