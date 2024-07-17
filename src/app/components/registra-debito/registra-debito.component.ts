import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatLabel, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import { Registro } from '../../models/registro.model';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { RegistroService } from '../../services/registro.services';


@Component({
  selector: 'app-registra-debito',
  standalone: true,
  imports: [AsyncPipe, MatFormField, FormsModule, MatLabel, MatInputModule, MatButtonModule, MatSelectModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './registra-debito.component.html',
  styleUrl: './registra-debito.component.css'
})
export class RegistraDebitoComponent implements OnInit  {
  myControl = new FormControl<string | Registro>('');
  options: Registro[] = [];
  filteredOptions: Observable<Registro[]> | undefined;

  constructor(
    private registroService: RegistroService,
  ) { }

  ngOnInit() {
    this.registroService.getAll().subscribe(registros => {
      this.options = registros;
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.nome;
        return name ? this._filter(name as string) : this.options.slice();
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

}
