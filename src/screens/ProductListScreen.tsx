import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';

import { HomeStackParamList, Product } from '../types';

import { products as allProducts } from '../data/products';

type ScreenBRouteProp = RouteProp<HomeStackParamList, 'ProductList'>;

import ProductCard from '../components/ProductCard';

import TopBar from '../components/TopBar';
import { colors } from '../components/Color';
import { useCart } from '../context/CartContext';


const PAGE_SIZE = 6;

const ProductListScreen: React.FC = () => {
  const route = useRoute<ScreenBRouteProp>();

  const { categoryId } = route.params;
  const { title } = route.params;

  const categorizedProducts: Product[] = allProducts.filter(
    (item) => item.categoryId === categoryId
  );
  
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const nextProducts = categorizedProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    setVisibleProducts((prev) => [...prev, ...nextProducts]);
    setPage((prev) => prev + 1);
  };

  const handleLoadMore = () => {
    if (loadingMore || visibleProducts.length >= categorizedProducts.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      loadProducts();
      setLoadingMore(false);
    }, 500); // Simulate delay
  };

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      id={item.id}
      img={item.img}
      title={item.title}
      price={item.price}
      rating={item.rating}
      discountPrice={item.discountPrice}
      onAddToCart={() => addToCart(item, 1)}
      onAddToFavorite={() => console.log('Toggled favorite')}
    />
  );

  return (
    <View style={styles.container}>

      <View style={{ backgroundColor: '#f5f5f5' }}>
        <TopBar title={title} them={"dark"} />
        <FlatList
          data={visibleProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 20 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator size="large" color="#555" /> : null
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    backgroundColor: colors.mainGreen,
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },

});

export default ProductListScreen;
