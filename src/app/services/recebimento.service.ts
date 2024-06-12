import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Recibo } from '../models/recibo.model';
import { RegistroPagamento } from '../models/registro_pagamento.model';
import { RecebimentoRegistro } from '../models/recebimento_registro';
import { Pagamento } from '../models/pagamento.model';


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
}
