import React, { useEffect, useRef, useState } from 'react';

import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import ProductCard from './ProductCard'; // Adjust path as needed
import { Product } from '../data/products';

import { useCart } from '../context/CartContext';

type Props = {
    products: Product[];
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

const ProductSlider: React.FC<Props> = ({ products }) => {
    const { addToCart } = useCart();

    const highRatedProducts: Product[] = products.filter(
        (item) => item.rating > 4.5
      );

    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Group products into arrays of 2
    const groupedProducts: Product[][] = [];
    for (let i = 0; i < highRatedProducts.length; i += 2) {
        groupedProducts.push(highRatedProducts.slice(i, i + 2));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % groupedProducts.length;
            flatListRef.current?.scrollToOffset({
                offset: nextIndex * width,
                animated: true,
            });
            setCurrentIndex(nextIndex);
        }, 3000); // Scroll every 3 seconds

        return () => clearInterval(interval);
    }, [currentIndex]);

    const renderItem = ({ item }: { item: Product[] }) => (
        <View style={styles.slide}>
            {item.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    img={product.img}
                    title={product.title}
                    rating={product.rating}
                    price={product.price}
                    discountPrice={product.discountPrice}
                    onAddToCart={() => addToCart(product, 1)}

                    onAddToFavorite={() => console.log('Toggle Favorite', product.title)}
                />
            ))}
        </View>
    );

    return (



        <FlatList
            ref={flatListRef}
            data={groupedProducts}
            style={{ flex: 1 }}
            renderItem={renderItem}
            pagingEnabled
            horizontal
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
        />

    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    slide: {
        width: width - 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default ProductSlider;
