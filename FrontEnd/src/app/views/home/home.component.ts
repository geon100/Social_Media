import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { loadUserData } from 'src/app/state/UserState/user.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: any = [];
  users: any = [];
  suggestions: any[] = [];
  private page:number=1
  private postServiceSubscription: Subscription | undefined;
  private userServiceSubscription: Subscription | undefined;
  
  constructor(private store: Store, private postService: PostService, private userService: UserService) {}

  ngOnInit(): void {
    this.store.dispatch(loadUserData());
    
  this.loadposts()
    this.userServiceSubscription = this.userService.getSuggestions().subscribe((res:any) => {
      this.users = res;
      this.loadUser();
    });
  }
  private loadposts(){
    this.postServiceSubscription = this.postService.loadHomeposts(this.page).subscribe((res:any) => {
      this.posts=this.posts.concat(res);
      
    });
    }
  
  onScroll() {
    
      this.page++;
      this.loadposts();
    
  }
  
  private loadUser(userId?: string | undefined) {
    if (userId) {
      this.users = this.users.filter((val: any) => val._id !== userId);
      this.suggestions = this.users.slice(0, 5);
    } else {
      this.suggestions = this.users.slice(0, 5);
    }
  }

  followUser(userId: string) {
    this.userService.followUser(userId).subscribe((res: any) => {
      if (res.status) {
        this.postServiceSubscription?.unsubscribe();
        this.userServiceSubscription?.unsubscribe();
        this.page=1
        this.postServiceSubscription = this.postService.loadHomeposts(this.page).subscribe((res:any) => {
          this.posts = res;
        });

        this.loadUser(userId);
        this.store.dispatch(loadUserData());
      }
    });
  }

  ngOnDestroy(): void {
    this.postServiceSubscription?.unsubscribe();
    this.userServiceSubscription?.unsubscribe();
  }
}
