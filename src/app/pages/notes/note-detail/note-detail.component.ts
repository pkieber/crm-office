import { Component, Input } from '@angular/core';
import { NoteModel } from 'src/models/notes.class';
import { NotesService } from 'src/app/services/notes.service';
import { DialogDeleteConfirmComponent } from 'src/app/components/dialog-delete-confirm/dialog-delete-confirm.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent {
  @Input() note!: NoteModel;
  editInfo: boolean = false;
  editedNote: NoteModel = { id: '0', title: '', content: '', type: '' };
  public showButtons = false;

  constructor(
    private noteService: NotesService,
    public dialog: MatDialog,
  ) {}


  openEditInfo() {
    // Copy the values from the original note to the editedNote
    this.editedNote = { ...this.note };
    this.editInfo = true;
  }


  saveEditInfo() {
    // Update the note in Firestore using the NoteService
    this.noteService.updateNotes(this.note.id, this.editedNote)
      .then(() => {
        this.editInfo = false;
      })
      .catch(error => {
        console.error('Error updating note:', error);
        // Handle error as needed (e.g., show an error message)
      });
  }


  /**
   * Delete user after confirmation.
   * @param userId
   */
  onDelete(): void {
    const dialogRef = this.dialog.open(DialogDeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.noteService.deleteNotes(this.note.id);
      }
    });
  }

}
