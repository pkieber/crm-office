import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  onSubmitAdmin(formValue: any) {
    this.authService.login(formValue.email, formValue.password)
  }

  onSubmitGuest(){
    this.authService.anonSignIn();
  }

}
