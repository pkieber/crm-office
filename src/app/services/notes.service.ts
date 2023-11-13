import { Injectable } from '@angular/core';
import {
  Firestore,
  collection, addDoc,
  collectionData,
  doc, updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private firestore: Firestore,
    private snackBar: MatSnackBar
  ) {}


  addNotes(data: object) {
    const dbInstance = collection(this.firestore, 'notes');
    return addDoc(dbInstance, data);
  }


  loadNotes() {
    const dbInstance = collection(this.firestore, 'notes');
    return collectionData(dbInstance, { idField: 'id' });
  }


  updateNotes(id: string, data: object): Promise<void> {
    const docInstance = doc(this.firestore, 'notes', id);
    return updateDoc(docInstance, data)
      .then(() => {
        this.showSuccess('Note updated successfully');
      })
      .catch(error => {
        console.error('Error updating note:', error);
      });
  }


  deleteNotes(id: string) {
    const docInstance = doc(this.firestore, 'notes', id);
    return deleteDoc(docInstance).then(() => {
      this.showSuccess('Note deleted successfully');
    });
  }


  private showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}
