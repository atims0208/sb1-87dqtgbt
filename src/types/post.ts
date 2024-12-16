export interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrl?: string;
  likes: number;
  comments: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface Like {
  userId: string;
  postId: string;
  createdAt: Date;
}