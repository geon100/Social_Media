export interface UserCred{
  email:string,
  password:string
}

export interface RegisterUser {
  fullName: string;
  userName: string;
  password: string;
  email: string;
  dob: Date;  
  otp:string
}

export interface newPasswordObj{
  email:string,
  otp:string,
  newPassword:string
}
