import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

export const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff6aff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    color: '#666',
  },
});