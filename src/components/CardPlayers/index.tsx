import React from 'react';
import { SvgProps } from 'react-native-svg';
import {
    Container,
    NameContainer,
    PowerContainer,
    Name,
    Icon
 } from './styles';

interface IProps {
    svg: React.FC<SvgProps>
    power: number;
    name: string;
}

export function CardPlayers({
    svg: Svg,
    power,
    name,
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

    return (
        <Container>
            <NameContainer>
                <Svg 
                    width={68}
                    border-radius={8}
                />
                {name.length <= 16
                    ? <Name>{name}</Name>
                    : <Name>{name.substring(12, -1)}...</Name>
                }
            </NameContainer>
            <PowerContainer>
                {stars?.map((item, index) => {
                    return (
                        <Icon key={index} name='star' power={item}/>
                    )
                })}
                
            </PowerContainer>
        </Container>
    );
}
