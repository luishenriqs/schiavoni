import React from 'react';
import { useTheme } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Container,
    LeaderInfo,
    Title,
    LeadersName,
    Text,
    Imagem
 } from './styles';

interface IProps {
    title: string;
    leadersName: string;
    profile: string;
    Season: string;
    Game: string;
}

export function LeaderCard({
    title,
    leadersName,
    profile,
    Season,
    Game
}: IProps) {
    const { COLORS } = useTheme();
    return (
        <Container>
            {profile === 'anonymousURL'
                ? <Imagem source={require('@assets/anonymousImage/AnonymousImage.png')}/>
                : <Imagem source={{uri: profile}} />
            }
            <LinearGradient
                colors={[COLORS.gray_700, COLORS.gray_500, COLORS.gray_700]}
            >
                <LeaderInfo>
                    <Title>{title}</Title>
                    {leadersName.length <= 15
                        ? <LeadersName>{leadersName}</LeadersName>
                        : <LeadersName>{leadersName.substring(12, -1)}...</LeadersName>
                    }
                    <Text>{Season}</Text>
                    <Text>{Game}</Text>
                </LeaderInfo>
            </LinearGradient>
        </Container>
    );
}
