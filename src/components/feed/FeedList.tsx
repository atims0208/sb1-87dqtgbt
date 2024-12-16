import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Post } from '../../types/post';
import { FeedItem } from './FeedItem';
import { LoadingIndicator } from '../common/LoadingIndicator';

interface FeedListProps {
  posts: Post[];
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached?: () => void;
  loading?: boolean;
  currentUserId: string;
  onCommentPress: (postId: string) => void;
}

export const FeedList: React.FC<FeedListProps> = ({
  posts,
  refreshing,
  onRefresh,
  onEndReached,
  loading,
  currentUserId,
  onCommentPress,
}) => {
  const renderFooter = () => {
    if (!loading) return null;
    return <LoadingIndicator />;
  };

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <FeedItem
          post={item}
          currentUserId={currentUserId}
          onCommentPress={() => onCommentPress(item.id)}
        />
      )}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
});