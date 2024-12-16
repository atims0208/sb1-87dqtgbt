import AgoraRTC, {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack
} from 'agora-rtc-sdk-ng';
import { StreamToken } from '../types/stream';
import Constants from 'expo-constants';

const APP_ID = Constants.expoConfig?.extra?.agoraAppId;

export class AgoraService {
  private client: IAgoraRTCClient;
  private localAudioTrack: IMicrophoneAudioTrack | null = null;
  private localVideoTrack: ICameraVideoTrack | null = null;
  private remoteUsers: Map<string, {
    audioTrack?: IRemoteAudioTrack;
    videoTrack?: IRemoteVideoTrack;
  }> = new Map();

  constructor() {
    this.client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.client.on('user-published', async (user, mediaType) => {
      await this.client.subscribe(user, mediaType);
      
      if (mediaType === 'audio') {
        const audioTrack = user.audioTrack;
        if (audioTrack) {
          this.remoteUsers.set(user.uid as string, {
            ...this.remoteUsers.get(user.uid as string),
            audioTrack
          });
          audioTrack.play();
        }
      }

      if (mediaType === 'video') {
        const videoTrack = user.videoTrack;
        if (videoTrack) {
          this.remoteUsers.set(user.uid as string, {
            ...this.remoteUsers.get(user.uid as string),
            videoTrack
          });
        }
      }
    });

    this.client.on('user-unpublished', (user, mediaType) => {
      if (mediaType === 'audio') {
        const audioTrack = user.audioTrack;
        if (audioTrack) {
          audioTrack.stop();
          this.remoteUsers.delete(user.uid as string);
        }
      }
      if (mediaType === 'video') {
        const userData = this.remoteUsers.get(user.uid as string);
        if (userData) {
          delete userData.videoTrack;
          if (!userData.audioTrack) {
            this.remoteUsers.delete(user.uid as string);
          }
        }
      }
    });
  }

  async joinChannel(channelName: string, uid: string, token: string, role: 'host' | 'audience'): Promise<void> {
    try {
      await this.client.setClientRole(role);
      await this.client.join(APP_ID, channelName, token, uid);

      if (role === 'host') {
        this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        this.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        await this.client.publish([this.localAudioTrack, this.localVideoTrack]);
      }
    } catch (error) {
      console.error('Error joining channel:', error);
      throw error;
    }
  }

  async leaveChannel(): Promise<void> {
    this.localAudioTrack?.close();
    this.localVideoTrack?.close();
    this.remoteUsers.clear();
    await this.client.leave();
  }

  async toggleAudio(enabled: boolean): Promise<void> {
    if (this.localAudioTrack) {
      await this.localAudioTrack.setEnabled(enabled);
    }
  }

  async toggleVideo(enabled: boolean): Promise<void> {
    if (this.localVideoTrack) {
      await this.localVideoTrack.setEnabled(enabled);
    }
  }

  async switchCamera(): Promise<void> {
    if (this.localVideoTrack) {
      await this.localVideoTrack.setDevice('video');
    }
  }

  getRemoteVideoTrack(uid: string): IRemoteVideoTrack | undefined {
    return this.remoteUsers.get(uid)?.videoTrack;
  }

  getLocalVideoTrack(): ICameraVideoTrack | null {
    return this.localVideoTrack;
  }
}

export const agoraService = new AgoraService();