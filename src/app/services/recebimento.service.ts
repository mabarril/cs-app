import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Recibo } from '../models/recibo.model';
import { RegistroPagamento } from '../models/registro_pagamento.model';
import { RecebimentoRegistro } from '../models/recebimento_registro';
import { Pagamento } from '../models/pagamento.model';
import { Extrato } from '../models/extrato.model';
import { NumeroRecibo } from '../models/numero-recibo';
import { ItemExtrato } from '../models/itemExtrato.model';
import { DeletaItemRecebimentoComponent } from '../components/deleta-item-recebimento/deleta-item-recebimento.component';


@Injectable({
  providedIn: 'root'
})
export class RecebimentoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Recibo[]> {
    return this.http.get<Recibo[]>(`api/recebimento/prestacao-contas`);
  }

  create(registroPagamento: RegistroPagamento): Observable<RegistroPagamento> {
    return this.http.post<RegistroPagamento>('api/recebimento/prestacao-contas', registroPagamento);
  }

  getValorPago(): Observable<RegistroPagamento[]> {  
    return this.http.get<RegistroPagamento[]>('api/recebimento/valor-pago');
  }

  getRelatorio(): Observable<RecebimentoRegistro[]> {
    return this.http.get<RecebimentoRegistro[]>('api/recebimento/relatorio');
  }

  getLista(): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>('api/recebimento/lista');
  }

  getExtrato(id : number): Observable<Extrato[]> {
    return this.http.get<Extrato[]>('api/recebimento/extrato/' + id);
  }

  getItensExtrato(): Observable<ItemExtrato[]> {
    return this.http.get<ItemExtrato[]>('api/extrato');
  }

  insereRecibo(numeroRecibo : NumeroRecibo): Observable<NumeroRecibo> {
    return this.http.post<NumeroRecibo>('api/recebimento/recibo', numeroRecibo);
  }

  deleteRecebimento(id: number): Observable<Pagamento> {
    return this.http.delete<Pagamento>('api/recebimento/' + id);
  }
}
