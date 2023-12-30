import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostService } from 'src/app/services/post.service';
import { loadUserData } from 'src/app/state/UserState/user.actions';
import { Subscription } from 'rxjs';
import { getUser } from 'src/app/state/UserState/user.selector';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnDestroy {
  posts: any=[]
  postsSubscription: Subscription | undefined;

  constructor(private store: Store, private service: PostService) {}

  ngOnInit(): void {
    this.store.select(getUser).subscribe(val=>{
      if (!val) {
        alert('call')
        this.store.dispatch(loadUserData())
        this.store.select(getUser).subscribe(val=>{
  
        })
      }
    })
    this.postsSubscription = this.service.loadposts().subscribe((res) => {
      this.posts = res;
    });
  }

  ngOnDestroy(): void {
   
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }

  
}
