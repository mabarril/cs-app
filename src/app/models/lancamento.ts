export class Lancamento {
    id: number;
    nomeDesbravador: string;
    nomeResponsavel: string;
    item: string;
    formaPagamento: string;
    valor: number;
    nrParcela: number;
    data: Date;
    status: string;
    comprovante: string;
    statusSistema: string;

    constructor(id: number, nomeDesbravador: string, nomeResponsavel: string, item: string, formaPagamento: string, valor: number, nrParcela: number, data: Date, status: string, comprovante: string, statusSistema: string) {
        this.id = id;
        this.nomeDesbravador = nomeDesbravador;
        this.nomeResponsavel = nomeResponsavel;
        this.item = item;
        this.formaPagamento = formaPagamento;
        this.valor = valor;
        this.nrParcela = nrParcela;
        this.data = data;
        this.status = status;
        this.comprovante = comprovante;
        this.statusSistema = statusSistema;
    }
}