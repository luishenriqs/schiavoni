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
    profile?: string;
}

export function CardRanking({
    position,
    positionNumber,
    name,
    points,
    profile
}: IProps) {

    return (
        <Container>
            <InfoBox positionStatus={positionNumber}>
                <Position>{position}</Position>
            </InfoBox>
            <NameBox positionStatus={positionNumber}>
                <ImageContent>
                    {profile !== 'anonymousURL'
                        ? <ImageProfileAndAvatar source={{uri: profile}}/>
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
