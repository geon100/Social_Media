export interface UserObj {
  fullName: string;
  userName: string;
  password: string;
  email: string;
  dob: Date;  
  otp:string
}


export interface LoginObj{
  email:string,
  password:string
}

export interface newPasswordObj{
  email:string,
  otp:string,
  newPassword:string
}