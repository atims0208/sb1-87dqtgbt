import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface LoadingIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'large',
  color = '#007AFF',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
});