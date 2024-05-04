import { Routes } from '@angular/router';
import { EventosComponent } from './pages/eventos/eventos.component';
import { InscricaoComponent } from './pages/evento/inscricao/inscricao.component';
import { PrestacaoContasComponent } from './pages/recebimento/prestacao-contas/prestacao-contas.component';

export const routes: Routes = [
    { path: '', redirectTo: 'evento/inscricao', pathMatch: 'full'},
    { path: 'evento/inscricao', component: InscricaoComponent },
    { path: 'evento', component: EventosComponent },
    { path: 'recebimento/prestacao-contas', component: PrestacaoContasComponent}
];
