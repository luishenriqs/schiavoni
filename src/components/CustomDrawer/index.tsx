import React from 'react';
import auth from '@react-native-firebase/auth';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { 
    Container, 
    DrawerContent, 
    Imagem, 
    DrawerListContent, 
    Line,
    ButtonBottom,
    ButtonContent,
    TextButton
} from './styles';

export function CustomDrawer(props: any) {
    const { COLORS } = useTheme();

    function handleLogout() {
        auth().signOut();
    }

    return (
        <Container>
            <DrawerContentScrollView {...props} 
                contentContainerStyle={{backgroundColor: COLORS.gray_500}}
            >
                <Imagem 
                    source={require('../../assets/logoOficial/schiavoniOficial.png')} 
                />
                <DrawerContent>
                    <DrawerItemList {...props} />
                </DrawerContent>
            </DrawerContentScrollView>
            <Line />
            <DrawerListContent>
                <ButtonBottom onPress={() => {console.log('Termos de uso')}}>
                    <ButtonContent>
                        <MaterialCommunityIcons 
                            name='file-document-outline'
                            size={20}
                            color={COLORS.gray_600}
                        />
                        <TextButton>Terms of use</TextButton>
                    </ButtonContent>
                </ButtonBottom>
                <ButtonBottom onPress={handleLogout}>
                    <ButtonContent>
                        <Octicons 
                            name='sign-out'
                            size={20}
                            color={COLORS.gray_600}
                        />
                        <TextButton>Log Out</TextButton>
                    </ButtonContent>
                </ButtonBottom>
            </DrawerListContent>
        </Container>
    )
}