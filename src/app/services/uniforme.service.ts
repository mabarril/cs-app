import { Injectable } from '@angular/core';
import { Uniforme } from '../models/uniforme.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class UniformeService  {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Uniforme[]> {
    return this.http.get<Uniforme[]>(`api/uniforme/lista-produtos`);
  }

}
