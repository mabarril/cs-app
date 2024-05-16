import { Routes } from '@angular/router';
import { EventosComponent } from './pages/eventos/eventos.component';
import { InscricaoComponent } from './pages/evento/inscricao/inscricao.component';
import { PrestacaoContasComponent } from './pages/recebimento/prestacao-contas/prestacao-contas.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaPrestacaoContasComponent } from './components/lista-prestacao-contas/lista-prestacao-contas.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'evento/inscricao', component: InscricaoComponent },
    { path: 'evento', component: EventosComponent },
    { path: 'recebimento/prestacao-contas', component: PrestacaoContasComponent},
    { path: 'recebimento/relatorio', component: ListaPrestacaoContasComponent},
    { path: '**', redirectTo: 'home'}

];
