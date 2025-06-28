import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import BackButton from '../components/BackButton';
import { colors } from '../components/Color';


type Props = {
  title?: string;
  them?: string;
  onBellPress?: () => void;
};

const TopBar: React.FC<Props> = ({ them, title, onBellPress }) => {

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{...styles.container, backgroundColor:them=="dark" ? colors.mainGreen: 'transparent' }}>
      <View style={styles.left}>
        <TouchableOpacity style={{...styles.circle, backgroundColor:them=="dark" ? '#00ae3a': 'white'}} onPress={handleBack}>
          <Icon name="chevron-left" size={24} color={them=="dark" ? 'white': colors.mainGreen} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{...styles.titleText, color:them=="dark" ? 'white': "grey"}}>{title}</Text>
      </View>

      <TouchableOpacity style={{...styles.circle, backgroundColor:them=="dark" ? '#00ae3a': 'white'}} onPress={onBellPress}>
        <Icon name="bell-outline" size={24} color={them=="dark" ? 'white': colors.mainGreen} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.mainGreen,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
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

export default TopBar;
