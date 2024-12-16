export type NotificationType = 'follow' | 'like' | 'comment' | 'mention';

export interface Notification {
  id: string;
  recipientId: string;
  senderId: string;
  type: NotificationType;
  referenceId?: string; // postId or commentId
  read: boolean;
  createdAt: Date;
}