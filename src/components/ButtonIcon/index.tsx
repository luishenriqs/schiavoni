import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Icon,  } from './styles';

type Props = TouchableOpacityProps & {
  name?: string;
  size?: number;
  onPress(): void;
};

export function ButtonIcon({ name = "delete-outline", size = 30, onPress, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <Icon size={size} name={name} onPress={onPress} />
    </TouchableOpacity>
  );
};
