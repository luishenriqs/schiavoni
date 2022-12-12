import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Container } from './styles';

export function Input({ ...rest }: TextInputProps) {
    const { COLORS } = useTheme();
    return (
        <Container 
            placeholderTextColor={COLORS.gray_400}
            {...rest}
        />
    );
};