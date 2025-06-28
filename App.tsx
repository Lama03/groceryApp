import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CartProvider } from './src/context/CartContext';

import { FavoriteProvider } from './src/context/FavoriteContext';

import { useCart } from './src/context/CartContext';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';

import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';

import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';

import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import FavoritesListScreen from './src/screens/FavoritesListScreen';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFonts } from 'expo-font';

import { HomeStackParamList, RootStackParamList, ProfileStackParamList, CartStackParamList } from './src/types';


import { ToastProvider } from 'react-native-toast-notifications'
import { colors } from './src/components/Color';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const CartStack = createNativeStackNavigator<CartStackParamList>();


const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={() => ({
      headerShown: false,
    })}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="ProductList" component={ProductListScreen} />

    <HomeStack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
  </ProfileStack.Navigator>
);


const CartStackScreen = () => (
  <CartStack.Navigator
    screenOptions={() => ({
      headerShown: false,
    })}>
    <CartStack.Screen name="Cart" component={CartScreen} />
    <CartStack.Screen name="Checkout" component={CheckoutScreen} />
  </CartStack.Navigator>
);

const MainAppTabs: React.FC = () => {

  const { cartCount } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Profile') iconName = 'information';
          else if (route.name === 'Cart') iconName = 'cart';
          else if (route.name === 'Favorite') iconName = 'heart-outline';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.mainGreen, // 
        tabBarInactiveTintColor: '#777', 
        tabBarStyle: { backgroundColor: '#fff' }, // tab bar background
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />

      <Tab.Screen name="Favorite" component={FavoritesListScreen} />

      <Tab.Screen name="Cart"

        options={{
          tabBarBadge: cartCount,

          tabBarBadgeStyle: {
            backgroundColor: "#FF6347", // 🎨 Badge background color
            color: 'white',         // 🅰️ Badge text color
            fontSize: 12,
          },
        }}

        component={CartStackScreen} />



      <Tab.Screen name="Profile" component={ProfileStackScreen} />


    </Tab.Navigator>
  );
};


export default function App() {

  let [fontsLoaded] = useFonts({
    'Cairo': require('./assets/fonts/Cairo-Regular.ttf'),
    'Cairo-bold': require('./assets/fonts/Cairo-Bold.ttf'),

  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ToastProvider>
      <CartProvider>
        <FavoriteProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="MainApp" component={MainAppTabs} />
            </Stack.Navigator>
          </NavigationContainer>
        </FavoriteProvider>
      </CartProvider>
    </ToastProvider>
  );
}
