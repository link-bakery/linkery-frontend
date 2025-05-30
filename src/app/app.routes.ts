import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'redirections', loadChildren: () => import('./pages/redirections/redirections.routes').then(m => m.REDIRECTIONS_ROUTES) }
];
