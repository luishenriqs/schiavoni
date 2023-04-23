import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {
    Container,
    ImageContent,
    ImageProfileAndAvatar,
    PlayerContainer,
    DataContainer,
    NameContainer,
    Name,
    PerformanceData,
    PercentContainer,
    PercentText,
    StarsContainer,
    Icon,
 } from './styles';

 type IProps = TouchableOpacityProps & {
    power: number;
    percent: number;
    name: string;
    avatar: string;
    onPress: () => void
};

export function CardPerformance({
        power,
        percent,
        name,
        avatar,
        onPress,
        ...rest
    }: IProps
) {

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
        };
    };

    const stars = powerSize(power);

    const fullName = name.split(' ');
    const firstName = fullName[0];
    const secondName = fullName[1];
    
    return (
        <Container
            name={name}
            onPress={onPress}
            {...rest}
        >
            <PlayerContainer>
                <ImageContent>
                    {avatar !== 'anonymousURL'
                        ? <ImageProfileAndAvatar source={{uri: avatar}}/>
                        : <ImageProfileAndAvatar source={require('@assets/anonymousImage/AnonymousImage.png')}/>
                    }
                </ImageContent>
                <DataContainer>
                    <NameContainer>
                        {secondName 
                            ? <Name>{firstName + ' ' + secondName}</Name>
                            : <Name>{firstName}</Name>
                        }
                    </NameContainer>
                    <PerformanceData>
                        <PercentContainer>
                            <PercentText percent={percent}>
                                {'% ' + percent}
                            </PercentText>
                        </PercentContainer>
                        <StarsContainer>
                            {stars?.map((item, index) => {
                                return (
                                    <Icon key={index} name='star' power={item}/>
                                )
                            })}
                        </StarsContainer>
                    </PerformanceData>
                </DataContainer>
            </PlayerContainer>
        </ Container>
    );
};