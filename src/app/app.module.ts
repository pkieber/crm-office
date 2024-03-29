import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


// Components
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { DialogEditUserComponent } from './components/dialog-edit-user/dialog-edit-user.component';
import { DialogEditPicComponent } from './components/dialog-edit-pic/dialog-edit-pic.component';

// Material Design (material.angular.io)
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddUserComponent } from './components/dialog-add-user/dialog-add-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';


// Firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

// Charts
import { UserChartComponent } from './components/user-chart/user-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './auth/login/login.component';
import { PasswordRecoveryComponent } from './auth/password-recovery/password-recovery.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotesComponent } from './pages/notes/notes.component';
import { DialogAddNoteComponent } from './components/dialog-add-note/dialog-add-note.component';
import { NoteDetailComponent } from './pages/notes/note-detail/note-detail.component';
import { PasswordsComponent } from './pages/passwords/passwords.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { DialogDeleteConfirmComponent } from './components/dialog-delete-confirm/dialog-delete-confirm.component';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    DialogAddUserComponent,
    UserDetailComponent,
    DialogEditUserComponent,
    DialogEditPicComponent,
    UserChartComponent,
    SearchComponent,
    LoginComponent,
    PasswordRecoveryComponent,
    MainComponent,
    RegisterComponent,
    NotesComponent,
    DialogAddNoteComponent,
    NoteDetailComponent,
    PasswordsComponent,
    OverviewComponent,
    ImprintComponent,
    DialogDeleteConfirmComponent,
    DialogConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTableModule,
    MatRadioModule,
    MatExpansionModule,
    MatSnackBarModule,
    NgChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
