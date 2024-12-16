import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../../types/post';
import { formatRelativeTime } from '../../utils/dateUtils';

interface FeedItemProps {
  post: Post;
  currentUserId: string;
  onCommentPress: () => void;
}

export const FeedItem: React.FC<FeedItemProps> = ({
  post,
  currentUserId,
  onCommentPress,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: post.content,
        url: post.mediaUrl,
      });
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={styles.username}>{post.userId}</Text>
          <Text style={styles.timestamp}>{formatRelativeTime(post.createdAt)}</Text>
        </View>
      </View>

      {post.mediaUrl && (
        <Image source={{ uri: post.mediaUrl }} style={styles.media} />
      )}

      <Text style={styles.content}>{post.content}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={isLiked ? '#FF3B30' : '#666'}
          />
          <Text style={styles.actionText}>{likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onCommentPress}>
          <Ionicons name="chatbubble-outline" size={24} color="#666" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  media: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
    fontSize: 15,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
});