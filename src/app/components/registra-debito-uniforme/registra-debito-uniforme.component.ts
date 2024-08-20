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
<<<<<<< HEAD:src/app/components/registra-debito/registra-debito.component.ts
import { UniformeCadastro } from '../../models/uniforme-cadastro';
import { ListaUniformeComponent } from "../lista-uniforme/lista-uniforme.component";
=======
import { Uniforme } from '../../models/uniforme.model';
>>>>>>> da138b30664aba0bd2537028369fcf764b4cc259:src/app/components/registra-debito-uniforme/registra-debito-uniforme.component.ts


@Component({
  selector: 'app-registra-debito',
  standalone: true,
<<<<<<< HEAD:src/app/components/registra-debito/registra-debito.component.ts
  imports: [AsyncPipe, MatFormField, FormsModule, MatLabel, MatInputModule, MatButtonModule, MatSelectModule, MatAutocompleteModule, ReactiveFormsModule, ListaUniformeComponent],
  templateUrl: './registra-debito.component.html',
  styleUrl: './registra-debito.component.css'
})
export class RegistraDebitoComponent implements OnInit {
  [x: string]: any;
  myControl = new FormControl<string | Registro>('');
=======
  imports: [AsyncPipe, MatFormField, FormsModule, MatLabel, MatInputModule, MatButtonModule, MatSelectModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './registra-debito-uniforme.component.html',
  styleUrl: './registra-debito-uniforme.component.css'
})
export class RegistraDebitoComponent implements OnInit  {
  controlRegistro = new FormControl<string | Registro>('');
  controlUniforme = new FormControl<string | Uniforme>('');
  
>>>>>>> da138b30664aba0bd2537028369fcf764b4cc259:src/app/components/registra-debito-uniforme/registra-debito-uniforme.component.ts
  options: Registro[] = [];
  optionsUniforme: Uniforme[] = [];

  filteredOptions: Observable<Registro[]> | undefined;
<<<<<<< HEAD:src/app/components/registra-debito/registra-debito.component.ts
  uniformesCadastro: UniformeCadastro[] | undefined;

  constructor(
    private registroService: RegistroService, private uniformeService: UniformeService,
=======
  filteredOptionsUniforme: Observable<Uniforme[]> | undefined;

  constructor(
    private registroService: RegistroService, 
    private uniformeSevice: UniformeService
>>>>>>> da138b30664aba0bd2537028369fcf764b4cc259:src/app/components/registra-debito-uniforme/registra-debito-uniforme.component.ts
  ) { }

  ngOnInit() {
    this.registroService.getAll().subscribe(registros => {
      this.options = registros;

    });

    this.uniformeService.getAll().subscribe(registroUniformes => {
      this.uniformesCadastro = registroUniformes;
    });

<<<<<<< HEAD:src/app/components/registra-debito/registra-debito.component.ts
    this.filteredOptions = this.myControl.valueChanges.pipe(
=======
    this.uniformeSevice.getAll().subscribe(uniformes => {
      this.optionsUniforme = uniformes;
    });

    this.filteredOptions = this.controlRegistro.valueChanges.pipe(
>>>>>>> da138b30664aba0bd2537028369fcf764b4cc259:src/app/components/registra-debito-uniforme/registra-debito-uniforme.component.ts
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

}
