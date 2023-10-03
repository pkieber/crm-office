import { Component } from '@angular/core';
import { Notes } from 'src/models/notes.class';
import { Firestore, collection, doc, addDoc, updateDoc} from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<DialogAddNoteComponent>
  ) {}


  /**
   * Saves the user to the database.
   */
  async saveNote() {
    this.loading = true;
    const notesCollection = collection(this.firestore, 'notes');
    let result = await addDoc(notesCollection, this.notes.toJSON());

    // Add ID to user.name
    const docRef = doc(notesCollection, result['id']);
    this.notes.customIdName = result['id'];
    updateDoc(docRef, this.notes.toJSON());

    // Stop loader and close dialog
    //this.loading = false;
    this.dialogRef.close();
  }
}

