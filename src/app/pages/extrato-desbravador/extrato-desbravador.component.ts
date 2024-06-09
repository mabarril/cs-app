import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardModule} from '@angular/material/card';




@Component({
  selector: 'app-extrato-desbravador',
  standalone: true,
  imports: [MatCard, MatCardModule],
  templateUrl: './extrato-desbravador.component.html',
  styleUrl: './extrato-desbravador.component.css'
})
export class ExtratoDesbravadorComponent {

}
