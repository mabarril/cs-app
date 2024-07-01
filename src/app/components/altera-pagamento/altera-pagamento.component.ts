import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-altera-pagamento',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatSelectModule, MatRadioModule, MatDatepickerModule, MatCardModule, MatListModule, MatIconModule],
  templateUrl: './altera-pagamento.component.html',
  styleUrl: './altera-pagamento.component.css'
})
export class AlteraPagamentoComponent {

}
