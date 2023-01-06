import React from 'react';
import {
    Container,
    PositionBox,
    Position,
    NameBox,
    Name
 } from './styles';

interface IProps {
    position: number;
    name: string;
}

export function CardResult({
    position,
    name
}: IProps) {
    return (
        <Container>
            <PositionBox>
                <Position>{position}</Position>
            </PositionBox>
            <NameBox>
                <Name>{name}</Name>
            </NameBox>
        </Container>
    );
};
