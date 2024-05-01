import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InscricaoEvento } from '../models/inscricao_evento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscricaoEventoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<InscricaoEvento[]> {
    return this.http.get<InscricaoEvento[]>(`api/evento/inscricao`);
  }

  get(id: any) {
    return this.http.get<InscricaoEvento>(`api/evento/inscricao/${id}`);
  }

  create(inscricaoEvento: InscricaoEvento): Observable<InscricaoEvento> {
    return this.http.post<InscricaoEvento>('api/evento/inscricao', inscricaoEvento);
  }
}
