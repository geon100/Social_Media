import { Component, ViewChild } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewPostComponent } from '../view-post/view-post.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  constructor(private adminService: AdminService,private dialog: MatDialog) {}

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['reportedContent', 'reportType', 'reportDetails', 'reportedBy', 'actions'];


  ngOnInit() {
    this.adminService.getReports().subscribe((reports:any)=>{
      this.dataSource.paginator=this.paginator
      console.log(reports)
      this.dataSource.data = reports
    })
    
  }

  viewDetails(report:any){
    if(report.type==='post'){
      this.dialog.open(ViewPostComponent, {
        width: '49%', 
        data: { post: report.reportedPost,report }
      });
    }else{
      this.dialog.open(ViewPostComponent, {
        width: '49%', 
        data: { report }
      });

    }
  }
}
