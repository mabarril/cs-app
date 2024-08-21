import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UniformeCadastro } from '../models/uniforme-cadastro';

@Injectable({
  providedIn: 'root'
})
export class UniformeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<UniformeCadastro[]> {
    return this.http.get<UniformeCadastro[]>(`api/uniforme/lista`);
  }
}
