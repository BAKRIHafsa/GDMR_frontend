/* import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'',
    redirectTo : 'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'',
    component: LayoutComponent,
    children: [
      {
        path:'dashboard',
        component:DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 */
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthGuard } from './auth.guard';
import { CollaborateurListComponent } from './pages/collaborateur-list/collaborateur-list.component';
import { MedecinListComponent } from './pages/medecin-list/medecin-list.component';
import { ModifierCollaborateurComponent } from './pages/modifier-collaborateur/modifier-collaborateur.component';
import { ComptesArchivesComponent } from './pages/comptes-archives/comptes-archives.component';

const routes: Routes = [
  /* { path: 'login', component: LoginComponent },
  { path: 'main', component: MainPageComponent, canActivate: [AuthGuard] },
  {
    path: 'collaborateurs',
    component: CollaborateurListComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' }, */
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'collaborateurs',
        component: CollaborateurListComponent,
      },
      {
        path: 'medecins',
        component: MedecinListComponent,
      },
      {
        path: 'comptesArchivés',
        component: ComptesArchivesComponent,
      },
      {
        path: 'collaborateurs/modifier/:id', //modifier-collaborateur/:id
        component: ModifierCollaborateurComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
