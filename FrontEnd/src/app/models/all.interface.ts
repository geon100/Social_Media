export interface UserData {
  _id: string;
  fullName: string;
  userName: string;
  password: string;
  dob: string;
  email: string;
  bio: string;
  profilePicture: string;
  coverPicture: string;
  followers: string[];
  following: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isOnline: boolean;
  saved: string[];
  reportCount: number;
}

export interface CommentData {
  _id: string;
  user?: UserData;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Post {
  _id: string;
  user: UserData;
  collab: boolean;
  caption: string;
  image: string;
  comments: CommentData[];
  likes: string[];
  isActive: boolean;
  tags: string[];
  reportCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  collaborator?: UserData; 
}

export interface EditFormData{
  fullName:string,
  userName: string,
  dob: string,
  bio: string
}
export interface ChangeEvent extends Event {
  isTrusted: boolean;
  bubbles: boolean;
  cancelBubble: boolean;
  cancelable: boolean;
  composed: boolean;
  currentTarget: EventTarget | null;
  defaultPrevented: boolean;
  eventPhase: number;
  returnValue: boolean;
  srcElement: EventTarget | null;
  target: EventTarget;
  timeStamp: number;
  type: 'change';
}

export interface ChatRoom {
  _id: string;
  users: ChatRoomUser[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ChatRoomUser {
  _id: string;
  userName: string;
  profilePicture: string;
  isOnline: boolean;
}

export interface ChatMessage {
  _id: string;
  sender: {
    _id: string;
    userName: string;
    profilePicture: string;
  };
  chatId: string;
  text?: string;
  image?: string;
  audio?:string
  createdAt: string;
  updatedAt: string;
  __v: number;
  read: boolean;
  postId?: string;
}


export interface NotificationData {
  _id: string;
  sender: {
    _id: string;
    userName: string;
    profilePicture: string;
    
  };
  receiver: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

