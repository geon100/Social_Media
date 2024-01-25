import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { EditFormData, UserData } from 'src/app/models/all.interface';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  editProfileForm!: FormGroup;
  originalUserData!: EditFormData;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditprofileComponent>,
    private userService: UserService,private snackBar:SnackbarService,
    @Inject(MAT_DIALOG_DATA) public userData: UserData
  ) {}

  ngOnInit(): void {
    
    this.originalUserData = {
      fullName: this.userData.fullName,
      userName: this.userData.userName,
      dob: this.userData.dob,
      bio: this.userData.bio,
    }

    this.editProfileForm = this.formBuilder.group({
      fullName: [this.userData.fullName, [Validators.required]],
      userName: [this.userData.userName, [Validators.required]],
      dob: [this.userData.dob,[ Validators.required,this.ageValidator(13)]],
      email: [{ value: this.userData.email, disabled: true }],
      bio: [this.userData.bio]
    });
    
  }

  private ageValidator(minAge: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const birthDate = control.value;
      if (!birthDate) {
        return null;
      }

      const today = new Date();
      const age = today.getFullYear() - new Date(birthDate).getFullYear();

      return age >= minAge ? null : { 'minAge': true };
    };
  }
  onSubmit(): void {
    if (this.editProfileForm.valid) {
      if (!this.editProfileForm.value.fullName.trim() || !this.editProfileForm.value.bio.trim() || !this.editProfileForm.value.userName.trim()) {
        this.snackBar.showSuccess('Enter valid Data')
        this.oncancel();
        return
      }
      const hasChanges = !this.areObjectsEqual(this.originalUserData, this.editProfileForm.value);
      
      
      if (hasChanges) {
        this.userService.updateProfile(this.editProfileForm.value).pipe(catchError((error:any)=>{
          this.snackBar.showError(`Error Occured =>Error:${error?.error?.message || 'Unknown error'}`)
          this.oncancel()
          return throwError(() => error);
        })).subscribe((res:UserData)=>{
        this.snackBar.showSuccess('Data Updated')
          this.dialogRef.close(res)
        })
        
      } else {
        this.snackBar.showSuccess('No Updates')
        this.oncancel();
      }
    }else{
      this.snackBar.showError('Invalid Data');
    }
  }

  
  private areObjectsEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  oncancel(){
    this.dialogRef.close()
  }
}
