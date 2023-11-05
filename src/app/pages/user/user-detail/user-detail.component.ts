import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { DialogEditUserComponent } from '../../../components/dialog-edit-user/dialog-edit-user.component';
import { DialogEditPicComponent } from '../../../components/dialog-edit-pic/dialog-edit-pic.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  id: string = '';
  user: User = new User();


  constructor(private firestore: Firestore, private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.paramMap.subscribe( paramMap => {
      this.id = paramMap.get('id') ?? '';
      this.getUser();
    });
  }


  getUser() {
    const userCollection = collection(this.firestore, 'users');
    const docRef = doc(userCollection, this.id);


    docData(docRef).subscribe((userCollection: any) => {
      this.user = new User(userCollection);
    });
  }


  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User (this.user.toJSON());
    dialog.componentInstance.id = this.id;
  }


  editPictureDetail() {
    const dialog = this.dialog.open(DialogEditPicComponent);
    dialog.componentInstance.user = new User (this.user.toJSON());
    dialog.componentInstance.userId = this.id;
  }
}
