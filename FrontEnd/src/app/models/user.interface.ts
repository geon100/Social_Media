// export interface User {
//   fullName: string;
//   userName: string;
//   email: string;
//   dob: Date;  
//   profilePicture: string;
//   coverPicture: string;
  
// }

export interface User {
  _id: string;
  fullName: string;
  userName: string;
  dob: Date | string; // Use Date type for date values
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


