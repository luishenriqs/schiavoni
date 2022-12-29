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
    name: string;
    points: number;
    avatar?: string;
}

export function CardRanking({
    position,
    name,
    points,
    avatar
}: IProps) {
    return (
        <Container>
            <InfoBox>
                <Position>{position}</Position>
            </InfoBox>
            <NameBox>
                <ImageContent>
                    {avatar !== 'anonymousURL'
                        ? <ImageProfileAndAvatar source={{uri: avatar}}/>
                        : <ImageProfileAndAvatar source={require('@assets/anonymousImage/AnonymousImage.png')}/>
                    }
                </ImageContent>
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
