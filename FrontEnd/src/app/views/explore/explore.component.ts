import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostService } from 'src/app/services/post.service';
import { loadUserData } from 'src/app/state/UserState/user.actions';
import { Subscription } from 'rxjs';
import { getUser } from 'src/app/state/UserState/user.selector';
import { Post } from 'src/app/models/all.interface';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnDestroy {
  posts: Post[]=[]
  postsSubscription: Subscription | undefined;
  private page:number=1
  constructor(private store: Store, private service: PostService) {}

  ngOnInit(): void {
    this.store.select(getUser).subscribe(val=>{
      if (!val) {
        this.store.dispatch(loadUserData())
      }
    })
    this.loadComponentposts()
    
  }
  private loadComponentposts(){
    this.postsSubscription = this.service.loadposts(this.page).subscribe((res:Post[]) => {
      this.posts=this.posts.concat(res)
    })
  }

  onScroll() {
    
    this.page++;
    this.loadComponentposts();
  
}

  ngOnDestroy(): void {
   
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }

  
}
