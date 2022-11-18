import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Container, EmptyPhotoContainer, Image, EmptyPhotoText } from './styles';

type Props = TouchableOpacityProps & {
  uri?: string;
  text?: string;
  size?: number
}

export function Photo({ 
  uri, 
  text = 'Select a photo from your gallery',
  size = 180,
  ...rest 
}: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...rest}>
      <Container size={size}>
        {
          uri ? <Image source={{ uri }} size={size} /> : (
            <EmptyPhotoContainer size={size}>
              <EmptyPhotoText>
                {text}
              </EmptyPhotoText>
            </EmptyPhotoContainer >
          )
        }
      </Container>
    </TouchableOpacity>
  )
}