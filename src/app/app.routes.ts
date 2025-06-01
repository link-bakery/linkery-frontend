import { Routes } from '@angular/router';
import { PanelComponent } from './overlays/panel/panel.component';
import { coreGuard } from './core/guards/core.guard';

export const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.routes').then(m => m.LOGIN_ROUTES) },
  { path: 'redirections', component: PanelComponent, loadChildren: () => import('./pages/redirections/redirections.routes').then(m => m.REDIRECTIONS_ROUTES), canActivate: [coreGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];
