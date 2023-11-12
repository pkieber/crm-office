import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, addDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private snackBar: MatSnackBar
  ) {}


  /**
   * Saves the user to the database.
   */
  async saveUser() {
    try {
      this.user.birthDate = this.birthDate.getTime();
      console.log('Current user is: ', this.user);
      this.loading = true;
      const userCollection = collection(this.firestore, 'users');
      let result = await addDoc(userCollection, this.user.toJSON());

      // Add ID to user.name
      const docRef = doc(userCollection, result['id']);
      this.user.id = result['id'];
      await updateDoc(docRef, this.user.toJSON());

      // Show success snackbar
      this.showSnackbar('User added successfully', 'success-snackbar');
    } catch (error) {
      console.error(error);
      // Show error snackbar
      this.showSnackbar('Failed to add user', 'error-snackbar');
    } finally {
      // Stop loader and close dialog
      this.loading = false;
      this.dialogRef.close();
    }
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
