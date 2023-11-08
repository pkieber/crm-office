import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { PasswordManagerService } from 'src/app/services/password-manager.service';
import { AES, enc } from 'crypto-js';
import { pwEnvironment } from 'src/environments/environment.pw';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteConfirmComponent } from 'src/app/components/dialog-delete-confirm/dialog-delete-confirm.component';
import { MatDialog } from '@angular/material/dialog';

export interface UserData {
  siteName: string;
  email: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent implements OnInit, AfterViewInit {
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

  displayedColumns: string[] = ['siteName', 'email', 'username', 'password', 'action'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private passwordManagerService: PasswordManagerService,
    public dialog: MatDialog,
  ) {}


  ngOnInit(): void {
    this.loadPasswordsFromFirestore();
  }


  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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


  loadPasswordsFromFirestore() {
    this.passwordManagerService.loadPasswords().subscribe((data: any) => {
      const passwords: UserData[] = data.map((doc: any) => ({
        siteName: doc.siteName,
        email: doc.email,
        username: doc.username,
        password: doc.password,
        id: doc.id,
      }));

      // Update passwordList
      this.passwordList = passwords;

      // Bind passwordList to the dataSource
      this.dataSource = new MatTableDataSource<UserData>(this.passwordList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  editPassword(passwordId: string, siteName: string, email: string, username: string, password: string) {
    this.passwordId = passwordId;
    this.siteName = siteName;
    this.email = email;
    this.username = username;
    this.password = password;

    this.formState = 'Edit';
  }


  /**
   * Delete password after confirmation.
   * @param passwordId
   */
  onDeletePassword(passwordId: string): void {
    const dialogRef = this.dialog.open(DialogDeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.passwordManagerService.deletePassword(passwordId)
      }
    });
  }


  // Password encryption (https://www.npmjs.com/package/crypto-js)
  encryptPassword(password: string) {
    const secretKey = pwEnvironment.secretKey;
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }


  decryptPassword(password: string) {
    const secretKey = pwEnvironment.secretKey;
    const decPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
    return decPassword;
  }


  onDecrypt(password: string, index: number) {
    const decPassword = this.decryptPassword(password);
    this.passwordList[index].password = decPassword;
  }

}
