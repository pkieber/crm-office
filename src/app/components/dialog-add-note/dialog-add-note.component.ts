import { Component } from '@angular/core';
import { Notes } from 'src/models/notes.class';
import { Firestore, collection, doc, addDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-add-note',
  templateUrl: './dialog-add-note.component.html',
  styleUrls: ['./dialog-add-note.component.scss']
})
export class DialogAddNoteComponent {
  notes = new Notes();
  loading: boolean = false;
  notes$!: Observable<any>;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogAddNoteComponent>,
    private snackBar: MatSnackBar
  ) {}


  /**
   * Saves the user to the database.
   */
  async saveNote() {
    try {
      this.loading = true;
      const notesCollection = collection(this.firestore, 'notes');
      let result = await addDoc(notesCollection, this.notes.toJSON());

      // Add ID to user.name
      const docRef = doc(notesCollection, result['id']);
      this.notes.id = result['id'];
      await updateDoc(docRef, this.notes.toJSON());

      // Show success snackbar
      this.showSnackbar('Note added successfully', 'success-snackbar');
    } catch (error) {
      console.error(error);
      // Show error snackbar
      this.showSnackbar('Failed to add note', 'error-snackbar');
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
