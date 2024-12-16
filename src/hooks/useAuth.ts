import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { User } from '../types/user';
import { getProfile } from '../services/profileService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userProfile = await getProfile(firebaseUser.uid);
          setUser(userProfile);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  return { user, loading };
};