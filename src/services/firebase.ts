import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { 
  doc, 
  setDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, firestore } from '../config/firebase';

export const signUp = async (email: string, password: string, username: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (userCredential.user) {
      await setDoc(doc(firestore, 'users', userCredential.user.uid), {
        username,
        email,
        followers: 0,
        following: 0,
        createdAt: serverTimestamp(),
      });
    }
    
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOut = () => firebaseSignOut(auth);