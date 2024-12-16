import firestore from '@react-native-firebase/firestore';
import { StreamStatus, Stream, StreamToken } from '../types/stream';
import { generateStreamToken } from '../utils/agoraToken';

export const createLiveStream = async (userId: string): Promise<Stream> => {
  try {
    const channelName = `stream_${userId}_${Date.now()}`;
    const token = await generateStreamToken(channelName, userId);

    const streamData = {
      userId,
      channelName,
      token,
      status: StreamStatus.LIVE,
      viewers: 0,
      startedAt: firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await firestore().collection('streams').add(streamData);
    
    return {
      id: docRef.id,
      ...streamData,
      startedAt: new Date(),
    };
  } catch (error) {
    console.error('Error creating live stream:', error);
    throw error;
  }
};

export const endLiveStream = async (streamId: string): Promise<void> => {
  try {
    await firestore().collection('streams').doc(streamId).update({
      status: StreamStatus.ENDED,
      endedAt: firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('Error ending live stream:', error);
    throw error;
  }
};

export const joinStream = async (streamId: string, userId: string): Promise<StreamToken> => {
  try {
    const streamDoc = await firestore().collection('streams').doc(streamId).get();
    const stream = streamDoc.data() as Stream;

    if (!stream || stream.status !== StreamStatus.LIVE) {
      throw new Error('Stream is not available');
    }

    // Update viewer count
    await streamDoc.ref.update({
      viewers: firestore.FieldValue.increment(1),
    });

    const token = await generateStreamToken(stream.channelName, userId, 'audience');
    
    return {
      token,
      channelName: stream.channelName,
      uid: userId,
      role: 'audience',
      privilegeExpiredTs: Math.floor(Date.now() / 1000) + 3600,
    };
  } catch (error) {
    console.error('Error joining stream:', error);
    throw error;
  }
};

export const leaveStream = async (streamId: string): Promise<void> => {
  try {
    await firestore().collection('streams').doc(streamId).update({
      viewers: firestore.FieldValue.increment(-1),
    });
  } catch (error) {
    console.error('Error leaving stream:', error);
    throw error;
  }
};

export const getLiveStreams = async (): Promise<Stream[]> => {
  try {
    const snapshot = await firestore()
      .collection('streams')
      .where('status', '==', StreamStatus.LIVE)
      .orderBy('startedAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Stream[];
  } catch (error) {
    console.error('Error getting live streams:', error);
    throw error;
  }
};

export const subscribeToStream = (
  streamId: string,
  onUpdate: (stream: Stream) => void
): () => void => {
  return firestore()
    .collection('streams')
    .doc(streamId)
    .onSnapshot(
      (doc) => {
        if (doc.exists) {
          onUpdate({ id: doc.id, ...doc.data() } as Stream);
        }
      },
      (error) => {
        console.error('Error subscribing to stream:', error);
      }
    );
};