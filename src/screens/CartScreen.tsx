// CartScreen.tsx
import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  StatusBar
} from 'react-native';

import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

import RoundedButton from '../components/RoundedButton';
import { colors } from '../components/Color';
import footerStyles from '../styles/FooterStyles';


import { CartStackParamList } from '../types';
import TopBar from '../components/TopBar';

type Props = NativeStackScreenProps<CartStackParamList, 'Cart'>;

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const { cart, removeFromCart, addToCart } = useCart();

  const [code, setCode] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 100 ? 0 : 10;
  const discount = subtotal > 150 ? subtotal * 0.1 : 0;
  const total = subtotal + delivery - discount;

  const updateQuantity = (product: Product, q: number) => {

    if (q == 1) {
      addToCart(product, 1);
    } else {
      removeFromCart(product.id);

    }
  };

  const handleApply = () => {
    console.log('Applied code:', code);
    // you can validate or apply the code here
  };


  useLayoutEffect(() => {
    
    const parent = navigation.getParent();
    parent?.setOptions({
      tabBarStyle: { display: 'none', } as BottomTabNavigationOptions['tabBarStyle'],
    });
    

    return () => {
      
      parent?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);

  return (

    <SafeAreaView style={styles.container}>

      <TopBar title={"Cart"} them={"dark"} />

      <FlatList

        data={cart}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.image} />
            <View style={{ marginInlineStart: 7, }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>


            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.qtyButton} onPress={() => updateQuantity(item, -1)}>
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity} KG</Text>
              <TouchableOpacity style={{ ...styles.qtyButton, backgroundColor: colors.mainGreen }} onPress={() => updateQuantity(item, 1)}>
                <Text style={{ ...styles.qtyText, color: 'white' }}>+</Text>
              </TouchableOpacity>
            </View>

          </View>
        )}
        ListFooterComponent={
          <View style={styles.bottomCard}>
            <View style={styles.applyCodeContainer}>
              <TextInput
                placeholder="Enter promo code"
                value={code}
                onChangeText={setCode}
                style={styles.applyCodeInput}
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.applyCodeButton} onPress={handleApply}>
                <Text style={styles.applyCodeButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Subtotal</Text>
              <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Delivery</Text>
              <Text style={styles.value}>${delivery.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Discount</Text>
              <Text style={styles.value}>-${discount.toFixed(2)}</Text>
            </View>
            <View style={styles.rowTotal}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        }
      />




      {/* Checkout Button */}
      <View style={footerStyles.footer}>

        <View>
          <Text>Total Price</Text>
          <Text style={footerStyles.totalText}>${total.toFixed(2)}</Text>
        </View>

        <RoundedButton
          title="Checkout"
          onPress={() => navigation.navigate('Checkout', { total })}
          backgroundColor="#28a745"
          textColor="#fff"
        />
      </View>
    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    
  },
  list: {
    padding: 16,
    paddingBottom: 120,

  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
    flexDirection: 'row',
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  price: {
    color: '#e91e63',
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginInlineStart: 'auto'
  },
  qtyButton: {
    backgroundColor: '#ececec',
    borderRadius: 45,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  qtyText: {
    fontSize: 15,
  },
  quantity: {
    marginHorizontal: 7,
    fontSize: 14,
  },
  bottomCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
  value: {
    fontSize: 16,
    color: '#444',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  applyCodeContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 16,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#f6f6f6'
  },
  applyCodeInput: {
    flex: 1,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 16,
    color: '#333',
  },
  applyCodeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    height: 48,
    justifyContent: 'center',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  applyCodeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
export default CartScreen;
