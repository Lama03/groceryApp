// Example: EditProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditProfileScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Welcome to the Profile Page!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});

export default EditProfileScreen;
