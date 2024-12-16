import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StreamInfoProps {
  viewerCount: number;
  duration: string;
}

export const StreamInfo: React.FC<StreamInfoProps> = ({
  viewerCount,
  duration,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoItem}>
        <Ionicons name="eye" size={20} color="white" />
        <Text style={styles.infoText}>{viewerCount}</Text>
      </View>
      <View style={styles.infoItem}>
        <Ionicons name="time" size={20} color="white" />
        <Text style={styles.infoText}>{duration}</Text>
      </View>
      <View style={styles.liveIndicator}>
        <Text style={styles.liveText}>LIVE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  infoText: {
    color: 'white',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  liveIndicator: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});