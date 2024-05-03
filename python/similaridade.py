import csv
from fuzzywuzzy import fuzz
import mysql.connector

# Configurações do banco de dados
db_config = {
    'host': 'www.iasdcentraldebrasilia.com.br',
    'user': 'iasdc624_sgcs_ad',
    'password': 'F_!cs)E88}E[',
    'database': 'iasdc624_sgcs'
}
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

def verificar_semelhanca(str1, str2):   
    return fuzz.ratio(str1.lower(), str2.lower())   

# Fetch nome_responsavel from cadastro_responsavel
cursor.execute("SELECT id_cadastro, nome_responsavel FROM cadastro_responsavel")
responsaveis = cursor.fetchall()

# Fetch nome from pc_recibo
cursor.execute("SELECT nr_recibo, nome_recibo FROM pc_recibo")
recibos = cursor.fetchall()

# Compare each nome_responsavel with each nome
for responsavel in responsaveis:
    for recibo in recibos:
        #print(responsavel[0], ' - ', recibo[0])
        semelhanca = verificar_semelhanca(responsavel[1], recibo[1])
        if semelhanca > 70:
            cursor.execute("SELECT COUNT(*) FROM recibo_cadastro WHERE id_cadastro = %s AND nr_recibo = %s", (responsavel[0], recibo[0]))
            total = cursor.fetchone();
            if total[0] < 1:
                cursor.execute("INSERT INTO recibo_cadastro (id_cadastro, nr_recibo) VALUES (%s, %s)", (responsavel[0], recibo[0]))
            
# Confirma as alterações
conn.commit()
# Close the connection
cursor.close()
conn.close()


conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

cursor.execute("SELECT distinct(nr_recibo) FROM pc_recibo")
recibos = cursor.fetchall()
for recibo in recibos:
    print(recibo[0])
    cursor.execute("SELECT distinct(c.vlr_recibo/x.qtd) FROM `recibo_cadastro` a inner join cadastro b on a.id_cadastro = b.id inner join pc_recibo c on a.nr_recibo = c.nr_recibo inner join (select count(*) as qtd, nr_recibo from recibo_cadastro GROUP BY nr_recibo) x on a.nr_recibo = x.nr_recibo WHERE a.nr_recibo = %s", (recibo[0],))
    parcela = cursor.fetchone();
    if parcela:
        print(parcela[0])
        cursor.execute("UPDATE recibo_cadastro SET vlr=%s WHERE nr_recibo=%s", (parcela[0], recibo[0]))

# Confirma as alterações
conn.commit()
# Close the connection
cursor.close()
conn.close()

#SELECT b.nome, c.vlr_recibo/x.qtd FROM `recibo_cadastro` a inner join cadastro b on a.id_cadastro = b.id inner join pc_recibo c on a.nr_recibo = c.nr_recibo inner join (select count(*) as qtd, nr_recibo from recibo_cadastro GROUP BY nr_recibo) x on a.nr_recibo = x.nr_recibo WHERE a.nr_recibo = 177691158;
print("Dados inseridos com sucesso!")
