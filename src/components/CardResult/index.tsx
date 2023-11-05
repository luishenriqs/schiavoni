import React, { useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import { useChampion } from '@hooks/useChampion';
import { ButtonIcon } from '@components/ButtonIcon';
import { ModalGameUpdate } from '@components/ModalGameUpdate';
import { GameDTO } from '@dtos/GameDTO';
import {
    Container,
    PositionBox,
    Position,
    NameBox,
    Name,
    Empty
 } from './styles';

interface IProps {
    position: number;
    name: string;
    gameNumber: number;
}

export function CardResult({
    position,
    name,
    gameNumber
}: IProps) {
    const { user } = useAuth();
    const { currentSeason, gameResult, setGameResultContext } = useChampion();

    const [gameToUpdate, setGameToUpdate] = useState<GameDTO[]>({} as GameDTO[]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPlayer, setNewPlayer] = useState('');
    const [newPosition, setNewPosition] = useState(0);

    //==> SETA GAME A SER ATUALIZADO E ABRE MODAL
    const handleUpdate = (
        position: number, 
        gameNumber: number
    ) => {
        const game = gameResult.filter((item) => {
            if (item.game === gameNumber && item.position === position) return item;
        });
        setGameToUpdate(game);
        setModalVisible(!modalVisible);
    };

    //==> ATUALIZA RESULTADO DA ETAPA NO FIREBASE
    const updateGame = (newPlayer: string, newPosition: number) => {
        if (newPlayer === '' || newPosition === 0) {
            Alert.alert('Selecione um player e uma posição!')
        } else {
            let pointsUpdated = 0;
            switch (Number(newPosition)) {
              case 1:
                pointsUpdated = 25;
                break;
              case 2:
                pointsUpdated = 18;
                break;
              case 3:
                pointsUpdated = 15;
                break;
              case 4:
                pointsUpdated = 12;
                break;
              case 5:
                pointsUpdated = 10;
                break;
              case 6:
                pointsUpdated = 8;
                break;
              case 7:
                pointsUpdated = 6;
                break;
              case 8:
                pointsUpdated = 4;
                break;
              case 9:
                pointsUpdated = 2;
                break;
              case 10:
                pointsUpdated = 1;
                break;
              case 11:
                pointsUpdated = 0;
                break;
              case 12:
                pointsUpdated = 0;
                break;
            };

            firestore()
                .collection('game_result')
                .doc(gameToUpdate[0].doc_id)
                .update({
                    name: newPlayer,
                    position: newPosition,
                    points: pointsUpdated
                })
                .then(() => {
                    getGamesResultsFirestore(currentSeason.season);
                    Alert.alert('Atualização feita com sucesso!')
                    setModalVisible(!modalVisible);
                })
                .catch(error => console.error(error))
        }
    };

    //==> RECUPERA JOGOS DA ATUAL TEMPORADA NO FIRESTORE
    //==> PERSISTE GAME RESULTS NO CONTEXTO
    const getGamesResultsFirestore = (
        currentSeason: number
    ) => {
        const subscribe = firestore()
        .collection('game_result')
        .where('season', '==', currentSeason)
        .onSnapshot({
            error: (e) => console.error(e),
            next: (querySnapshot) => {
                const data = querySnapshot.docs.map(doc => {
                return {
                    doc_id: doc.id,
                ...doc.data()
                }
                }) as GameDTO[]
                data && setGameResultContext(data);
            },
        }) 
        return () => subscribe();
    };

    return (
        <>
            <Container>
                <PositionBox>
                    <Position>{position}</Position>
                </PositionBox>
                <NameBox>
                    <Name>{name}</Name>
                    {user.isAdmin
                        ?
                            <ButtonIcon 
                                onPress={() => handleUpdate(position, gameNumber)}
                                name={'account-edit-outline'}
                                size={20}
                                style={{ marginRight: 15 }}
                            />
                        :   <Empty/>
                    }
                </NameBox>
            </Container>
            <ModalGameUpdate
                title='Atualizar'
                text={`Deseja atualizar o resultado: ${name} posição ${position}?`}
                text2={`Selecione o novo resultado:`}
                modalVisible={modalVisible}
                greenButtonText='Atualizar'
                redButtonText='Cancelar'
                onPressGreenButton={() => updateGame(newPlayer, newPosition)}
                onPressRedButton={() => setModalVisible(!modalVisible)}
                callBackPlayer={(newPlayer: string) =>  setNewPlayer(newPlayer)}
                callBackPosition={(newPosition: number) =>  setNewPosition(newPosition)}
            />
        </>
    );
};
