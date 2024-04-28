import csv
import tabula
 
pdf_file = "eventos-2.pdf"
csv_file = "teste.csv"

def ler_arquivo_csv(caminho_do_arquivo):
    with open(caminho_do_arquivo, 'r', encoding='utf-8') as arquivo:
        leitor = csv.reader(arquivo)
        # Pular o cabeçalho
        next(leitor)
        # Ler o restante dos dados
        dados = [linha for linha in leitor]
    return dados

tabula.convert_into("eventos.pdf", "teste.csv", output_format="csv", pages="all")

dados_csv = ler_arquivo_csv('teste.csv')
print(dados_csv)
csv_rows = []    
for linha in dados_csv:
    row = []
    x = ''
    if "Oferta" in linha[1]:
        x = linha[1]
    if "Oferta" in linha[2]:
        x = linha[2]
    if x.startswith("Oferta"):
        data_reg = linha[0].split(' ')[0]
        x = x.split('-')
        recibo = (x[1].replace(' ', '').replace('ReciboNo', ''))
        nome = (x[2]).lstrip().rstrip()
        valor = (linha[3].lstrip().rstrip().replace(',','.'))
        row.append(data_reg)
        row.append(recibo)
        row.append(nome)
        row.append(valor)
        csv_rows.append(row)
csv_file = "output.csv"

with open(csv_file, "w") as csv_f:
    for row in csv_rows:
        csv_f.write(",".join(map(str, row))+ "\n")