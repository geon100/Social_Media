import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';

import { SocketService } from 'src/app/services/socket.service';
import { loadUserData } from 'src/app/state/UserState/user.actions';
import { getUser } from 'src/app/state/UserState/user.selector';

const mediaConstraints = {
  audio: true,
  video: {
    width: 720,
    height: 540,
  },
};
@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css']
})
export class VideocallComponent  {
  
}