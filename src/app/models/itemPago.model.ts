import { Registro } from "./registro.model";

export interface ItemPago {
    desbravador: Registro;
    valor: number,
    item: string,
  };