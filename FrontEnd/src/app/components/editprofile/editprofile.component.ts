import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  editProfileForm!: FormGroup;
  originalUserData: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditprofileComponent>,
    private userService: UserService,private snackBar:SnackbarService,
    @Inject(MAT_DIALOG_DATA) public userData: any
  ) {}

  ngOnInit(): void {
    
    this.originalUserData = {
      fullName: this.userData.fullName,
      userName: this.userData.userName,
      dob: this.userData.dob,
      bio: this.userData.bio,
    }
// alert(JSON.stringify(this.userData))
    this.editProfileForm = this.formBuilder.group({
      fullName: [this.userData.fullName, Validators.required],
      userName: [this.userData.userName, Validators.required],
      dob: [this.userData.dob, Validators.required],
      email: [{ value: this.userData.email, disabled: true }],
      bio: [this.userData.bio]
    });
  }
  

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      
      const hasChanges = !this.areObjectsEqual(this.originalUserData, this.editProfileForm.value);

      if (hasChanges) {
        this.userService.updateProfile(this.editProfileForm.value).pipe(catchError((error:any)=>{
          this.snackBar.showError(`Error Occured =>Error:${error?.error?.message || 'Unknown error'}`)
          this.oncancel()
          return throwError(() => error);
        })).subscribe((res)=>{
        this.snackBar.showSuccess('Data Updated')
          this.dialogRef.close(res)
        })
        
      } else {
        this.snackBar.showSuccess('No Updates')
        this.oncancel();
      }
    }
  }

  // Utility function to compare objects
  private areObjectsEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  oncancel(){
    this.dialogRef.close()
  }
}
