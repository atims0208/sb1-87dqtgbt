import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Profile, ProfileUpdateData } from '../types/profile';

export const getProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const doc = await firestore().collection('users').doc(userId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } as Profile : null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateProfile = async (userId: string, data: ProfileUpdateData): Promise<void> => {
  try {
    await firestore().collection('users').doc(userId).update(data);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const uploadProfilePicture = async (userId: string, uri: string): Promise<string> => {
  try {
    const reference = storage().ref(`profilePictures/${userId}`);
    await reference.putFile(uri);
    const url = await reference.getDownloadURL();
    await updateProfile(userId, { profilePicture: url });
    return url;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};