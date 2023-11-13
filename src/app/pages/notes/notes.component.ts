import { Component, OnInit } from '@angular/core';
import { NoteModel } from 'src/models/notes.class';
import { NotesService } from 'src/app/services/notes.service';
import { DialogAddNoteComponent } from 'src/app/components/dialog-add-note/dialog-add-note.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  noteList: NoteModel[] = [];
  filteredNotes: NoteModel[] = [];
  searchText: string = '';

  constructor(
    private noteService: NotesService,
    public dialog: MatDialog,
  ) {}


  ngOnInit(): void {
    this.loadNotes();
  }


  loadNotes() {
    this.noteService.loadNotes().subscribe((data: any) => {
      this.noteList = data;
      this.filteredNotes = this.noteList; // Move this line here
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddNoteComponent, {
      width: '400px', // Set the width according to your design
    });

    dialogRef.afterClosed().subscribe(newNote => {
      // Handle the newNote returned from the dialog, if needed
      if (newNote) {
        this.noteList.push(newNote);
      }
    });
  }

    /**
   * This search method will be called when custom event (user typing) from child-component (searchComponent) is raised.
   */
    onSearchTextEntered(searchValue: string) {
      this.searchText = searchValue.toLowerCase();
      this.filterNotes();
    }

    private filterNotes() {
      this.filteredNotes = this.noteList.filter(
        (note) =>
          this.searchText === '' ||
          note.title.toLowerCase().includes(this.searchText) ||
          note.content.toLowerCase().includes(this.searchText)
      );
    }

}
