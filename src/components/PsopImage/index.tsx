import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';
import {
    Container,
 } from './styles';

interface IProps {
    svg: React.FC<SvgProps>
}

export function PsopImage({
    svg: Svg,
}: IProps) {
    return (
        <Container>
            <Svg 
                width={RFValue(120)}
            />
        </Container>
    );
}
