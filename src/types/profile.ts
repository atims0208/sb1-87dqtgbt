export interface Profile {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  followers: number;
  following: number;
  createdAt: Date;
}

export interface ProfileStats {
  followers: number;
  following: number;
  totalPosts: number;
}

export interface ProfileUpdateData {
  username?: string;
  bio?: string;
  profilePicture?: string;
}