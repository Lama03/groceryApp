import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useToast } from "react-native-toast-notifications";

import TopBar from '../components/TopBar';
import { colors } from '../components/Color';

import RoundedButton from '../components/RoundedButton';
import footerStyles from '../styles/FooterStyles';
import ProductSlider from '../components/ProductSlider';
import { products } from '../data/products';

import { useCart } from '../context/CartContext';

import { Product, HomeStackParamList } from '../types';


type RelatedProduct = {
  id: number;
  title: string;
  image: string;
};


type Props = {
  product: Product;
};

const relatedProducts: RelatedProduct[] = [
  { id: 1, title: 'Related 1', image: 'https://www.pharmamirror.com/wp-content/uploads/2013/06/Banna-as-Hepatitis-Oral-Vaccine.jpg' },
  { id: 2, title: 'Related 2', image: 'https://via.placeholder.com/100' },
  { id: 3, title: 'Related 3', image: 'https://via.placeholder.com/100' },
];


type RouteProps = RouteProp<HomeStackParamList, 'ProductDetail'>;


const ProductDetailsScreen = () => {
  const toast = useToast();

  const route = useRoute<RouteProps>();
  const { product } = route.params;

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState<number>(1);

  const [total, setTotal] = useState<number>(product.price);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({
      tabBarStyle: { display: 'none' } as BottomTabNavigationOptions['tabBarStyle'],
    });

    return () => {
      parent?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);



  const increaseQuantity = () => {

    var newQty = quantity + 1;
    setQuantity(newQty);
    setTotal(newQty * product.price);
  };


  const decreaseQuantity = () => {

    var newQty = (quantity > 1 ? quantity - 1 : 1);

    setQuantity(newQty);
    setTotal(newQty * product.price);

  };


  const HandelAddToCart = () => {
    console.log(`Added ${quantity} item(s) to cart`);

    addToCart(product, quantity);

    toast.show("Item has been added to the cart successfully");

    
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title={"Details"} them={"light"} />

      <ScrollView contentContainerStyle={styles.contentContainer}>

        {/* Product Image */}
        <Image
          source={{ uri: product.img }}
          style={styles.image}
        />



        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


          <View style={{ alignItems: 'flex-start' }}>
            {/* Title, Rating, and Price */}
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.rating}>⭐ {product.rating}</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>
          {/* Quantity Controls */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.qtyButton} onPress={decreaseQuantity}>
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity} KG</Text>
            <TouchableOpacity style={{ ...styles.qtyButton, backgroundColor: colors.mainGreen }} onPress={increaseQuantity}>
              <Text style={{ ...styles.qtyText, color: 'white' }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Details */}
        <Text style={styles.sectionTitle}>Product Details</Text>
        <Text style={styles.detailsText}>
          This is a sample product with a detailed description. It's high quality and perfect for your needs.
        </Text>

        {/* Related Products */}
        <Text style={styles.sectionTitle}>Related Products</Text>

        <ProductSlider products={products.slice(0, 10)} />

      </ScrollView>

      {/* Add to Cart Button */}
      <View style={footerStyles.footer}>



        <View>
          <Text>Total Price</Text>
          <Text style={footerStyles.totalText}>${total}</Text>
        </View>

        <RoundedButton
          title="Add to Cart"
          onPress={HandelAddToCart}
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
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 16,
    marginTop: 4,
    color: '#666',
  },
  price: {
    fontSize: 20,
    color: '#e91e63',
    marginVertical: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  qtyButton: {
    backgroundColor: '#ececec',
    borderRadius: 45,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  qtyText: {
    fontSize: 20,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  detailsText: {
    fontSize: 16,
    marginTop: 8,
    color: '#555',
  },
  relatedItem: {
    marginRight: 12,
    alignItems: 'center',
  },
  relatedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  relatedTitle: {
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
  },

});

export default ProductDetailsScreen;
