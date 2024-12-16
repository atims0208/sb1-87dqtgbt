import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { ProfileUpdateData } from '../../types/profile';
import { uploadProfilePicture, updateProfile } from '../../services/profileService';

interface EditProfileFormProps {
  userId: string;
  initialData: {
    username: string;
    bio?: string;
  };
  onSave: () => void;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  userId,
  initialData,
  onSave,
}) => {
  const [username, setUsername] = useState(initialData.username);
  const [bio, setBio] = useState(initialData.bio || '');
  const [loading, setLoading] = useState(false);

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.assets && result.assets[0].uri) {
        setLoading(true);
        await uploadProfilePicture(userId, result.assets[0].uri);
        setLoading(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload image');
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const updateData: ProfileUpdateData = {
        username,
        bio,
      };
      await updateProfile(userId, updateData);
      onSave();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.imageButton}
        onPress={handleImagePick}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Change Profile Picture</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        editable={!loading}
      />

      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={4}
        editable={!loading}
      />

      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Saving...' : 'Save Profile'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});