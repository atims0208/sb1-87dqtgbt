import { Profile } from './profile';

export interface User extends Profile {
  settings: UserSettings;
  notifications: NotificationSettings;
}

export interface UserSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  privateProfile: boolean;
}

export interface NotificationSettings {
  newFollower: boolean;
  mentions: boolean;
  comments: boolean;
  likes: boolean;
}

export interface FollowRelation {
  followerId: string;
  followingId: string;
  createdAt: Date;
}