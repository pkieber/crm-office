import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Notes } from 'src/models/notes.class';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { DialogEditNoteComponent } from 'src/app/components/dialog-edit-note/dialog-edit-note.component';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent {

  noteId: string = '';
  notes: Notes = new Notes();


  constructor(private firestore: Firestore, private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.paramMap.subscribe( paramMap => {
      this.noteId = paramMap.get('id') ?? '';
      this.loadNotes();
    });
  }


  loadNotes() {
    const notesCollection = collection(this.firestore, 'notes');
    const docRef = doc(notesCollection, this.noteId);

    docData(docRef).subscribe((notesCollection: any) => {
      this.notes = new Notes(notesCollection);
    });
  }


  editNoteDetail() {
    const dialog = this.dialog.open(DialogEditNoteComponent);
    dialog.componentInstance.notes = new Notes (this.notes.toJSON());
    dialog.componentInstance.noteId = this.noteId;
  }

}
