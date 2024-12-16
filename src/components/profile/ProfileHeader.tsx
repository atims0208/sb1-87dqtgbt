import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Profile } from '../../types/profile';

interface ProfileHeaderProps {
  profile: Profile;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <View style={styles.container}>
      <Image
        source={profile.profilePicture ? { uri: profile.profilePicture } : require('../../assets/default-avatar.png')}
        style={styles.profilePicture}
      />
      <Text style={styles.username}>{profile.username}</Text>
      <Text style={styles.bio}>{profile.bio || 'No bio yet'}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profile.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profile.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
});