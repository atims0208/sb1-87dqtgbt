import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { RTCView } from 'react-native-webrtc';

interface StreamViewProps {
  streamUrl: string;
  isLocal?: boolean;
}

export const StreamView: React.FC<StreamViewProps> = ({
  streamUrl,
  isLocal = false,
}) => {
  return (
    <View style={[styles.container, isLocal && styles.localContainer]}>
      <RTCView
        streamURL={streamUrl}
        style={styles.videoStream}
        objectFit="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  localContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 120,
    height: 160,
    borderRadius: 8,
    overflow: 'hidden',
  },
  videoStream: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});