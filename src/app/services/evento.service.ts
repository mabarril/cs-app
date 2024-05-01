import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento } from '../models/evento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`api/evento`);
  }

  get(id: any) {
    return this.http.get<Evento>(`api/evento/${id}`);
  }

}


