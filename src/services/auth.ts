import auth from '@react-native-firebase/auth';
import { validateEmail, validatePassword, validateUsername } from '../utils/validation';
import { handleError, AppError } from '../utils/errorHandling';
import { createProfile } from './profileService';

export const signUp = async (
  email: string,
  password: string,
  username: string
): Promise<void> => {
  try {
    if (!validateEmail(email)) {
      throw new AppError('Invalid email address');
    }
    if (!validatePassword(password)) {
      throw new AppError('Password must be at least 6 characters');
    }
    if (!validateUsername(username)) {
      throw new AppError('Username must be between 3 and 30 characters');
    }

    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    await createProfile(userCredential.user.uid, { username, email });
  } catch (error) {
    throw handleError(error);
  }
};

export const signIn = async (email: string, password: string): Promise<void> => {
  try {
    if (!validateEmail(email)) {
      throw new AppError('Invalid email address');
    }
    if (!validatePassword(password)) {
      throw new AppError('Invalid password');
    }

    await auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    throw handleError(error);
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await auth().signOut();
  } catch (error) {
    throw handleError(error);
  }
};