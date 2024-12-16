import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FeedList } from '../components/feed/FeedList';
import { CreatePostButton } from '../components/post/CreatePostButton';
import { usePostUpdates } from '../hooks/useRealTimeUpdates';
import { getPosts } from '../services/postService';
import { Post } from '../types/post';
import { useAuth } from '../hooks/useAuth';

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const loadPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const handleLoadMore = async () => {
    // Implement pagination logic here
  };

  const handleCommentPress = (postId: string) => {
    navigation.navigate('Comments', { postId });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <FeedList
        posts={posts}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        loading={loading}
        currentUserId={user.id}
        onCommentPress={handleCommentPress}
      />
      <CreatePostButton onPress={() => navigation.navigate('CreatePost')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default Home;