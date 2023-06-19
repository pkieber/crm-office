import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user = new User();
  user$!: Observable<any>;

  allUsers!: Array<any>; // Empty array to save changes.

  constructor(private firestore: Firestore, public dialog: MatDialog) {
    const userCollection = collection(this.firestore, 'users');
    this.user$ = collectionData(userCollection);
    this.user$.subscribe(( changes: any ) => {
      this.allUsers = changes;
      console.log('Received changes from DB', changes);
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }
}
