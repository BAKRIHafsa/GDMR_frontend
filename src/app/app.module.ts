import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './pages/authentication/auth.interceptor';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CollaborateurListComponent } from './pages/collaborateur-list/collaborateur-list.component';
import { MedecinListComponent } from './pages/medecin-list/medecin-list.component';
import { ModifierCollaborateurComponent } from './pages/modifier-collaborateur/modifier-collaborateur.component';
import { ArchiverCollaborateurComponent } from './pages/archiver-collaborateur/archiver-collaborateur.component';
import { ComptesArchivesComponent } from './pages/comptes-archives/comptes-archives.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    SidebarComponent,
    MainPageComponent,
    CollaborateurListComponent,
    MedecinListComponent,
    ModifierCollaborateurComponent,
    ArchiverCollaborateurComponent,
    ComptesArchivesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
