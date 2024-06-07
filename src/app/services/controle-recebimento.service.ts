import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recebimento } from '../models/recebimento.model';

@Injectable({
  providedIn: 'root'
})
export class ControleRecebimentoService {

  constructor(private http: HttpClient) { }
  
  create(recebimento: Recebimento): Observable<Recebimento> {
    console.log('vvvvv', recebimento);
    return this.http.post<Recebimento>('api/recebimento/registro', recebimento);
  }
}
