import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Title, ButtonTypeStyleProps } from './styles';

type Props = TouchableOpacityProps & {
    title: string;
    type?: ButtonTypeStyleProps;
    width?: number;
    height?: number;
    marginLeft?: number;
    marginRight?: number;
    paddingLeft?: number;
    paddingRight?: number;
}

export function ButtonEditable({ 
    title, 
    type = 'GREEN-700-BUTTON',
    width = 80,
    height = 80,
    marginLeft = 0,
    marginRight = 0,
    paddingLeft = 0,
    paddingRight = 0,
    ...rest 
}: Props) {
    return (
        <Container 
            type={type}
            width={width}
            height={height}
            marginLeft={marginLeft}
            marginRight={marginRight}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
            {...rest}
        >
            <Title>
                {title}
            </Title>
        </ Container>
    );
};