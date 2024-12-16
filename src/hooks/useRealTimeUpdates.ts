import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Post } from '../types/post';
import { Notification } from '../types/notification';

export const usePostUpdates = (postId: string) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('posts')
      .doc(postId)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setPost({ id: doc.id, ...doc.data() } as Post);
          }
        },
        (error) => {
          console.error('Error listening to post updates:', error);
        }
      );

    return () => unsubscribe();
  }, [postId]);

  return post;
};

export const useNotificationUpdates = (userId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('notifications')
      .where('recipientId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .onSnapshot(
        (snapshot) => {
          const updatedNotifications = snapshot.docs.map(
            doc => ({ id: doc.id, ...doc.data() } as Notification)
          );
          setNotifications(updatedNotifications);
        },
        (error) => {
          console.error('Error listening to notification updates:', error);
        }
      );

    return () => unsubscribe();
  }, [userId]);

  return notifications;
};