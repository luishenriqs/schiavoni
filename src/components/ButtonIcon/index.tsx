import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Icon,  } from './styles';

type Props = TouchableOpacityProps & {
  onPress(): void;
};

export function ButtonIcon({ onPress, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <Icon size={30} name="delete-outline" onPress={onPress} />
    </TouchableOpacity>
  );
};
