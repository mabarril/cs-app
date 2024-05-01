import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [ MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, ReactiveFormsModule ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {
  private fb = inject(FormBuilder);
  eventoForm = this.fb.group({
    id: 1,
    nome: [null, Validators.required],
    valor: [null, Validators.required],
    estado: 1
  });

  onSubmit(): void {
    alert('Thanks!');
  }

}
