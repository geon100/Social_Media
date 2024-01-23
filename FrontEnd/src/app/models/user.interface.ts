export interface User {
  _id: string;
  fullName: string;
  userName: string;
  dob: Date | string; 
  email: string;
  bio: string;
  profilePicture: string;
  coverPicture: string;
  followers?: string[] | User[]; 
  following?: string[] | User[]; 
  posts: string[];
  isActive:boolean;
  isOnline:boolean;
  createdAt: Date | string; 
  updatedAt: Date | string; 
  saved:string[]
}




