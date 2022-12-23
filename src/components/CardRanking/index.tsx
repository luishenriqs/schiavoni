import React from 'react';
import { SvgProps } from 'react-native-svg';
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
}

export function CardRanking({

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
                <ImageContent>
                    <ImageProfileAndAvatar source={{uri: 'https://firebasestorage.googleapis.com/v0/b/schiavoni-8efc7.appspot.com/o/ProfileImage%2FProfile_Image_Anonymous%20Player.jpeg?alt=media&token=4beab875-e86c-46ba-b950-7012d7e14557'}}/>
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
