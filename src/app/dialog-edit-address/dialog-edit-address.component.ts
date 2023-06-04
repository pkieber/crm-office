import { User } from 'src/models/user.class';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user!: User;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {}

  saveUser() {}
}
