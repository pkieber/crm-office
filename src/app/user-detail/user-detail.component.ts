import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  userId: string = '';
  user: User = new User(); // JSON wird in Object umgewandelt
  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id') ?? ''; // Use nullish coalescing operator to handle null value.
      // console.log('Got Id', this.userId);
      this.getUser();
    });
  }

  /**
  * Retrieves the user data from the Firestore database based on the userId.
  */
  getUser() {
    const userCollection = collection(this.firestore, 'users');
    const docRef = doc(userCollection, this.userId);

  /**
   * Subscribe to the docData observable to retrieve the user data.
   *
   * @param userCollection - The retrieved user data from Firestore.
   */
    docData(docRef).subscribe((userCollection: any) => {
      this.user = new User(userCollection);
      // console.log('Retrieved user', this.user);
    });
  }


  /**
   * Opens the dialog for editing the user's details.
   */
  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User (this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }


  /**
   * Opens the dialog for editing the user's address.
   */
  editAddressDetail() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User (this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
