import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // or use @expo/vector-icons


import { useNavigation } from '@react-navigation/native';

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.circle} onPress={handleBack}>
        <Icon name="arrow-back" size={24} color="#00f552" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50, // adjust based on platform or SafeAreaView
    left: 20,
    zIndex: 10,
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: '#00ae3a',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});

export default BackButton;
