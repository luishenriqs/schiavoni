import React from 'react';
import {
    Container,
    PlayerContainer,
    NameContainer,
    Name,
    PercentContainer,
    PercentText,
    PowerContainer,
    Icon,
    ImageContent,
    ImageProfileAndAvatar
 } from './styles';

interface IProps {
    power: number;
    percent: number;
    name: string;
    avatar: string;
}

export function CardLevel({
    power,
    percent,
    name,
    avatar
}: IProps) {

    const powerSize = (power: number) => {
        switch(power) {
            case 5:
                return  [true, true, true, true, true]
            case 4:
                return  [true, true, true, true, false]
            case 3:
                return  [true, true, true, false, false]
            case 2:
                return  [true, true, false, false, false]
            case 1:
                return  [true, false, false, false, false]
            case 0:
                return  [false, false, false, false, false]
        }
    }

    const stars = powerSize(power);

    const fullName = name.split(' ');
    const firstName = fullName[0];
    const secondName = fullName[1];

    return (
        <Container>
            <PlayerContainer>
                <ImageContent>
                    {avatar !== 'anonymousURL'
                        ? <ImageProfileAndAvatar source={{uri: avatar}}/>
                        : <ImageProfileAndAvatar source={require('@assets/anonymousImage/AnonymousImage.png')}/>
                    }
                </ImageContent>
                <NameContainer>
                    {secondName 
                        ? <Name>{firstName + ' ' + secondName}</Name>
                        : <Name>{firstName}</Name>
                    }
                </NameContainer>
                <PercentContainer>
                    <PercentText percent={percent}>
                        {'% ' + percent.toFixed(0)}
                    </PercentText>
                </PercentContainer>
            </PlayerContainer>
            <PowerContainer>
                {stars?.map((item, index) => {
                    return (
                        <Icon key={index} name='star' power={item}/>
                    )
                })}
                
            </PowerContainer>
        </Container>
    );
};
