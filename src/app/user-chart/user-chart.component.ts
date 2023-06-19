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
  numberOfAdmin!: number;
  numberOfFinance!: number;
  numberOfMarketing!: number;
  numberOfSales!: number;
  numberOfProduction!: number;
  myChart: Chart | undefined;


  /**
   * Constructs a new UserComponent instance.
   * @param {MatDialog} dialog - The MatDialog service for opening dialogs.
   */
  constructor( public dialog: MatDialog) {
    const userCollection = collection(this.firestore, 'users');
    this.user$ = collectionData(userCollection);
  }


  /**
   * Initializes the user chart component.
   */
  ngOnInit(): void {
    this.userId = '';
    this.user = new User();
    this.user$.subscribe((changes: any) => {
      this.allUsers = changes;
      this.numberOfUsers = this.allUsers.length;
      this.numberOfAdmin = this.allUsers.filter(user => user.division === 'Admin').length;
      this.numberOfFinance = this.allUsers.filter(user => user.division === 'Finance').length;
      this.numberOfMarketing = this.allUsers.filter(user => user.division === 'Marketing').length;
      this.numberOfSales = this.allUsers.filter(user => user.division === 'Sales').length;
      this.numberOfProduction = this.allUsers.filter(user => user.division === 'Production').length;

      this.createChart();
    });
  }


  ngAfterViewInit(): void {
    this.createChart();
  }


  /**
   * Creates a new chart. By destroying the existing chart instance and drawing a new chart on the same canvas,
   * ... conflicts can be avoided.
   */
  createChart() {
    if (this.myChart) {
      this.myChart.destroy(); // Destroy the existing chart instance if it exists
    }

    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['Admin', 'Finance', 'Marketing', 'Sales', 'Production'],
        datasets: [{
          label: 'Staff Count',
          data: [
            this.numberOfAdmin,
            this.numberOfFinance,
            this.numberOfMarketing,
            this.numberOfSales,
            this.numberOfProduction
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false // Set display to false to hide the legend label
          }
        }
      }
    });
  }
}
