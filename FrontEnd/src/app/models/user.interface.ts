// export interface User {
//   fullName: string;
//   userName: string;
//   email: string;
//   dob: Date;  
//   profilePicture: string;
//   coverPicture: string;
  
// }

export interface User {
  _id:string,
  fullName: string;
  userName: string;
  dob: Date;
  email: string;
  bio: string;
  profilePicture: string;
  coverPicture: string;
  followers: string[]; 
  following: string[]; 
  posts: string[]; 
  createdAt: Date;
  updatedAt: Date;
}

