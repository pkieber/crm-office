import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';
import { Notes } from 'src/models/notes.class';
import { DialogAddNoteComponent } from 'src/app/components/dialog-add-note/dialog-add-note.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  noteId!: string;
  note$!: Observable<any>;
  allNotes: Notes[] = [];

  searchText: string = '';
  public showButtons = false;


  constructor(
    public dialog: MatDialog,
    private notesService: NotesService,
  ) { }


  ngOnInit(): void {
    this.loadNotes();
  }


  loadNotes() {
    this.notesService.loadNotes().subscribe((data: any) => {
      this.allNotes = data;
    });
  }


  onDelete(noteId: string) {
    this.notesService.deleteNotes(noteId);
  }


  /**
   * Opens the dialog for adding a new user.
   */
  openDialog() {
    const dialogRef = this.dialog.open(DialogAddNoteComponent);
  }


  /**
   * This search method will be called when custom event (user typing) from child-component (searchComponent) is raised.
   */
    onSearchTextEntered(searchValue: string) {
      this.searchText = searchValue;
    }
}
