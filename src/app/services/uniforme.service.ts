<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UniformeCadastro } from '../models/uniforme-cadastro';
=======
import { Injectable } from '@angular/core';
import { Uniforme } from '../models/uniforme.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
>>>>>>> da138b30664aba0bd2537028369fcf764b4cc259

@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
export class UniformeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<UniformeCadastro[]> {
    return this.http.get<UniformeCadastro[]>(`api/uniforme/lista`);
  }
=======


export class UniformeService  {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Uniforme[]> {
    return this.http.get<Uniforme[]>(`api/uniforme/lista-produtos`);
  }

>>>>>>> da138b30664aba0bd2537028369fcf764b4cc259
}
