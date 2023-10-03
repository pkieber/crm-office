import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Notes } from 'src/models/notes.class';
import { Firestore, collection, doc, updateDoc} from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-note',
  templateUrl: './dialog-edit-note.component.html',
  styleUrls: ['./dialog-edit-note.component.scss']
})
export class DialogEditNoteComponent {
  notes!: Notes;
  loading: boolean = false;
  noteId!: string;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogEditNoteComponent>
  ) {}


  /**
   * Updates the user's contact info and name in the database.
   */
  updateNote() {
    this.loading = true;
    const notesCollection = collection(this.firestore, 'notes');
    const docRef = doc(notesCollection, this.noteId);
    updateDoc(docRef, this.notes.toJSON())
      .then(() => {
        // Stop loader and close dialog
        this.loading = false;
        this.dialogRef.close();
      }
    );
  }
}
