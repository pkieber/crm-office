import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DialogConfirmationComponent } from 'src/app/components/dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  onSubmitAdmin(formValue: any) {
    this.authService.login(formValue.email, formValue.password)
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onSubmitGuest();
      }
    });
  }

  onSubmitGuest(){
    this.authService.anonSignIn();
  }

}
