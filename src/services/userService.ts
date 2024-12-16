import firestore from '@react-native-firebase/firestore';
import { User, FollowRelation } from '../types/user';

export const followUser = async (followerId: string, followingId: string): Promise<void> => {
  const batch = firestore().batch();
  
  // Create follow relation
  const followRef = firestore().collection('follows').doc(`${followerId}_${followingId}`);
  batch.set(followRef, {
    followerId,
    followingId,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  // Update follower counts
  const followerRef = firestore().collection('users').doc(followerId);
  const followingRef = firestore().collection('users').doc(followingId);
  
  batch.update(followerRef, {
    following: firestore.FieldValue.increment(1),
  });
  
  batch.update(followingRef, {
    followers: firestore.FieldValue.increment(1),
  });

  await batch.commit();
};

export const unfollowUser = async (followerId: string, followingId: string): Promise<void> => {
  const batch = firestore().batch();
  
  // Remove follow relation
  const followRef = firestore().collection('follows').doc(`${followerId}_${followingId}`);
  batch.delete(followRef);

  // Update follower counts
  const followerRef = firestore().collection('users').doc(followerId);
  const followingRef = firestore().collection('users').doc(followingId);
  
  batch.update(followerRef, {
    following: firestore.FieldValue.increment(-1),
  });
  
  batch.update(followingRef, {
    followers: firestore.FieldValue.increment(-1),
  });

  await batch.commit();
};

export const getFollowers = async (userId: string): Promise<User[]> => {
  const snapshot = await firestore()
    .collection('follows')
    .where('followingId', '==', userId)
    .get();

  const followerIds = snapshot.docs.map(doc => doc.data().followerId);
  
  const followers = await Promise.all(
    followerIds.map(id => 
      firestore()
        .collection('users')
        .doc(id)
        .get()
        .then(doc => ({ id: doc.id, ...doc.data() } as User))
    )
  );

  return followers;
};

export const getFollowing = async (userId: string): Promise<User[]> => {
  const snapshot = await firestore()
    .collection('follows')
    .where('followerId', '==', userId)
    .get();

  const followingIds = snapshot.docs.map(doc => doc.data().followingId);
  
  const following = await Promise.all(
    followingIds.map(id => 
      firestore()
        .collection('users')
        .doc(id)
        .get()
        .then(doc => ({ id: doc.id, ...doc.data() } as User))
    )
  );

  return following;
};