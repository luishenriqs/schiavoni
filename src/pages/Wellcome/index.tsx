import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@components/Button';
import LogoSvg from '../../assets/logoOficial/schiavoniOficial.svg';
import {
    Header,
    WellcomeText,
    Content,
    Title
} from './styles';

export function Wellcome({navigation}: {navigation: any}) {
    const theme = useTheme();

    return (
        <LinearGradient
            style={{flex: 1}}
            colors={[
                theme.COLORS.gray_900,
                theme.COLORS.gray_500,
                theme.COLORS.gray_300,
                theme.COLORS.gray_500,
                theme.COLORS.gray_900,
            ]}
        >
            <Header>
                <WellcomeText>Wellcome to</ WellcomeText>
                <LogoSvg 
                    width={RFValue(270)}
                    height={RFValue(270)}
                />
            </Header>
            <Content>
                <Title>Since 2017</ Title>
                <Button
                    title="Let's Play"
                    type='GRAY-BUTTON'
                    onPress={() => navigation.navigate('signIn')}
                />
            </Content>
        </LinearGradient>
    );
};