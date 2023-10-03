import { Component } from '@angular/core';
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

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogAddUserComponent>
  ) {}


  /**
   * Saves the user to the database.
   */
  async saveUser() {
    this.user.birthDate = this.birthDate.getTime(); // OKAY
    this.loading = true;
    const userCollection = collection(this.firestore, 'users');
    let result = await addDoc(userCollection, this.user.toJSON());

    // Add ID to user.name
    const docRef = doc(userCollection, result['id']);
    this.user.customIdName = result['id'];
    updateDoc(docRef, this.user.toJSON());

    // Stop loader and close dialog
    this.loading = false;
    this.dialogRef.close();
  }
}
