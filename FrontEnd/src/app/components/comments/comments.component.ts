import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() post:any;
  newCommentText: string = '';

  constructor(private service: PostService) {}

  addComment() {
    if (this.newCommentText.trim() !== '') {
      const obj={
        comment:this.newCommentText.trim(),
        postId:this.post._id
      }
      this.service.addComment(obj).subscribe((addedComment) => {
        // Update the comments array with the added comment
        this.post.comments.push(addedComment);
        // Clear the input field
        this.newCommentText = '';
      });
    }
  }
}
