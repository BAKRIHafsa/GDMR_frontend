import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { CollaborateurListComponent } from './pages/collaborateur-list/collaborateur-list.component';
import { MedecinListComponent } from './pages/medecin-list/medecin-list.component';
import { ModifierCollaborateurComponent } from './pages/modifier-collaborateur/modifier-collaborateur.component';
import { ComptesArchivesComponent } from './pages/comptes-archives/comptes-archives.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AmedecinslistComponent } from './pages/amedecinslist/amedecinslist.component';
import { AcollaborateurslistComponent } from './pages/acollaborateurslist/acollaborateurslist.component';
import { CalendrierRHComponent } from './pages/calendrier-rh/calendrier-rh.component';
import { CalendrierMedComponent } from './pages/calendrier-med/calendrier-med.component';
import { DashboardRHComponent } from './pages/dashboard-rh/dashboard-rh.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { DashboardMedComponent } from './pages/dashboard-med/dashboard-med.component';
import { DashboardCollabComponent } from './pages/dashboard-collab/dashboard-collab.component';
import { MedecinDetailsComponent } from './pages/medecin-details/medecin-details.component';
import { CalendrierRhVisiteComponent } from './pages/calendrier-rh-visite/calendrier-rh-visite.component';
import { CalendrierCollabComponent } from './pages/calendrier-collab/calendrier-collab.component';
import { DemandeVisiteSpontaneeComponent } from './pages/demande-visite-spontanee/demande-visite-spontanee.component';
import { MedecinsDisponiblesComponent } from './pages/medecins-disponibles/medecins-disponibles.component'; 
import { VisitesMedCalendrierComponent } from './pages/visites-med-calendrier/visites-med-calendrier.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin-dashboard',
        component: DashboardAdminComponent,
        canActivate: [RoleGuard],
        data: { requiredRole: 'ADMINISTRATEUR' },
      },
      {
        path: 'collab-dashboard',
        component: DashboardCollabComponent,
        canActivate: [RoleGuard],
        data: { requiredRole: 'COLLABORATEUR' },
      },
      {
        path: 'rh-dashboard',
        component: DashboardRHComponent,
        canActivate: [RoleGuard],
        data: { requiredRole: 'CHARGE_RH' },
      },
      {
        path: 'med-dashboard',
        component: DashboardMedComponent,
        canActivate: [RoleGuard],
        data: { requiredRole: 'MEDECIN' },
      },

      {
        path: 'profile',
        component: ProfileComponent,
      },
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
        path: 'collaborateurs/modifier/:id',
        component: ModifierCollaborateurComponent,
      },
      {
        path: 'Amedecins',
        component: AmedecinslistComponent,
      },
      {
        path: 'Acollaborateurs',
        component: AcollaborateurslistComponent,
      },
      {
        path: 'calendrier-rh',
        component: CalendrierRHComponent,
      },
      {
        path: 'calendrier-collab',
        component: CalendrierCollabComponent,
      },
      {
        path: 'calendrier-med',
        component: CalendrierMedComponent,
      },
      {
        path: 'medecin-details/:id',
        component: MedecinDetailsComponent,
      },
      {
        path: 'calendrier-rh-visite',
        component: CalendrierRhVisiteComponent,
      },
      {
        path: 'medecins-disponibles', 
        component: MedecinsDisponiblesComponent,
      },
      {
        path: 'demande-visite-spontanee', 
        component: DemandeVisiteSpontaneeComponent,
      },
      {
        path: 'visites-med-calendrier', 
        component: VisitesMedCalendrierComponent,
      },
    ],
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
