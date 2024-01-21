import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsertaglistComponent } from '../usertaglist/usertaglist.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  addPostForm!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;
  loading = false;
  collab:any=null
  tags:any[]=[]
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPostComponent>,
    private service: PostService,
    private snackBar: SnackbarService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.addPostForm = this.fb.group({
      caption: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addPostForm.valid) {
      this.loading = true; 

      const formData = new FormData();
      formData.append('caption', this.addPostForm.get('caption')?.value);
      formData.append('image', this.addPostForm.get('image')?.value);
      if(this.tags.length){
        for (let i = 0; i < this.tags.length; i++) {
          formData.append('taggedUsers[]', this.tags[i]);
        }
      }
      if(this.collab){
        formData.append('collaborator',this.collab._id)
      }

      this.service.addpost(formData).pipe(
        catchError((error) => {
          this.snackBar.showError(`Add Post Failed....Error:${error?.error?.message || 'Unknown error'}`);
          this.close()
          return throwError(() => error);
        }),
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(res => {
        if (res) {
          console.log('Signup successful:', res);
          this.snackBar.showSuccess('Post Added Successfully');
          this.dialogRef.close();
        }
      });

      
    }
  }
  tagUsers(){
    const dialog=this.dialog.open(UsertaglistComponent, {});
    dialog.afterClosed().subscribe(res=>{
      if(res?.length>0){
        this.snackBar.showSuccess(`users Tagged`)
        this.tags=res
        
      }
    })
  }

  addCollab(){
    const dialog=this.dialog.open(UsertaglistComponent, {data:'collab'});
    dialog.afterClosed().subscribe(res=>{
      if(res){
        this.snackBar.showSuccess(`user collab added`)
        this.collab=res
        
      }
    })
  }

  handleFileInput(event: any): void {
    const file = event?.target?.files[0];
    console.log(file);
    this.addPostForm.patchValue({ image: file });
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  close() {
    this.dialogRef.close();
  }
  
}
