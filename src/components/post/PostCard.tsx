import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Share } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Post } from '../../types/post';
import { likePost } from '../../services/postService';
import { formatRelativeTime } from '../../utils/dateUtils';

interface PostCardProps {
  post: Post;
  currentUserId: string;
  onCommentPress: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUserId,
  onCommentPress,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = async () => {
    try {
      await likePost(currentUserId, post.id);
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
    } catch (error) {
      console.error('Error liking post:', error);
    }
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
      {post.mediaUrl && (
        <Image source={{ uri: post.mediaUrl }} style={styles.media} />
      )}
      <Text style={styles.content}>{post.content}</Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.action} onPress={handleLike}>
          <Icon 
            name={isLiked ? 'heart' : 'heart-outline'} 
            size={24} 
            color={isLiked ? '#FF3B30' : '#666'} 
          />
          <Text style={styles.actionText}>{likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={onCommentPress}>
          <Icon name="chatbubble-outline" size={24} color="#666" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={handleShare}>
          <Icon name="share-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>
      <Text style={styles.timestamp}>
        {formatRelativeTime(post.createdAt)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 4,
    color: '#666',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
});