import React from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { useAuth } from '@hooks/useAuth';
import { useChampion } from '@hooks/useChampion';
import { Header } from '@components/Header';
import { CardPlayers } from "@components/CardPlayers";
import { LabelPlayers } from "@components/LabelPlayers";
import { Container, Content, Title } from './styles';

export function GameLevel({navigation}: {navigation: any}) {
  const { user } = useAuth();
  const { level } = useChampion();

  const anonymousURL = 'anonymousURL';
  
  return (
    <KeyboardAvoidingView style={{flex: 1}} enabled>
      <Container>
        <Header
          title='Game Level'
          text={`For the Last 3 Seasons`}
          picture={user.profile ? user.profile : anonymousURL}
          headerSize={'small'}
          onPress={() => navigation.openDrawer()}
        />
        <Content>
          <Title>Nível de desempenho</Title>
          <LabelPlayers />
          {level &&
            <FlatList
              data={level as any}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <CardPlayers 
                  name={item.player}
                  power={item.power}
                  avatar={item.avatar}
                />
              )}
            />
          }
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};