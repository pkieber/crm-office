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
export class UserService {

  constructor(private firestore: Firestore, private toastr: ToastrService) {}

  addUser (data: object) {
    const dbInstance = collection(this.firestore, 'users');
    this.toastr.success('Data Added Successfully');
    return addDoc(dbInstance, data);
  }


  loadUser() {
    const dbInstance = collection(this.firestore, 'users');
    return collectionData(dbInstance, { idField: 'id' });
  }


  updateUser(userId: string, data: object): Promise<void> {
    const docInstance = doc(this.firestore, 'users', userId);
    this.toastr.success('Data Updated Successfully');
    return updateDoc(docInstance, data);
  }


  deletUser(userId: string) {
    const docInstance = doc(this.firestore, 'users', userId);
    this.toastr.success('Data Deleted Successfully');
    return deleteDoc(docInstance);
  }

}
