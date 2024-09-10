import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe, CurrencyPipe, DatePipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Registro } from '../../models/registro.model';
import { RegistroService } from '../../services/registro.services';
import { RecebimentoService } from '../../services/recebimento.service';

export interface User {
  name: string;
}

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatCardModule
  ],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css'
})
export class PagamentoComponent {

  constructor(
    private registroService: RegistroService, private recebimentoService: RecebimentoService, ) { };

    myControl = new FormControl<string | Registro>('');
    options!: Registro[];
    filteredOptions!: Observable<Registro[]>;
  

  ngOnInit(): void {
    this.registroService.getAll().subscribe(registros => {
      this.options = registros;
    });
  }
  

    displayFn(user: Registro): string {
      console.log(user);
      return user && user.nome ? user.nome: '';
    }
  
    private _filter(name: string): Registro[] {
      const filterValue = name.toLowerCase();
      return this.options.filter(option => option.nome!.toLowerCase().includes(filterValue));
    }
  
    onValueChange() {
      console.log(this.myControl.value);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.nome;
          console.log(name);
          return name ? this._filter(name as string) : this.options.slice();
        }),
      )
    }
  
  selecionaRegistro(registro: Registro) {
    console.log('8888888  ', registro.id);
    this.recebimentoService.getExtrato(registro.id!).subscribe(result => {
      // this.extrato = result;
      // this.calculatePaymentsTotal();
    });
  }

}
