// sharelist.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatRoom } from 'src/app/models/all.interface';
import { ChatService } from 'src/app/services/chat.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-sharelist',
  templateUrl: './sharelist.component.html',
  styleUrls: ['./sharelist.component.css']
})
export class SharelistComponent implements OnInit {
  chats: ChatRoom[] = [];
  selectedUsers: string[] = []; // Array to store selected user IDs

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: SnackbarService,
    private chatservice: ChatService,
    private socketService: SocketService,
    private dialogRef: MatDialogRef<SharelistComponent>
  ) {}

  ngOnInit(): void {
    this.chatservice.loadChat().subscribe((res: ChatRoom[]) => {
      this.chats = res;
    });
  }

  toggleUserSelection(chat: ChatRoom) {
    const chatId = chat._id;
    const index = this.selectedUsers.indexOf(chatId);

    if (index === -1) {
      this.selectedUsers.push(chatId);
    } else {
      this.selectedUsers.splice(index, 1);
    }
  }

  isSelected(chat: ChatRoom): boolean {
    return this.selectedUsers.includes(chat._id);
  }

  selectUser() {
    console.log(this.data, this.selectedUsers);

    this.chatservice.sendPost(this.data, this.selectedUsers).subscribe(() => {
      
      this.snackBar.showSuccess('Post Sent Successfully');
      this.closeModal();
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
