import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator ,Image, } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types';
import { colors } from '../components/Color';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000); // 2 seconds splash

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 200, marginBottom: 10 }}
        source={require('../../assets/logo.png')}
        resizeMode='contain'
      />
      <Text style={styles.title}>Grocery App</Text>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4fff8',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.mainGreen,
  },
});

export default SplashScreen;
