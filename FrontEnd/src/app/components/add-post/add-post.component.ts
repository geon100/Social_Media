import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  addPostForm!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialogRef: MatDialogRef<AddPostComponent>,
    private service: PostService,
    private snackBar: SnackbarService
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

      this.service.addpost(formData).pipe(
        catchError((error) => {
          console.error('Add Post Failed', error?.error?.message);
          this.snackBar.showError(`Add Post Failed....Error:${error?.error?.message || 'Unknown error'}`);
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
