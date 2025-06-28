import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Alert,
  GestureResponderEvent,
  ImageSourcePropType
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../components/Color';

import { HomeStackParamList} from '../types';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ProductSlider from '../components/ProductSlider';
import { products } from '../data/products';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;


const { width } = Dimensions.get('window');

const CATEGORY_CARD_WIDTH = Dimensions.get('window').width * 0.18;


const sliderData = [
  { id: '1', image: require('../../assets/slide1.jpg') },
  { id: '2', image: require('../../assets/slide2.jpg') },
  { id: '3', image: require('../../assets/slide3.jpg') },
];

const categories = [
  { id: 1, name: 'Veggies', icon: require('../../assets/category1.png') },
  { id: 2, name: 'Fruits', icon: require('../../assets/category2.png') },
  { id: 3, name: 'Meat', icon: require('../../assets/category3.png') },
  { id: 4, name: 'Dairy', icon: require('../../assets/category4.png') },
];

type CategoryCardProps = {
  title: string;
  image: ImageSourcePropType;
  onPress: () => void;
  backgroundColor?: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, onPress }) => (
  <TouchableOpacity style={[styles.categoryCard,]} onPress={onPress}>
    <View style={{ backgroundColor: '#e4f6e9', borderRadius: 30, padding: 4 }}>
      <Image
        source={image} //source={{ uri: item.image }}
        style={styles.categoryImage}
      />
    </View>
    <Text style={styles.categoryCardText}>{title}</Text>
  </TouchableOpacity>
);


const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(0);


  const [location, setLocation] = useState("New York");

  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slide);
  };


  const CategoryList = () => {
    const elements = [];

    for (let i = 0; i < 4; i++) {
      elements.push(
        <CategoryCard key={i} title={categories[i].name} image={categories[i].icon} onPress={() => navigation.navigate('ProductList', { categoryId: categories[i].id, title: categories[i].name })} backgroundColor="#f39c12" />

      );
    }


    return <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15, }}>{elements}</View>;
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.TopContainer}>
        <View style={styles.TopLeft}>
          <Icon name="location-outline" size={20} color="white" />
          <Text style={styles.locationText}>{location}</Text>
        </View>


        <TouchableOpacity style={styles.circle} onPress={() => null}>
          <Icon name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
        <Icon name="search-outline" size={24} color={colors.mainGreen} />
      </View>
      <View style={{ backgroundColor: "#f6fbf7", flex: 1, padding: 10, paddingTop: 20, }}>

        {/* Custom Image Slider */}
        <View style={styles.sliderContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{ borderRadius: 15, }}
          >
            {sliderData.map((item) => (
              <Image
                key={item.id}
                source={item.image} //source={{ uri: item.image }}
                style={styles.sliderImage}
              />
            ))}
          </ScrollView>
          {/* Dots */}
          <View style={styles.dotsContainer}>
            {sliderData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeSlide === index ? styles.activeDot : undefined,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>



        <CategoryList />



        <Text style={styles.sectionTitle}>Popular</Text>

        <ProductSlider products={products.slice(0, 10)} />


      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainGreen,
    paddingTop: 50,
  },
  TopContainer: {
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginBottom: 22,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    fontSize: 16,
  },
  sliderContainer: {
    height: 160,
  },
  sliderImage: {
    width,
    height: 150,
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ace5bf',
    margin: 4,
  },
  activeDot: {
    backgroundColor: colors.mainGreen,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 16,
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
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
  categoryCard: {
    width: CATEGORY_CARD_WIDTH,
    height: 90,
    borderRadius: 9,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    marginHorizontal: 10,
    paddingTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    backgroundColor: 'white'
  },
  categoryImage: {
    width: 50,
    height: 50,
    objectFit: 'contain'
  },
  categoryCardText: {
    marginTop: 3,
    color: 'grey',
    fontSize: 12,
  }
});

export default HomeScreen;
