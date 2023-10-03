import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userId!: string;
  user$!: Observable<any>;
  allUsers: User[] = [];

  searchText: string = '';
  public showButtons = false;


  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.loadUser();
  }


  loadUser() {
    this.userService.loadUser().subscribe((data: any) => {
      this.allUsers = data;
    });
  }


  onDelete(userId: string) {
    this.userService.deletUser(userId);
  }


  /**
   * Opens the dialog for adding a new user.
   */
  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }


  /**
   * This search method will be called when custom event (user typing) from child-component (searchComponent) is raised.
   */
    onSearchTextEntered(searchValue: string) {
      this.searchText = searchValue;
      // console.log(this.searchText);
    }
}
