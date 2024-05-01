import { Evento } from "./evento.model";
import { Registro } from "./registro.model";

export class InscricaoEvento {
  id?: number;
  evento?: Evento;
  cadastro?: Registro;
}