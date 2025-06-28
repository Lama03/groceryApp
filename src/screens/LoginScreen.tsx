import React, { useState } from 'react';
import { View, TextInput, ImageBackground, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Button from '../components/Button';


import Text from '../../assets/FontText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleLogin = () => {

    navigation.replace('MainApp');

    if (username === 'admin' && password === 'password') {
      //Alert.alert('Login Successful', `Welcome, ${username}!`);

      navigation.replace('MainApp');

    } else {
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  };

  return (


    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ImageBackground
        source={require('../../assets/background.jpg')} // Local image
        style={styles.container}
        resizeMode="cover" // or "contain", "stretch", "repeat", etc.
      >
        <Text style={styles.title}>Sign in</Text>

        <Text style={styles.titleDescription}>Enter your email address and password to sign in</Text>

        <View style={styles.innerContainer}>

          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={setUsername}
            value={username}
          />

          <Text style={styles.label}>Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <Button title="Sign in" onPress={handleLogin} />

          <Text style={styles.text}>
            Don’t have an account?{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
              Sign up
            </Text>
            .
          </Text>
        </View>
      </ImageBackground>

    </KeyboardAvoidingView>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9fafd',
  },
  innerContainer: {
    marginHorizontal: 7,
    marginTop: 40,
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  titleDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  label: {
    marginStart: 5,
    fontFamily: 'Cairo-bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
  link: {
    color: '#2e64e5',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
