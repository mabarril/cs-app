import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Registro[]> {
    return this.http.get<Registro[]>(`api/registro`);
  }

  get(id: any) {
    return this.http.get<Registro>(`api/registro/${id}`);
  }

}