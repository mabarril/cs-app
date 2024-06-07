import { ItemPago } from "./itemPago.model";

export class Recebimento {
    responsavel?: string;
    dtPgto?: string;
    forma?: string;
    recibo?: string;
    descricao?: string;
    itens?: ItemPago[];
}