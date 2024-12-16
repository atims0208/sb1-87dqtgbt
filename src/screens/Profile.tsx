import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { EditProfileForm } from '../components/profile/EditProfileForm';
import { getProfile } from '../services/profileService';
import { Profile as ProfileType } from '../types/profile';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userId = auth().currentUser?.uid;
      if (userId) {
        const profileData = await getProfile(userId);
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader profile={profile} />
      {isEditing ? (
        <EditProfileForm
          userId={profile.id}
          initialData={{
            username: profile.username,
            bio: profile.bio,
          }}
          onSave={() => {
            setIsEditing(false);
            loadProfile();
          }}
        />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;