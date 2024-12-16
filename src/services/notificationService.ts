import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { Notification, NotificationType } from '../types/notification';

export const createNotification = async (
  recipientId: string,
  senderId: string,
  type: NotificationType,
  referenceId?: string
): Promise<void> => {
  await firestore().collection('notifications').add({
    recipientId,
    senderId,
    type,
    referenceId,
    read: false,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};

export const getNotifications = async (userId: string): Promise<Notification[]> => {
  const snapshot = await firestore()
    .collection('notifications')
    .where('recipientId', '==', userId)
    .orderBy('createdAt', 'desc')
    .limit(50)
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as Notification));
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  await firestore()
    .collection('notifications')
    .doc(notificationId)
    .update({ read: true });
};

export const setupPushNotifications = async (userId: string): Promise<void> => {
  const authStatus = await messaging().requestPermission();
  if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    const token = await messaging().getToken();
    await firestore()
      .collection('users')
      .doc(userId)
      .update({ pushToken: token });
  }
};