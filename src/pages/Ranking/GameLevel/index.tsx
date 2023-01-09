import React from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { useAuth } from '@hooks/useAuth';
import { useChampion } from '@hooks/useChampion';
import { Header } from '@components/Header';
import { CardLevel } from "@components/CardLevel";
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
          text={`Últimas 3 Temporadas`}
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
                <CardLevel 
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