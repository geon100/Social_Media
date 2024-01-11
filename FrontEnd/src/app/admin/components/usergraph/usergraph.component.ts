import {  Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-usergraph',
  templateUrl: './usergraph.component.html',
  styleUrls: ['./usergraph.component.css']
})
export class UsergraphComponent implements OnInit {
  public chartOptions: AgChartOptions;
  public selectedYear!: number;
  public availableYears: number[] = [2022, 2023, 2024]; // Add the years you have data for

  constructor(private adminService: AdminService) {
    this.chartOptions = {
      data: [], 
      series: [{ type: 'line', xKey: 'month', yKey: 'count' }]
    };
  }

  ngOnInit() {
    
    this.selectedYear = new Date().getFullYear();
    this.fetchAndProcessUserData();
  }

  onSelectYear() {
    console.log(this.selectedYear)
    // this.cdr.detectChanges();
    this.fetchAndProcessUserData();
  }

  private fetchAndProcessUserData() {
    this.adminService.getUsers().subscribe((userData: any[]) => {
      const filteredUserData = this.filterUserDataByYear(userData, Number(this.selectedYear));
      const userCountData = this.processUserData(filteredUserData);
      console.log(this.selectedYear)
      this.chartOptions.data = userCountData; 
      this.chartOptions = { ...this.chartOptions };
    });
  }
  
  private filterUserDataByYear(userData: any[], selectedYear: number): any[] {
    return userData.filter(user => {
      const userYear = new Date(user.createdAt).getFullYear();
      return userYear === selectedYear;
    });
  }
  

  private processUserData(userData: any[]): any[] {
    // Similar to your existing processing logic, but now only for the selected year
    const userCountMap = this.initializeUserCountMap();

    userData.forEach(user => {
      try {
        const month = this.getMonthFromDate(user.createdAt);
        userCountMap.set(month, (userCountMap.get(month) || 0) + 1);
      } catch (error) {
        console.error('Error processing user:', user, error);
      }
    });

    const userCountData = Array.from(userCountMap).map(([month, count]) => ({
      month,
      'count': count
    }));

    return userCountData;
  }

  private initializeUserCountMap(): Map<string, number> {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const userCountMap = new Map<string, number>();

    monthNames.forEach(month => {
      userCountMap.set(month, 0);
    });

    return userCountMap;
  }

  private getMonthFromDate(dateString: string): string {
    const date = new Date(dateString);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[date.getMonth()];
  }
}
