import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

type RoundedButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
};

const RoundedButton: React.FC<RoundedButtonProps> = ({
  title,
  onPress,
  backgroundColor = '#007BFF',
  textColor = '#FFFFFF',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor }]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 65,
    borderRadius: 25, // This makes it rounded
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RoundedButton;
