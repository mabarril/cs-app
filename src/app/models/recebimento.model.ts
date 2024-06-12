import { ItemPago } from "./itemPago.model";

export class Recebimento {
    responsavel?: string;
    data?: string;
    forma?: string;
    id_recibo?: string;
    descricao?: string;
    itens?: ItemPago[];
}