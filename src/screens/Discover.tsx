import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { StreamPreview } from '../components/stream/StreamPreview';
import { getLiveStreams } from '../services/streamService';
import { Stream } from '../types/stream';
import { LoadingIndicator } from '../components/common/LoadingIndicator';

const Discover = ({ navigation }) => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadStreams = async () => {
    try {
      const liveStreams = await getLiveStreams();
      setStreams(liveStreams);
    } catch (error) {
      console.error('Error loading streams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadStreams();
    setRefreshing(false);
  };

  const handleStreamPress = (stream: Stream) => {
    navigation.navigate('LiveStream', { streamId: stream.id });
  };

  useEffect(() => {
    loadStreams();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={streams}
        renderItem={({ item }) => (
          <StreamPreview
            stream={item}
            onPress={() => handleStreamPress(item)}
          />
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
});

export default Discover;