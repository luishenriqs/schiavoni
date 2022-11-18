import React from 'react';
import { useTheme } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';
import {
    Container,
    LeaderInfo,
    Title,
    LeadersName,
    Weeks,
    Imagem
 } from './styles';

interface IProps {
    svg: React.FC<SvgProps>
    title: string;
    leadersName: string;
    weeks: string;
}

export function LeaderCard({
    svg: Svg,
    title,
    leadersName,
    weeks,
}: IProps) {
    const { COLORS } = useTheme();
    return (
        <Container>
            <Svg 
                width={RFValue(128)}
            />
            {/* <Imagem 
                source={require('../../assets/teams/teamLuisao.jpg')} 
            /> */}
            <LinearGradient
                colors={[COLORS.gray_700, COLORS.gray_500, COLORS.gray_700]}
            >
                <LeaderInfo>
                    <Title>{title}</Title>
                        {leadersName.length <= 16
                            ? <LeadersName>{leadersName}</LeadersName>
                            : <LeadersName>{leadersName.substring(12, -1)}...</LeadersName>
                        }
                    <Weeks>{weeks}</Weeks>
                </LeaderInfo>
            </LinearGradient>
        </Container>
    );
}
