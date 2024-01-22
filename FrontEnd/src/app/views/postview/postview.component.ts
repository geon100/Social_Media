import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/models/all.interface';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.css']
})
export class PostviewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { post: Post ,comment:boolean}) {}
  
}
