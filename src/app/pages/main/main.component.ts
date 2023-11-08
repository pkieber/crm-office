import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  selectedOption: string = '1'; // Change toolbar-color

  constructor(private authService: AuthService) {}


  onLogout() {
    this.authService.logout();
  }

  openLegal() {}

}
