import React from 'react';
import {
    Container,
    InfoBox,
    Position,
    NameBox,
    Name,
    Points,
    ImageContent,
    ImageProfileAndAvatar
 } from './styles';

interface IProps {
    position: string;
    positionNumber: number;
    name: string;
    points: number;
    avatar?: string;
}

export function CardRanking({
    position,
    positionNumber,
    name,
    points,
    avatar
}: IProps) {

    return (
        <Container>
            <InfoBox positionStatus={positionNumber}>
                <Position>{position}</Position>
            </InfoBox>
            <NameBox positionStatus={positionNumber}>
                <ImageContent>
                    {avatar !== 'anonymousURL'
                        ? <ImageProfileAndAvatar source={{uri: avatar}}/>
                        : <ImageProfileAndAvatar source={require('@assets/anonymousImage/AnonymousImage.png')}/>
                    }
                </ImageContent>
                {name.length <= 15
                    ? <Name>{name}</Name>
                    : <Name>{name.substring(12, -1)}...</Name>
                }
            </NameBox>
            <InfoBox positionStatus={positionNumber}>
                <Points>{points}</Points>
            </InfoBox>
        </Container>
    );
}
