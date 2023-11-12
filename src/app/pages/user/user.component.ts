import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../../components/dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteConfirmComponent } from 'src/app/components/dialog-delete-confirm/dialog-delete-confirm.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {
  id!: string;
  allUsers: User[] = [];
  public showButtons = false;
  number!: string;

  displayedColumns: string[] = ['name', 'email', 'division', 'action'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.loadUserFromFirestore();
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


  loadUserFromFirestore() {
    this.userService.loadUser().subscribe((data: object) => {
      const userData: User[] = Object.values(data) as User[];

      this.dataSource = new MatTableDataSource(userData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  /**
   * Delete user after confirmation.
   * @param userId
   */
  onDelete(userId: string): void {
    const dialogRef = this.dialog.open(DialogDeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.userService.deleteUser(userId);
      }
    });
  }


  /**
   * Opens the dialog for adding a new user.
   */
  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }

}
