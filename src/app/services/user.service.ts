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
export class UserService {

  constructor(
    private firestore: Firestore,
    private snackBar: MatSnackBar
  ) {}


  addUser(data: object) {
    const dbInstance = collection(this.firestore, 'users');
    return addDoc(dbInstance, data);
  }


  loadUser() {
    const dbInstance = collection(this.firestore, 'users');
    return collectionData(dbInstance, { idField: 'id' });
  }


  updateUser(id: string, data: object): Promise<void> {
    const docInstance = doc(this.firestore, 'users', id);
    return updateDoc(docInstance, data);
  }


  deleteUser(id: string) {
    const docInstance = doc(this.firestore, 'users', id);
    return deleteDoc(docInstance).then(() => {
      this.showSuccess('User Deleted Successfully');
    });
  }


  private showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}
