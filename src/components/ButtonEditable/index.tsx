import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Title, ButtonTypeStyleProps } from './styles';

type Props = TouchableOpacityProps & {
    title: string;
    type?: ButtonTypeStyleProps;
    width?: number;
    length?: number;
}

export function ButtonEditable({ 
    title, 
    type = 'GREEN-BUTTON',
    width = 80,
    length = 80,
    ...rest 
}: Props) {
    return (
        <Container 
            type={type}
            width={width}
            length={length}
            {...rest}
        >
            <Title>
                {title}
            </Title>
        </ Container>
    );
};