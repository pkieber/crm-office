import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.scss']
})
export class UserChartComponent implements OnInit {

  userId: string = '';
  user: User = new User();
  firestore: Firestore = inject(Firestore);
  user$!: Observable<any>;

  allUsers!: Array<any>;
  numberOfUsers!: number;


  /**
   * Constructs a new UserComponent instance.
   * @param {MatDialog} dialog - The MatDialog service for opening dialogs.
   */
  constructor( public dialog: MatDialog) {
    const userCollection = collection(this.firestore, 'users');
    this.user$ = collectionData(userCollection);


    /**
    * Observable that emits changes to the user collection.
    * The total count of users (used for chart analysis).
    */
    this.user$.subscribe(( changes: any ) => {
      this.allUsers = changes;
      this.numberOfUsers = this.allUsers.length;
      console.log('Received changes from DB', changes);
    });
  }


  /**
   * Shows chart info.
   */
  ngOnInit(): void {
    let myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: ['Admin', 'Finance', 'Marketing', 'Sales', 'Production'],
          datasets: [{
              label: 'Staff Count',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });
  }
}
