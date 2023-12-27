import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostService } from 'src/app/services/post.service';
import { getUser } from 'src/app/state/UserState/user.selector';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{
  @Input() post:any;
  deleteShow!:boolean;
  newCommentText: string = '';

  constructor(private service: PostService,private store:Store) {}
  ngOnInit(): void {
    this.store.select(getUser).subscribe(res=>{
      this.deleteShow=res?._id===this.post.user._id
    })
  }

  addComment() {
    if (this.newCommentText.trim() !== '') {
      const obj={
        comment:this.newCommentText.trim(),
        postId:this.post._id
      }
      this.service.addComment(obj).subscribe((addedComment) => {
        this.post.comments.push(addedComment);
        this.newCommentText = '';
      });
    }
  }

  deleteComment(commentId:string){
    this.service.delComment(commentId,this.post._id).subscribe(()=>{
      this.post.comments=this.post.comments.filter((val:any)=>val._id!==commentId)
    })
  }
}
