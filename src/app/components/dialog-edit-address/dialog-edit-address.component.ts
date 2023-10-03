import { User } from 'src/models/user.class';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, doc, updateDoc} from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user!: User;
  userId!: string;
  loading = false;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogEditAddressComponent>
  ) {}


  /**
   * Updates the user's address in the database.
   */
  updateUserAddress() {
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
