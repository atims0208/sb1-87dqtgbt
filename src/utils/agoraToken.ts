import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import Constants from 'expo-constants';

const APP_ID = Constants.expoConfig?.extra?.agoraAppId;
const APP_CERTIFICATE = Constants.expoConfig?.extra?.agoraCertificate;

export const generateStreamToken = async (
  channelName: string,
  uid: string,
  role: 'host' | 'audience' = 'host'
): Promise<string> => {
  if (!APP_ID || !APP_CERTIFICATE) {
    throw new Error('Agora credentials not configured');
  }

  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role === 'host' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER,
    privilegeExpiredTs
  );

  return token;
};