import { Injectable } from '@angular/core';
import {
  Firestore,
  collection, addDoc,
  collectionData,
  doc, updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore: Firestore) { }


  addPassword(data: object) {
    const dbInstance = collection(this.firestore, `passwords`);
    return addDoc(dbInstance, data);
  }


  loadPasswords() {
    const dbInstance = collection(this.firestore, `passwords`);
    return collectionData(dbInstance, { idField: 'id' });
  }


  updatePassword(passwordId: string, data: object) {
    const docInstance = doc(this.firestore, `passwords`, passwordId);
    return updateDoc(docInstance, data);
  }


  deletePassword(passwordId: string) {
    const docInstance = doc(this.firestore, `passwords`, passwordId);
    return deleteDoc(docInstance);
  }

}
