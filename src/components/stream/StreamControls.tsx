import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StreamControlsProps {
  audioEnabled: boolean;
  videoEnabled: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onSwitchCamera: () => void;
  onEndStream: () => void;
}

export const StreamControls: React.FC<StreamControlsProps> = ({
  audioEnabled,
  videoEnabled,
  onToggleAudio,
  onToggleVideo,
  onSwitchCamera,
  onEndStream,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.controlButton} onPress={onToggleAudio}>
        <Ionicons
          name={audioEnabled ? 'mic' : 'mic-off'}
          size={24}
          color="white"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.controlButton} onPress={onToggleVideo}>
        <Ionicons
          name={videoEnabled ? 'videocam' : 'videocam-off'}
          size={24}
          color="white"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.controlButton} onPress={onSwitchCamera}>
        <Ionicons name="camera-reverse" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.controlButton, styles.endButton]}
        onPress={onEndStream}
      >
        <Ionicons name="close-circle" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  endButton: {
    backgroundColor: '#FF3B30',
  },
});