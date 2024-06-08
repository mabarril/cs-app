import { Injectable } from '@angular/core';
import { Responsavel } from '../models/responsavel.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ResponsavelService {



  constructor(private http: HttpClient) { }

  getAll(): Observable<Responsavel[]> {
    return this.http.get<Responsavel[]>(`api/responsavel`);
  }

  create(responsavel: Responsavel): Observable<Responsavel> {
    return this.http.post<Responsavel>(`api/responsavel`, responsavel);
  }


}
