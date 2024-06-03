import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecebimentoRegistro } from '../models/recebimento_registro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControleRecebimentoService {

  constructor(private http: HttpClient) { }

  create(recebimentoRegistro: RecebimentoRegistro): Observable<RecebimentoRegistro> {
    return this.http.post<RecebimentoRegistro>('api/recebimento/registro', recebimentoRegistro);
  }
}
