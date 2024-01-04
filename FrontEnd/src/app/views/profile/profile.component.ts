import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';
import { PostviewComponent } from '../postview/postview.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Subscription, catchError, finalize, throwError } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { EditprofileComponent } from 'src/app/components/editprofile/editprofile.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy{
  user!:any
  activeTab: string = 'posts';
  posts:any =[]
  isCurrentUser!:boolean
  isFollowingUser!:boolean
  loading = false;

  private userServiceSubscription: Subscription | undefined;
  
 constructor(private route: ActivatedRoute,
  private dialog: MatDialog,
  private service:UserService,
  private chat:ChatService,
  private snackBar:SnackbarService,
  private router:Router){}

 ngOnInit(): void {
  this.route.params.subscribe(params => {
    const username = params['id'];

    this.userServiceSubscription=this.service.getUserByUsername(username).subscribe((res: any) => {
        this.user = res.user;
        this.posts=res.posts
        this.service.getMe().subscribe((LogUser)=>{
          this.isCurrentUser=res.user._id===LogUser._id
          this.isFollowingUser=(LogUser.following as string[]).includes(this.user._id)
        })
      }); 
  });
 }

 editProfile(){
    const dialogRef =this.dialog.open(EditprofileComponent, {
      width: '400px', 
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.user=result
      }
    });
 }

 openProfileChange(profilePic:any){
  if(this.isCurrentUser) profilePic.click()
 }

 openCoverChange(coverPic:any){
  if(this.isCurrentUser) coverPic.click()
 }

 changeProfile(event:any){
  if (event?.target?.files.length) {
    const file: File = event?.target?.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; 

    if (allowedTypes.includes(file.type)) {
      const form=new FormData
      form.set('image',file)
      this.loading = true; 
      // this.snackBar.showSuccess('Valid image file selected')
      this.service.changeProfile(form).pipe(catchError((error) => {
        this.snackBar.showError(`Profile Photo change Failed....Error:${error?.error?.message || 'Unknown error'}`);
        
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })).subscribe((res:any)=>{
        if(res){
          this.user.profilePicture=res.profilePicture
          this.snackBar.showSuccess('Profile Photo Changed Successfully');
        }
        
      })
    } else {
      this.snackBar.showError('Invalid file type. Please select an image file.')
      console.log('Invalid file type. Please select an image file.');
    }
  }else{
    this.snackBar.showError('Error in file Upload')

  }
 }
 changeCover(event:any){
    if (event?.target?.files.length) {
      const file: File = event?.target?.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; 

      if (allowedTypes.includes(file.type)) {
        const form=new FormData
        form.set('image',file)
        this.loading = true; 
        this.service.changeCover(form).pipe(catchError((error) => {
          this.snackBar.showError(`Cover Photo change Failed....Error:${error?.error?.message || 'Unknown error'}`);
          
          return throwError(() => error);
        }),
        finalize(() => {
          this.loading = false;
        })).subscribe((res:any)=>{
          if(res){
            this.user.coverPicture=res.coverPicture
            this.snackBar.showSuccess('Cover Photo Changed Successfully');
          }
          
        })
      } else {
        this.snackBar.showError('Invalid file type. Please select an image file.')
        console.log('Invalid file type. Please select an image file.');
      }
    }else{
      this.snackBar.showError('Error in file Upload')

    }
 }
 openPost(post:any){
  this.dialog.open(PostviewComponent, {
    width: '49%',
    data: { post: post ,comment:false},
  });
 }

setActiveTab(tab: string): void {
  this.activeTab = tab;
}


followUser(userId:string|undefined){
  this.service.followUser(userId).subscribe((res:any)=>{
    this.isFollowingUser=res.status
  })
}
unfollowUser(userId:string|User): void {
  if(typeof userId==='string'){
    this.service.unfollowUser(userId).subscribe((res:any)=>{
      this.isFollowingUser=!res.status
    })
  }
}

ngOnDestroy(): void {
  this.userServiceSubscription?.unsubscribe();
}

Message(userId:string){
  this.chat.chatOpen(userId).subscribe(()=>{
    this.router.navigate(['chat'])
  })
}

}
