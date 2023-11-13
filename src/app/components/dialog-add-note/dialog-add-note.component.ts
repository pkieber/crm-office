import { Component } from '@angular/core';
import { NoteModel } from 'src/models/notes.class';
import { Firestore, collection, doc, addDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-note',
  templateUrl: './dialog-add-note.component.html',
  styleUrls: ['./dialog-add-note.component.scss']
})
export class DialogAddNoteComponent {
  note: NoteModel = { id: '', title: '', content: '', type: '' };
  loading: boolean = false;
  notes$!: Observable<any>;
  formGroup: FormGroup;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogAddNoteComponent>,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }


  /**
   * Saves the notes to the database.
   */
  async saveNote() {
    try {
      if (this.formGroup.valid) {
        this.loading = true;
        const notesCollection = collection(this.firestore, 'notes');

        // Use form values instead of direct assignment
        this.note = { ...this.formGroup.value, id: '' };

        let result = await addDoc(notesCollection, this.note);

        // Add ID to note > this lines of code dynamically add a unique ID (see note-interface).
        const docRef = doc(notesCollection, result.id);
        this.note.id = result.id;
        await updateDoc(docRef, this.note);

        // Show success snackbar
        this.showSnackbar('Note added successfully', 'success-snackbar');
      } else {
        // Form is invalid, show error snackbar
        this.showSnackbar('Please fill in all required fields', 'error-snackbar');
      }
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
