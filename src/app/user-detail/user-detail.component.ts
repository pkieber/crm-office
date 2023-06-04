import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
//
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc} from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

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
  constructor(private route: ActivatedRoute) {
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

  openAddressDialog() {

  }

}
