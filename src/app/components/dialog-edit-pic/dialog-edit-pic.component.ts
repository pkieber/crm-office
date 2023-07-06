import { Component } from '@angular/core';
import { doc, updateDoc, Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-pic',
  templateUrl: './dialog-edit-pic.component.html',
  styleUrls: ['./dialog-edit-pic.component.scss']
})
export class DialogEditPicComponent {
  user!: User;
  userId!: string;
  loading: boolean = false;
  profilePictures = [
    "user1.png",
    "user2.png",
    "user3.png",
    "user4.png"
  ];

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogEditPicComponent>) {}


  async saveUserPic(picture: string) {
    this.loading = true;
    this.user.profilePic = picture;
    const docRef = doc(this.firestore, 'users', this.userId);
    await updateDoc(docRef, this.user.toJSON());
    this.dialogRef.close();
    this.loading = false;
  }
}
