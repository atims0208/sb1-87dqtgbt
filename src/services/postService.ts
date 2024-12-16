import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Post, Comment } from '../types/post';
import { createNotification } from './notificationService';

export const getPosts = async (): Promise<Post[]> => {
  try {
    const snapshot = await firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Post[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const createPost = async (userId: string, content: string, mediaUri?: string): Promise<string> => {
  try {
    let mediaUrl;
    
    if (mediaUri) {
      const reference = storage().ref(`posts/${userId}_${Date.now()}`);
      await reference.putFile(mediaUri);
      mediaUrl = await reference.getDownloadURL();
    }

    const postRef = await firestore().collection('posts').add({
      userId,
      content,
      mediaUrl,
      likes: 0,
      comments: 0,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });

    return postRef.id;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getComments = async (postId: string): Promise<Comment[]> => {
  try {
    const snapshot = await firestore()
      .collection('comments')
      .where('postId', '==', postId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as Comment[];
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};