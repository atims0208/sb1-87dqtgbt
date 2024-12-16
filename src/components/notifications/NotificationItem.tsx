import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Notification } from '../../types/notification';
import { formatRelativeTime } from '../../utils/dateUtils';

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
}) => {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'follow':
        return 'person-add';
      case 'like':
        return 'heart';
      case 'comment':
        return 'chatbubble';
      case 'mention':
        return 'at';
      default:
        return 'notifications';
    }
  };

  const getNotificationText = () => {
    switch (notification.type) {
      case 'follow':
        return 'started following you';
      case 'like':
        return 'liked your post';
      case 'comment':
        return 'commented on your post';
      case 'mention':
        return 'mentioned you in a post';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, !notification.read && styles.unread]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Icon name={getNotificationIcon()} size={24} color="#007AFF" />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>
          <Text style={styles.username}>{notification.senderId}</Text>
          {' '}{getNotificationText()}
        </Text>
        <Text style={styles.timestamp}>
          {formatRelativeTime(notification.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  unread: {
    backgroundColor: '#F0F8FF',
  },
  iconContainer: {
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 15,
    marginBottom: 4,
  },
  username: {
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
});