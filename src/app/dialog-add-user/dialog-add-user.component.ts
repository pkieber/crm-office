import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, addDoc, updateDoc} from '@angular/fire/firestore';
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

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime(); // OKAY
    console.log('Current user: ', this.user);
    this.loading = true;
    const userCollection = collection(this.firestore, 'users'); // In Firestore wird Sammlung "users" mit JSON-Input erstellt.
    let result = await addDoc(userCollection, this.user.toJSON());

    // Add ID to user.name
    const docRef = doc(userCollection, result['id']);
    this.user.customIdName = result['id'];
    console.log('Custom ID: ', this.user.customIdName);
    updateDoc(docRef, this.user.toJSON());

    // Stop loader and close dialog
    this.loading = false;
    this.dialogRef.close();
  }
}
