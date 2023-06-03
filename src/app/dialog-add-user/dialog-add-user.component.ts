import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc} from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false;

  user$!: Observable<any>;
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {}

  saveUser() {
    this.user.birthDate = this.birthDate.getTime(); // OKAY
    console.log('Current user: ', this.user);
    this.loading = true;
    const userCollection = collection(this.firestore, 'users'); // In Firestore wird Sammlung "users" mit JSON-Input erstellt.
    let result = addDoc(userCollection, this.user.toJSON());
    this.dialogRef.close();
    this.loading = false;
  }
}
