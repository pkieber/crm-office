import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user!: User;
  birthDate!: Date;
  loading = false;
  id!: string;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private snackBar: MatSnackBar
  ) {}


  /**
   * Updates the user's contact info and name in the database.
   */
  updateUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    const userCollection = collection(this.firestore, 'users');
    const docRef = doc(userCollection, this.id);
    updateDoc(docRef, this.user.toJSON())
      .then(() => {
        // Stop loader and close dialog
        this.loading = false;
        this.dialogRef.close();
        // Show success snackbar
        this.showSnackbar('User updated successfully', 'success-snackbar');
      })
      .catch((error) => {
        console.error(error);
        // Show error snackbar
        this.showSnackbar('Failed to update user', 'error-snackbar');
        this.loading = false;
      });
  }


  /**
   * Shows a snackbar with the given message and CSS class.
   * @param message The message to display in the snackbar.
   * @param panelClass The CSS class for styling the snackbar.
   */
  showSnackbar(message: string, panelClass: string = 'default-snackbar'): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: [panelClass]
    });
  }
}
