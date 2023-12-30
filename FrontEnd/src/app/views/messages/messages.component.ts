import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { ChatService } from 'src/app/services/chat.service';
import { loadUserData } from 'src/app/state/UserState/user.actions';
import { getUser } from 'src/app/state/UserState/user.selector';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements AfterViewInit{
  chats: any[] = [];
  messages:any=[]
  messageText:string=''
  selectedUser:any
  currentUser!:User
  @ViewChild('chatBox') chatBox!: ElementRef;
  constructor(private service:ChatService,private store:Store) { }
  ngAfterViewInit(): void {
    this.scrollToBottom()
  }

  ngOnInit(): void {
    this.service.loadChat().subscribe((res:any)=>{
      this.chats=res
    })
    
    this.store.select(getUser).subscribe(val=>{
      if (val) this.currentUser=val
      else{
        this.store.dispatch(loadUserData())
        this.store.select(getUser).subscribe(val=>{
          if (val) this.currentUser=val
        })
      }
    })
    
    
  }

  selectUser(chat:any): void {
    this.selectedUser = chat;
    this.service.loadmessages(this.selectedUser._id).subscribe((res)=>{
      // alert(this.currentUser)
      this.messages=res
      setTimeout(() => {
        this.scrollToBottom()
      });
    })
    
    
  }

  // getStatusClass(status: string): string {
  //   switch (status) {
  //     case 'online':
  //       return 'online';
  //     case 'offline':
  //       return 'offline';
  //     case 'away':
  //       return 'away';
  //     case 'busy':
  //       return 'busy';
  //     default:
  //       return ''; // or any other default class
  //   }
  // }
  sendMessage(chat:string){
    if(this.messageText.trim()!==''){
      this.service.sendMessage(chat,this.messageText).subscribe((res)=>{
        // alert(JSON.stringify(res))
        this.messages.push(res)
        this.messageText=''
        setTimeout(() => {
          this.scrollToBottom();
        });
      })
      
    }
  }
  private scrollToBottom(): void {
    try {
      // Use nativeElement to access the DOM element
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }


}
