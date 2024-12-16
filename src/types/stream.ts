export enum StreamStatus {
  LIVE = 'live',
  ENDED = 'ended',
}

export interface Stream {
  id: string;
  userId: string;
  channelName: string;
  status: StreamStatus;
  viewers: number;
  startedAt: Date;
  endedAt?: Date;
}

export interface StreamToken {
  token: string;
  channelName: string;
  uid: string;
  role: 'publisher' | 'audience';
  privilegeExpiredTs: number;
}