import { Component, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { map, startWith } from 'rxjs/operators';
import { EventoService } from '../../../services/evento.service';
import { Registro } from '../../../models/registro.model';
import { RegistroService } from '../../../services/registro.services';
import { CommonModule } from '@angular/common';
import { InscricaoEventoService } from '../../../services/inscricao-evento.service';
import { ListaInscricaoComponent } from '../../../components/lista-inscricao/lista-inscricao.component';
import { InscricaoEvento } from '../../../models/inscricao_evento.model';
import { Evento } from '../../../models/evento.model';
import { Observable } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-inscricao',
  standalone: true,
  templateUrl: './inscricao.component.html',
  styleUrl: './inscricao.component.css',
  imports: [
    MatFormFieldModule,
    AsyncPipe,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    ListaInscricaoComponent,
    ReactiveFormsModule
  ],
})
export class InscricaoComponent implements OnInit {
  eventos?: Evento[];
  registros?: Registro[];
  inscricao_evento?: InscricaoEvento;

  selectedEvento?: Evento;
  selectedRegistro?: Registro;
  options!: Registro[];

  filteredOptions!: Observable<Registro[]>;
  myControl = new FormControl<string | Registro>('');
  
  constructor(
    private eventoService: EventoService,
    private registroService: RegistroService,
    private inscricaoEventoService: InscricaoEventoService
  ) {}

  ngOnInit(): void {
    this.eventoService.getAll().subscribe((data) => {
      this.eventos = data;
    });

    this.loadAllRegistros();
  }

  loadAllRegistros() {
    this.registroService.getAll().subscribe((data) => {
      console.log(data);
      this.options! = data!;
    });
  }

  _filter(name: string): Registro[] {
    const filterValue = name.toLowerCase();
    return this.options.filter((option) =>
      option.nome!.toLowerCase().includes(filterValue)
    );
  }

  onValueChange() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.nome;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  displayFn(user: Registro): string {
    console.log(user);
    return user && user.nome ? user.nome : '';
  }

  onSubmit(): void {
    if (!this.selectedEvento || !this.selectedRegistro) {
      alert('Por favor, selecione um evento e um participante');
      return;
    }

    this.inscricao_evento = {
      evento: this.selectedEvento,
      cadastro: this.selectedRegistro,
    };

    this.inscricaoEventoService.create(this.inscricao_evento).subscribe(
      (data) => {
        this.inscricao_evento = data;
        alert('Inscrição realizada com sucesso!');
        this.loadAllRegistros();
      },
      (error) => {
        alert('Erro ao realizar inscrição. Tente novamente mais tarde.');
        return;
      }
    );
  }

  selecionaRegistro(registro: Registro) {
    this.selectedRegistro = registro;
  }
}
