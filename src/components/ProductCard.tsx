import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { useToast } from "react-native-toast-notifications";

import { colors } from '../components/Color';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useFavorites } from '../context/FavoriteContext';

import { HomeStackParamList, Product } from '../types';

import Icon from 'react-native-vector-icons/Ionicons';

import Feather from 'react-native-vector-icons/Feather';

const CARD_WIDTH = Dimensions.get('window').width / 2 - 20;


interface ProductCardProps extends Product {
  onAddToCart: () => void;
  onAddToFavorite: () => void;
}

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ProductDetail'>;


const ProductCard: React.FC<ProductCardProps> = ({
  id,
  img,
  title,
  price,
  rating,
  discountPrice,
  onAddToCart,
}) => {

  const navigation = useNavigation<NavigationProp>();

  const toast = useToast();

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handlePress = () => {
    navigation.navigate('ProductDetail', {
      product: {
        id,
        img,
        title,
        price,
        rating,
      }
    });
  };

  const onAddToFavorite = () => {
    if (isFavorite(id)) {
      removeFromFavorites(id);
    } else {

      const newProduct: Product = {
        id,
        img,
        title,
        price,
        rating,
      };

      addToFavorites(newProduct);

      toast.show("Added To Favorites", {
        type: "normal",// "normal | success | warning | danger | custom",
        placement: "center",//"top | bottom",
        duration: 4000,
        animationType: "zoom-in",//"slide-in | zoom-in",
      });

    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>

      <View style={styles.imageContainer}>
        <Image source={{ uri: img }} style={styles.image} resizeMode='contain' />
        <TouchableOpacity style={styles.favoriteIcon} onPress={onAddToFavorite}>

          {isFavorite(id) ? <Icon
            name={'heart'}
            size={22}
            color={colors.mainGreen}
          /> : <Feather name="heart" color={colors.mainGreen} size={22} />}



        </TouchableOpacity>
      </View>

      <View style={styles.info}>

        <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginInlineStart: 5, }}>

          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>

          <View style={styles.priceContainer}>
            {discountPrice ? (
              <>
                <Text style={styles.discountedPrice}>${discountPrice.toFixed(2)}</Text>
                <Text style={styles.originalPrice}>${price.toFixed(2)}</Text>
              </>
            ) : (
              <Text style={styles.normalPrice}>${price.toFixed(2)}</Text>
            )}
          </View>


        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={styles.button} onPress={onAddToCart}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    width: CARD_WIDTH,
  },
  image: {
    width: '100%',
    height: 120,

  },
  info: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingStart: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  rating: {
    fontSize: 14,
    color: '#888',
  },
  button: {
    backgroundColor: colors.mainGreen,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 2,
    borderBottomEndRadius: 12,
    alignSelf: 'flex-end', // Align left
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.lightGreen,
    padding: 6,
    borderRadius: 20,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    height: 120,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  discountedPrice: {
    fontSize: 16,
    color: '#e91e63',
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#999',
  },
  normalPrice: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: 'bold',
  },
});

export default ProductCard;
