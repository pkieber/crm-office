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
import { PasswordsComponent } from './pages/passwords/passwords.component';
import { AuthGuard } from './services/auth.guard';
import { OverviewComponent } from './pages/overview/overview.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'password-recovery', component: PasswordRecoveryComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent},
  { path: '', component: MainComponent, canActivate: [AuthGuard],
    title: 'Simple-CRM',
    children: [
      { path: '', component: OverviewComponent, canActivate: [AuthGuard]},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
      { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
      { path: 'notes', component: NotesComponent, canActivate: [AuthGuard]},
      { path: 'notes/:id', component: NoteDetailComponent, canActivate: [AuthGuard]},
      { path: 'passwords', component: PasswordsComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
