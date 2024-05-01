import { Routes } from '@angular/router';
import { EventosComponent } from './pages/eventos/eventos.component';
import { InscricaoComponent } from './pages/evento/inscricao/inscricao.component';

export const routes: Routes = [
    { path: 'evento/inscricao', component: InscricaoComponent },
    { path: 'evento', component: EventosComponent }
];
