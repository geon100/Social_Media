import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUserData } from 'src/app/state/UserState/user.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private store:Store){}
  ngOnInit(): void {
    this.store.dispatch(loadUserData())
  }
  


  
}
