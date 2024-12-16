import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import { createPost } from '../services/postService';
import auth from '@react-native-firebase/auth';

const CreatePost = ({ navigation }) => {
  const [content, setContent] = useState('');
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.assets && result.assets[0].uri) {
        setMediaUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content');
      return;
    }

    try {
      setLoading(true);
      const userId = auth().currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');

      await createPost(userId, content, mediaUri || undefined);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
        editable={!loading}
      />

      {mediaUri && (
        <View style={styles.mediaPreview}>
          <Image source={{ uri: mediaUri }} style={styles.mediaImage} />
          <TouchableOpacity
            style={styles.removeMedia}
            onPress={() => setMediaUri(null)}
          >
            <Icon name="close-circle" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.mediaButton}
          onPress={handleImagePick}
          disabled={loading}
        >
          <Icon name="image-outline" size={24} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Icon name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  input: {
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  mediaPreview: {
    position: 'relative',
    marginBottom: 16,
  },
  mediaImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeMedia: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  mediaButton: {
    padding: 8,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 24,
  },
  disabledButton: {
    opacity: 0.5,
  },
});