import React from 'react';
import { SvgProps } from 'react-native-svg';
import {
    Container,
    InfoBox,
    Position,
    NameBox,
    Name,
    Points,
 } from './styles';

interface IProps {
    svg: React.FC<SvgProps>
    position: string;
    name: string;
    points: number;
}

export function CardRanking({
    svg: Svg,
    position,
    name,
    points,
}: IProps) {
    return (
        <Container>
            <InfoBox>
                <Position>{position}</Position>
            </InfoBox>
            <NameBox>
                <Svg 
                    width={68}
                />
                {name.length <= 17
                    ? <Name>{name}</Name>
                    : <Name>{name.substring(12, -1)}...</Name>
                }
            </NameBox>
            <InfoBox>
                <Points>{points}</Points>
            </InfoBox>
        </Container>
    );
}
