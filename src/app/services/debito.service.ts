import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Debito } from '../models/debito.model';

@Injectable({
  providedIn: 'root'
})
export class DebitoService {

  constructor(private http: HttpClient) { };

  getDebitoDesbravador(id_cadastro: number) : Observable<Debito[]> {
    return this.http.get<Debito[]>(`api/debito/desbravador/${id_cadastro}`);
  }
}
