import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommentItem } from '../components/post/CommentItem';
import { getComments, commentOnPost } from '../services/postService';
import { Comment } from '../types/post';
import auth from '@react-native-firebase/auth';

const Comments = ({ route }) => {
  const { postId } = route.params;
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const loadComments = async () => {
    try {
      const fetchedComments = await getComments(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const userId = auth().currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');

      await commentOnPost(userId, postId, newComment.trim());
      setNewComment('');
      await loadComments();
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentItem comment={item} />}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
          maxLength={1000}
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.sendButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading || !newComment.trim()}
        >
          <Icon name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  sendButton: {
    padding: 8,
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
});