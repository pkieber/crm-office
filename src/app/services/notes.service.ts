import { Injectable } from '@angular/core';
import {
  Firestore,
  collection, addDoc,
  collectionData,
  doc, updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private firestore: Firestore, private toastr: ToastrService) {}

  addNotes (data: object) {
    const dbInstance = collection(this.firestore, 'notes');
    this.toastr.success('Data Added Successfully');
    return addDoc(dbInstance, data);
  }


  loadNotes() {
    const dbInstance = collection(this.firestore, 'notes');
    return collectionData(dbInstance, { idField: 'id' });
  }


  updateNotes(notesId: string, data: object): Promise<void> {
    const docInstance = doc(this.firestore, 'notes', notesId);
    this.toastr.success('Data Updated Successfully');
    return updateDoc(docInstance, data);
  }


  deleteNotes(notesId: string) {
    const docInstance = doc(this.firestore, 'notes', notesId);
    this.toastr.success('Data Deleted Successfully');
    return deleteDoc(docInstance);
  }

}
