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
export class PasswordManagerService {

  constructor(
    private firestore: Firestore,
    private snackBar: MatSnackBar
  ) { }


  addPassword(data: object) {
    const dbInstance = collection(this.firestore, `passwords`);
    return addDoc(dbInstance, data).then(() => {
      this.showSuccess('Password Added Successfully');
    });
  }

  loadPasswords() {
    const dbInstance = collection(this.firestore, `passwords`);
    return collectionData(dbInstance, { idField: 'id' });
  }


  updatePassword(passwordId: string, data: object) {
    const docInstance = doc(this.firestore, `passwords`, passwordId);
    return updateDoc(docInstance, data).then(() => {
      this.showSuccess('Password Updated Successfully');
    });
  }


  deletePassword(passwordId: string) {
    const docInstance = doc(this.firestore, `passwords`, passwordId);
    return deleteDoc(docInstance).then(() => {
      this.showSuccess('Password Deleted Successfully');
    });
  }


  private showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}
