import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, updateDoc} from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user!: User;
  loading = false;
  userId!: string;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogEditUserComponent>
  ) {}


  /**
   * Updates the user's contact info and name in the database.
   */
  updateUser() {
    this.loading = true;
    const userCollection = collection(this.firestore, 'users');
    const docRef = doc(userCollection, this.userId);
    updateDoc(docRef, this.user.toJSON())
      .then(() => {
        // Stop loader and close dialog
        this.loading = false;
        this.dialogRef.close();
      }
    );
  }
}
