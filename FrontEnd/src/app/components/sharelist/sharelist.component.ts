import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/chat.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-sharelist',
  templateUrl: './sharelist.component.html',
  styleUrls: ['./sharelist.component.css']
})
export class SharelistComponent implements OnInit{
  chats:any=[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private snackBar:SnackbarService,private chatservice:ChatService,
  private socketService:SocketService,
  private dialogRef: MatDialogRef<SharelistComponent>) {}
  
  
  ngOnInit(): void {
    this.chatservice.loadChat().subscribe((res:any)=>{
      this.chats=res
    })
  }
  selectUser(chat:any){
    console.log(this.data,chat._id)
    this.chatservice.sendPost(this.data,chat._id).subscribe((res)=>{
      this.socketService.sendMessage(res, chat);
      this.snackBar.showSuccess('Post Sent Successfully')
      this.closeModal()
    })
  }

  closeModal(){
    this.dialogRef.close()
  }
}
