import React, { useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { ButtonEditable } from '@components/ButtonEditable';
import ModalComponent from '@components/ModalComponent';
import { UserDTO } from '@dtos/userDTO';
import {
    Container,
    NameBox,
    Name,
    ImageContent,
    ImageProfileAndAvatar,
    ButtonBox
 } from './styles';

interface IProps {
    name: string;
    profile?: string;
    isAdmin: boolean;
};

export function CardSquadPlayers({
    name,
    profile,
    isAdmin
}: IProps) {
    const { allPlayers, setAllPlayersContext } = useAllPlayers();

    const [modalVisible, setModalVisible] = useState(false);

    //==> ATUALIZA STATUS ADMIN
    const handleUpdateAdmin = (name: string, isAdmin: boolean) => {
        const playerUpdated = allPlayers.filter((item) => {
            if (item.name === name) return item;
        });
        firestore()
            .collection('players')
            .doc(playerUpdated[0].doc_id)
            .update({
                isAdmin: !isAdmin,
            })
            .then(() => {
                !isAdmin
                    ? Alert.alert(`${name} agora é um administrador!`)
                    : Alert.alert(`${name} não é mais um administrador!`)
            })
            .catch(error => console.error(error))
    };

    //==> CHAMA HANDLE DELETE
    const toDelete = () => {
        setModalVisible(!modalVisible)
        handleDelete(name);
    };

    //==> DELETA PLAYER DO SISTEMA
    const handleDelete = (name: string) => {
        const playerToDelete = allPlayers.filter((item) => {
            if (item.name === name) return item;
        });
        firestore()
            .collection('players')
            .doc(playerToDelete[0].doc_id)
            .delete()
            .then(() => {
                Alert.alert(`${name} não está mais cadastrado na Schiavoni Poker House!`)
                getAllPlayers();
            })
            .catch(error => console.error(error))
    };

    //==> ATUALIZA TODOS OS JOGADORES NO CONTEXTO
    const getAllPlayers = () => {
        const subscribe: any = firestore()
        .collection('players')
        .onSnapshot({
        error: (e) => console.error(e),
        next: (querySnapshot) => {
            const data = querySnapshot.docs.map(doc => {
            return {
                doc_id: doc.id,
            ...doc.data()
            }
            }) as UserDTO[]
            setAllPlayersContext(data);
        },
        }) 
        return () => subscribe();
    };

    return (
        <Container>
            <NameBox>
                <ImageContent>
                    {profile !== 'anonymousURL'
                        ? <ImageProfileAndAvatar source={{uri: profile}}/>
                        : <ImageProfileAndAvatar source={require('@assets/anonymousImage/AnonymousImage.png')}/>
                    }
                </ImageContent>
                {name.length <= 17
                    ? <Name>{name}</Name>
                    : <Name>{name.substring(12, -1)}...</Name>
                }
            </NameBox>
            <ButtonBox>
                <ButtonEditable 
                    title='Admin'
                    type={isAdmin ? 'GREEN-BUTTON' : 'GRAY-BUTTON'}
                    width={50}
                    height={100}
                    onPress={() => handleUpdateAdmin(name, isAdmin)}
                />
                <ButtonEditable 
                    title='Remover'
                    type='RED-BUTTON'
                    width={50}
                    height={100}
                    onPress={() => setModalVisible(!modalVisible)}
                />
            </ButtonBox>
            <ModalComponent
                title={`Remover o Player ${name}`}
                text={`O player ${name} não estará mais cadastrado na Schiavoni Poker House!`}
                modalVisible={modalVisible}
                greenButtonText={`Confirmar`}
                redButtonText='Cancelar'
                onPressGreenButton={toDelete}
                onPressRedButton={() => setModalVisible(!modalVisible)}
            />
        </Container>
    );
}
