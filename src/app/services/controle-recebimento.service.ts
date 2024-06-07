import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recebimento } from '../models/recebimento.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ControleRecebimentoService {

  constructor(private http: HttpClient) { }


  create(recebimento: Recebimento): Observable<Recebimento> {
    return this.http.post<Recebimento>('api/recebimento/registro', recebimento)
  }

}

