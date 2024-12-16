import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Message {
  id: string;
  userId: string;
  message: string;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.username}>{item.userId}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={styles.messagesContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 160,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'transparent',
  },
  messagesContent: {
    padding: 10,
  },
  messageContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  username: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  message: {
    color: 'white',
    fontSize: 14,
  },
});