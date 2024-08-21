import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLabel, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { Registro } from '../../models/registro.model';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { RegistroService } from '../../services/registro.services';
import { UniformeService } from '../../services/uniforme.service';
import { UniformeCadastro } from '../../models/uniforme-cadastro';
import { ListaUniformeComponent } from "../lista-uniforme/lista-uniforme.component";
import { Uniforme } from '../../models/uniforme.model';


@Component({
  selector: 'app-registra-debito',
  standalone: true,
  imports: [AsyncPipe, MatFormField, FormsModule, MatLabel, MatInputModule, MatButtonModule, MatSelectModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './registra-debito-uniforme.component.html',
  styleUrl: './registra-debito-uniforme.component.css'
})
export class RegistraDebitoComponent implements OnInit  {
  
  controlRegistro = new FormControl<string | Registro>('');
  controlUniforme = new FormControl<string | Uniforme>('');
  
  options: Registro[] = [];
  optionsUniforme: Uniforme[] = [];

  filteredOptions: Observable<Registro[]> | undefined;
  filteredOptionsUniforme: Observable<Uniforme[]> | undefined;
  uniformesCadastro: UniformeCadastro[] | undefined;

  constructor(
    private registroService: RegistroService, 
    private uniformeSevice: UniformeService
  ) { }

  ngOnInit() {
    this.registroService.getAll().subscribe(registros => {
      this.options = registros;

    });

    this.uniformeSevice.getAll().subscribe(registroUniformes => {
      this.uniformesCadastro = registroUniformes;
    });

    this.uniformeSevice.getAll().subscribe(uniformes => {
      this.optionsUniforme = uniformes;
    });

    this.filteredOptions = this.controlRegistro.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.nome;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

    this.filteredOptionsUniforme = this.controlUniforme.valueChanges.pipe(
      startWith(''),
      map(value => {
        const desc = typeof value === 'string' ? value : value?.desc_uniforme;
        return desc ? this._filterUniforme(desc as string) : this.optionsUniforme.slice();
      }),
    );
  }

  displayFn(registro: Registro): string {
    return registro && registro.nome ? registro.nome : '';
  }

  private _filter(nome: string): Registro[] {
    const filterValue = nome.toLowerCase();
    return this.options.filter(option => option.nome!.toLowerCase().includes(filterValue));
  }

  displayFnUniforme(uniforme: Uniforme): string {
    return uniforme && uniforme.desc_uniforme ? uniforme.desc_uniforme : '';
  }

  private _filterUniforme(desc: string): Uniforme[] {
    const filterValue = desc.toLowerCase();
    return this.optionsUniforme.filter(item => item.desc_uniforme!.toLowerCase().includes(filterValue));
  }

  dataHoje() {
   let data =new Date();
 

}
}
