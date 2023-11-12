import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notes } from 'src/models/notes.class';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-note',
  templateUrl: './dialog-edit-note.component.html',
  styleUrls: ['./dialog-edit-note.component.scss']
})
export class DialogEditNoteComponent {
  notes!: Notes;
  loading: boolean = false;
  id!: string;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogEditNoteComponent>,
    private snackBar: MatSnackBar
  ) {}


  /**
   * Updates the user's contact info and name in the database.
   */
  updateNote() {
    this.loading = true;
    const notesCollection = collection(this.firestore, 'notes');
    const docRef = doc(notesCollection, this.id);
    updateDoc(docRef, this.notes.toJSON())
      .then(() => {
        // Stop loader and close dialog
        this.loading = false;
        this.dialogRef.close();
        // Show success snackbar
        this.showSnackbar('Note updated successfully', 'success-snackbar');
      })
      .catch((error) => {
        console.error(error);
        // Show error snackbar
        this.showSnackbar('Failed to update note', 'error-snackbar');
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
