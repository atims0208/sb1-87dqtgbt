import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stream } from '../../types/stream';
import { formatRelativeTime } from '../../utils/dateUtils';

interface StreamPreviewProps {
  stream: Stream;
  onPress: () => void;
}

export const StreamPreview: React.FC<StreamPreviewProps> = ({ stream, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x200' }}
          style={styles.thumbnail}
        />
        <View style={styles.liveTag}>
          <Text style={styles.liveText}>LIVE</Text>
        </View>
        <View style={styles.viewersTag}>
          <Ionicons name="eye" size={16} color="white" />
          <Text style={styles.viewersText}>{stream.viewers}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{stream.userId}</Text>
        <Text style={styles.timestamp}>Started {formatRelativeTime(stream.startedAt)}</Text>
      </View>
    </TouchableOpacity>
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
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  liveTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  viewersTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewersText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
  },
  infoContainer: {
    padding: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
});