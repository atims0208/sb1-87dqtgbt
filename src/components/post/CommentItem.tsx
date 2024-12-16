import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Comment } from '../../types/post';
import { formatRelativeTime } from '../../utils/dateUtils';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.username}>{comment.userId}</Text>
      <Text style={styles.content}>{comment.content}</Text>
      <Text style={styles.timestamp}>
        {formatRelativeTime(comment.createdAt)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  content: {
    fontSize: 15,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
});