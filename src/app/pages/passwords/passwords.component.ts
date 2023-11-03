import { PasswordManagerService } from 'src/app/services/password-manager.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AES, enc } from 'crypto-js'; // Imports encryption.
import { pwEnvironment } from 'src/environments/environment.pw';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent {
  siteId!: string;
  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;

  passwordList!: Array<any>;

  // editPassword()
  passwordId!: string;
  email!: string;
  username!: string;
  password!: string;

  formState: string = 'Add New';

  isSuccess: boolean = false;
  successMessage!: string;


  constructor( private route: ActivatedRoute, private passwordManagerService: PasswordManagerService ) {

    this.route.queryParams.subscribe((val: any) => {
      // console.log(val);
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImgURL = val.siteImgURL;
    });

    this.loadPasswords();
  }


  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }


  resetForm() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.formState = 'Add new';
    this.passwordId = '';
  }


  onSubmit(values: any) {
    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword;
    // console.log(values);


    if (this.formState == "Add New") {
      this.passwordManagerService.addPassword(values, this.siteId)
      .then(()=> {
        this.showAlert('Data Saved Successfully');
        this.resetForm();
      })
      .catch(err => {
        console.log(err);
      })
    }

    else if (this.formState == "Edit") {
      this.passwordManagerService.updatePassword(this.siteId, this.passwordId, values)
        .then(()=> {
          this.showAlert('Data Edited Successfully');
          this.resetForm();
        })
        .catch(err => {
          console.log(err);
        })
      }
    }


  loadPasswords() {
    this.passwordManagerService.loadPasswords(this.siteId).subscribe(val => {
      this.passwordList = val;
    });
  }


  editPassword(passwordId: string, email: string, username: string, password: string) {
    // Assign data variable to global variables.
    this.passwordId = passwordId;
    this.email = email;
    this.username = username;
    this.password = password;

    this.formState = 'Edit';
  }


  deletePassword(passwordId: string) {
    this.passwordManagerService.deletePassword(this.siteId, passwordId)
    .then(()=> {
      this.showAlert('Data Deleted Successfully');
    })
    .catch(err => {
      console.log(err);
    })
  }


  // Password encryption (https://www.npmjs.com/package/crypto-js)
  encryptPassword(password: string) {
    const secretKey = pwEnvironment.secretKey; // unique 256-bit key
    const encryptedPassword = AES.encrypt(password, secretKey).toString(); // returns ecrypted pw and stores it in var.
    console.log(encryptedPassword);
    return encryptedPassword;
  }


  decryptPassword(password: string) {
    const secretKey = pwEnvironment.secretKey; // unique 256-bit key
    const decPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
    return decPassword;
  }


  onDecrypt(password: string, index: number) {
    const decPassword = this.decryptPassword(password);
    this.passwordList[index].password = decPassword;
  }

}
