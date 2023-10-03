import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PasswordRecoveryComponent } from './components/auth/password-recovery/password-recovery.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainComponent } from './components/main/main.component';
import { NotesComponent } from './pages/notes/notes.component';
import { NoteDetailComponent } from './pages/note-detail/note-detail.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'password-recovery', component: PasswordRecoveryComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'main', component: MainComponent,
    title: 'Simple-CRM',
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'user', component: UserComponent},
      { path: 'user/:id', component: UserDetailComponent},
      { path: 'notes', component: NotesComponent},
      { path: 'notes/:id', component: NoteDetailComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
