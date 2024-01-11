import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription, catchError, finalize, throwError } from 'rxjs';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';
import { PostComponent } from 'src/app/components/post/post.component';
import { User } from 'src/app/models/user.interface';
import { ChatService } from 'src/app/services/chat.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SocketService } from 'src/app/services/socket.service';
import { loadUserData } from 'src/app/state/UserState/user.actions';
import { getUser } from 'src/app/state/UserState/user.selector';
import { PostviewComponent } from '../postview/postview.component';
import { PostService } from 'src/app/services/post.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements AfterViewInit,OnDestroy{
  chats: any[] = [];
  messages:any=[]
  messageText:string=''
  selectedUser:any
  currentUser!:User
  pickerAppear:boolean=false
  read:boolean=false
  private subscriptions: Subscription[] = [];
  loading:boolean=false
  @ViewChild('chatBox') chatBox!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(private service:ChatService,
    private store:Store,private snackBar:SnackbarService,
    private socketService: SocketService,private postService:PostService,
    private dialog: MatDialog,private route:Router) { }

    startVideoCall(){
      this.route.navigate(['/videocall',this.selectedUser._id ]);
    }
  ngAfterViewInit(): void {
    this.scrollToBottom()
  }

  ngOnInit(): void {

    this.subscriptions.push(
      this.service.loadChat().subscribe((res:any)=>{
        this.chats=res
      })
    )
    
    this.subscriptions.push(
      this.store.select(getUser).subscribe(val=>{
        if (val) this.currentUser=val
        else{
          this.store.dispatch(loadUserData())
          this.store.select(getUser).subscribe(val=>{
            if (val) this.currentUser=val
          })
        }
      })
    )

    // this.subscriptions.push(this.socketService.onConnect().subscribe(() => {
      
    // }))
    
  
    // this.subscriptions.push(this.socketService.onDisconnect().subscribe(() => {
    //   this.currentUser.isOnline=false
    //   // Add logic for user offline status if needed
    // }))

    this.subscriptions.push(
      this.socketService.onMessage().subscribe((res: any) => {
        console.log(res.content.message)
        if (res.content.chatId === this.selectedUser._id && this.currentUser._id!==res.content.message.sender._id) {
          this.messages.push(res.content.message);
          
          setTimeout(()=>{
            this.scrollToBottom();
          })
          this.markMessagesAsRead([res.content.message._id]);
        }
      })
    )
  }
  
  openFileInput(){
    this.fileInput?.nativeElement?.click()
  }
  selectUser(chat:any): void {
    this.selectedUser = chat;
    this.subscriptions.push(
      this.service.loadmessages(this.selectedUser._id).subscribe((res:any)=>{
        this.messages=res
        const messageIds = this.messages.filter((message:any)=>!message.read&&message.sender._id!==this.currentUser._id).map((message: any) => message._id);
        if(messageIds.length!==0)
        this.markMessagesAsRead(messageIds);
        setTimeout(() => {
          this.scrollToBottom()
        });
      })
    )
  }
  markMessagesAsRead(messageIds: string[]): void {
    // alert(1)
    this.service.readMessage(messageIds).subscribe()
  }
  openImageModal(imageUrl: string): void {
    this.dialog.open(ImageModalComponent, {
      data: imageUrl ,
      maxWidth: '100vw', 
      maxHeight: '100vh'
    });

  }
  handleFileInput(event:any,chat:string){
    const file = event?.target?.files[0]
    if(file){
    const form=new FormData()
    form.set('image',file)
    form.set('chatId',chat)
    this.loading = true; 
    this.service.sendImage(form).pipe(catchError((error) => {
      this.snackBar.showError(`Image Sending Failed....Error:${error?.error?.message || 'Unknown error'}`);
      
      return throwError(() => error);
    }),
    finalize(() => {
      this.loading = false;
    })).subscribe(res=>{
      this.socketService.sendMessage(res, chat);
      this.snackBar.showSuccess('Image Sent')
      this.messages.push(res)
          this.messageText=''
          setTimeout(() => {
            this.scrollToBottom();
          });
    })
    }
  }
  sendMessage(chat:string){
    if(this.messageText.trim()!==''){
      this.subscriptions.push(
        this.service.sendMessage(chat,this.messageText.trim()).subscribe((res:any)=>{
          this.socketService.sendMessage(res, chat);
          this.messages.push(res)
          this.messageText=''
          
          setTimeout(() => {
            this.scrollToBottom();
          });
        })
      )
      
    }
  }

  addEmoji(event:any){
    this.messageText=event.emoji.native
  }
  picker(){
    this.pickerAppear=!this.pickerAppear
  }

  ViewPost(post:string){
    
    this.postService.getPost(post).pipe(catchError((error) => {
      this.snackBar.showError(`Cannot View Post....Error:${error?.error?.message || 'Unknown error'}`);
      return throwError(() => error);
    })).subscribe(res=>{
      this.dialog.open(PostviewComponent, {
        width: '49%',
        data: { post: res ,comment:false},
      });
    })
    

  }
  private scrollToBottom(): void {
    try {
      if(this.chatBox)
      this.chatBox.nativeElement.scrollTop = this.chatBox?.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
  ngOnDestroy(): void {
    
    this.subscriptions.forEach(sub=>sub.unsubscribe())

  }

}
