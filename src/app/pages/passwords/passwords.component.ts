import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { PasswordManagerService } from 'src/app/services/password-manager.service';
import { AES, enc } from 'crypto-js';
import { pwEnvironment } from 'src/environments/environment.pw';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDeleteConfirmComponent } from 'src/app/components/dialog-delete-confirm/dialog-delete-confirm.component';

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

  public showButtons = false;

  displayedColumns: string[] = ['siteName', 'email', 'username', 'password', 'action'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatAccordion) accordion!: MatAccordion;


  constructor(
    private passwordManagerService: PasswordManagerService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
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
        .then(() => {
          this.showSnackbar('Password Added Successfully');
          // Reload passwords after adding a new one
          this.loadPasswordsFromFirestore();
          this.resetForm();
        })
        .catch(err => {
          console.log(err);
          this.showSnackbar('Failed to add password', 'error-snackbar');
        });
    } else if (this.formState == "Edit") {
      this.passwordManagerService.updatePassword(this.passwordId, values)
        .then(() => {
          this.showSnackbar('Password Updated Successfully');
          this.loadPasswordsFromFirestore();
          this.resetForm();
        })
        .catch(err => {
          console.log(err);
          this.showSnackbar('Failed to update password', 'error-snackbar');
        });
    }
  }


  showSnackbar(message: string, panelClass: string = 'success-snackbar'): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: [panelClass]
    });
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
    this.accordion.openAll()
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


  /**
   * Encrypt password with secret key.
   * @param password
   */
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
