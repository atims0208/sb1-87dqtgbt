import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { agoraService } from '../services/agoraService';
import { LoadingIndicator } from '../components/common/LoadingIndicator';
import { useAuth } from '../hooks/useAuth';
import { createLiveStream, endLiveStream } from '../services/streamService';

const LiveStream = ({ navigation, route }) => {
  const { user } = useAuth();
  const [isHost, setIsHost] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  useEffect(() => {
    const setupAgora = async () => {
      try {
        agoraService.onUserJoined((uid) => {
          console.log('User joined:', uid);
        });

        agoraService.onUserLeft((uid) => {
          console.log('User left:', uid);
        });

        agoraService.onError((error) => {
          Alert.alert('Error', error.message);
        });
      } catch (error) {
        console.error('Error setting up Agora:', error);
        Alert.alert('Error', 'Failed to set up live stream');
      }
    };

    setupAgora();
  }, []);

  const startStream = async () => {
    try {
      setLoading(true);
      const channelName = `stream_${user?.id}_${Date.now()}`;
      
      // Create stream record in Firebase
      await createLiveStream(user?.id, channelName);
      
      // Join Agora channel
      await agoraService.joinChannel(channelName, user?.id || '');
      
      setIsHost(true);
      setIsJoined(true);
    } catch (error) {
      console.error('Error starting stream:', error);
      Alert.alert('Error', 'Failed to start live stream');
    } finally {
      setLoading(false);
    }
  };

  const endStream = async () => {
    try {
      setLoading(true);
      await agoraService.leaveChannel();
      if (isHost) {
        await endLiveStream(user?.id);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error ending stream:', error);
      Alert.alert('Error', 'Failed to end live stream');
    } finally {
      setLoading(false);
    }
  };

  const toggleAudio = async () => {
    try {
      await agoraService.toggleAudio(!audioEnabled);
      setAudioEnabled(!audioEnabled);
    } catch (error) {
      console.error('Error toggling audio:', error);
    }
  };

  const toggleVideo = async () => {
    try {
      await agoraService.toggleVideo(!videoEnabled);
      setVideoEnabled(!videoEnabled);
    } catch (error) {
      console.error('Error toggling video:', error);
    }
  };

  const switchCamera = async () => {
    try {
      await agoraService.switchCamera();
    } catch (error) {
      console.error('Error switching camera:', error);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      {!isJoined ? (
        <TouchableOpacity style={styles.startButton} onPress={startStream}>
          <Text style={styles.startButtonText}>Start Live Stream</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleAudio}>
            <Ionicons
              name={audioEnabled ? 'mic' : 'mic-off'}
              size={24}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={toggleVideo}>
            <Ionicons
              name={videoEnabled ? 'videocam' : 'videocam-off'}
              size={24}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={switchCamera}>
            <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.endButton]}
            onPress={endStream}
          >
            <Ionicons name="close-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  controlsContainer: {
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

export default LiveStream;