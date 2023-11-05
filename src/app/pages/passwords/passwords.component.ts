import { PasswordManagerService } from 'src/app/services/password-manager.service';
import { Component } from '@angular/core';

import { AES, enc } from 'crypto-js'; // Imports encryption.
import { pwEnvironment } from 'src/environments/environment.pw';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent {
  passwordList!: Array<any>;
  passwordId!: string;
  siteName!: string;
  email!: string;
  username!: string;
  password!: string;
  formState: string = 'Add New';

  isSuccess: boolean = false;
  successMessage!: string;

  public showButtons = false;


  constructor(private passwordManagerService: PasswordManagerService ) {

    this.loadPasswords();
  }


  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }


  resetForm() {
    this.siteName = '';
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
      this.passwordManagerService.addPassword(values)
      .then(()=> {
        this.showAlert('Data Saved Successfully');
        this.resetForm();
      })
      .catch(err => {
        console.log(err);
      })
    }

    else if (this.formState == "Edit") {
      this.passwordManagerService.updatePassword(this.passwordId, values)
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
    this.passwordManagerService.loadPasswords().subscribe(val => {
      this.passwordList = val;
    });
  }


  editPassword(passwordId: string, siteName: string, email: string, username: string, password: string) {
    // Assign data variable to global variables.
    this.passwordId = passwordId;
    this.siteName = siteName;
    this.email = email;
    this.username = username;
    this.password = password;

    this.formState = 'Edit';
  }


  deletePassword(passwordId: string) {
    this.passwordManagerService.deletePassword(passwordId)
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
