import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common'
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './pages/authentication/auth.interceptor';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MedecinListComponent } from './pages/medecin-list/medecin-list.component';
import { CollaborateurListComponent } from './pages/collaborateur-list/collaborateur-list.component';
import { ModifierCollaborateurComponent } from './pages/modifier-collaborateur/modifier-collaborateur.component';
import { ComptesArchivesComponent } from './pages/comptes-archives/comptes-archives.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PasswordChangeDialogComponent } from './pages/password-change-dialog/password-change-dialog.component';
import { AmedecinslistComponent } from './pages/amedecinslist/amedecinslist.component';
import { AcollaborateurslistComponent } from './pages/acollaborateurslist/acollaborateurslist.component';
import { CalendrierRHComponent } from './pages/calendrier-rh/calendrier-rh.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DashboardRHComponent } from './pages/dashboard-rh/dashboard-rh.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { DashboardMedComponent } from './pages/dashboard-med/dashboard-med.component';
import { DashboardCollabComponent } from './pages/dashboard-collab/dashboard-collab.component';
import { CalendrierMedComponent } from './pages/calendrier-med/calendrier-med.component';
import { AddDisponibiliteDialogComponent } from './pages/add-disponibilite-dialog/add-disponibilite-dialog.component';
import { MedecinDetailsComponent } from './pages/medecin-details/medecin-details.component';
import { CalendrierRhVisiteComponent } from './pages/calendrier-rh-visite/calendrier-rh-visite.component';
import { CalendrierCollabComponent } from './pages/calendrier-collab/calendrier-collab.component';
import { VisitedetailscollabComponent } from './pages/visitedetailscollab/visitedetailscollab.component';
import { CreneauModalComponent } from './pages/creneau-modal/creneau-modal.component';
import { CreateCollabPopupComponent } from './pages/create-collab-popup/create-collab-popup.component';
import { CreateMedPopupComponent } from './pages/create-med-popup/create-med-popup.component';
import { DisponibiliteDetailComponent } from './pages/disponibilite-detail/disponibilite-detail.component';
import { MedecinsDisponiblesComponent } from './pages/medecins-disponibles/medecins-disponibles.component';
import { DossierMedicalPopUpComponent } from './pages/dossier-medical-pop-up/dossier-medical-pop-up.component';
import { DossierMedicalDetailsComponent } from './pages/dossier-medical-details/dossier-medical-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    SidebarComponent,
    MainPageComponent,
    CollaborateurListComponent,
    MedecinListComponent,
    ModifierCollaborateurComponent,
    ComptesArchivesComponent,
    ProfileComponent,
    PasswordChangeDialogComponent,
    AmedecinslistComponent,
    AcollaborateurslistComponent,
    CalendrierRHComponent,
    ChangePasswordComponent,
    DashboardRHComponent,
    DashboardAdminComponent,
    DashboardMedComponent,
    DashboardCollabComponent,
    CalendrierMedComponent,
    AddDisponibiliteDialogComponent,
    MedecinDetailsComponent,
    CalendrierRhVisiteComponent,
    CalendrierCollabComponent,
    VisitedetailscollabComponent,
    CreneauModalComponent,
    CreateCollabPopupComponent,
    CreateMedPopupComponent,
    DisponibiliteDetailComponent,
    MedecinsDisponiblesComponent,
    DossierMedicalPopUpComponent,
    DossierMedicalDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FullCalendarModule,
    CommonModule,
    MatIconModule,
    MatSelectModule,
    BrowserAnimationsModule,
  ],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
