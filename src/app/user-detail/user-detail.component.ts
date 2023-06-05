import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
//
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc} from '@angular/fire/firestore';

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

  // Get User ID from the database subscription.
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id') ?? ''; // Use nullish coalescing operator to handle null value.
      console.log('Got Id', this.userId);
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
      console.log('Retrieved user', this.user);
    });
  }

  // Nutzer wird an neue Komponente übergeben --> Kopie vom Nutzer-Objekt erstellen, wenn es editierbar sein soll!
  // D.h. JSON wird als Parameter dem neuen Nutzer (new User) als Kopie übergeben. Ansonsten würden Änderungen auch ohne Speichern übernommen.
  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User (this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editAddressDetail() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User (this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
