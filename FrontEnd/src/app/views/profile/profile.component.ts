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
import { ReportModalComponent } from 'src/app/components/report-modal/report-modal.component';
import { Post, UserData } from 'src/app/models/all.interface';


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

    this.userServiceSubscription=this.service.getUserByUsername(username).subscribe((res: {user:UserData,posts:Post[]}) => {
        this.user = res.user;
        this.posts=res.posts
        this.service.getMe().subscribe((LogUser)=>{
          this.isCurrentUser=res.user._id===LogUser._id
          this.isFollowingUser=(LogUser.following as string[]).includes(this.user._id)
        })
      }); 
  });
 }
 reportUser(id:string){

  const dialogRef = this.dialog.open(ReportModalComponent, {
    width: '500px', 
  });

  dialogRef.afterClosed().subscribe((result:string) => {
    if(result){
      const report={
        userId:id,
        reportText:result,
        type:'user'
      }
      this.service.reportUser(report).subscribe(()=>{
        this.snackBar.showSuccess('User Reported')
      })
    }
  });

 }
 editProfile(){
    const dialogRef =this.dialog.open(EditprofileComponent, {
      width: '400px', 
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result:UserData) => {
      if (result) {
        this.user=result
      }
    });
  
 }
share(id:string){
  const profileUrl = encodeURIComponent(window.location.href);
  const text = `Check out my profile:*${profileUrl}/${id}*`;
    return `https://api.whatsapp.com/send?text=${text}`;
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
 openPost(post:Post){
  this.dialog.open(PostviewComponent, {
    width: '49%',
    data: { post: post ,comment:false},
  });
 }

setActiveTab(tab: string): void {
  this.activeTab = tab;
}


followUser(userId:string|undefined){
  this.service.followUser(userId).subscribe((res:{status:boolean})=>{
    this.isFollowingUser=res.status
  })
}
unfollowUser(userId:string|User): void {
  if(typeof userId==='string'){
    this.service.unfollowUser(userId).subscribe((res:{status:boolean})=>{
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
