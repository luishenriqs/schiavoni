import React, { useEffect, useState } from 'react';
import { FlatList } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { Container, Content, Memory, Imagem, Legend } from './styles';

type IGallery = {
  doc_id: string;
  url: string;
  legend: string;
};

export function Gallery({navigation}: {navigation: any}) {
  const { user, anonymous } = useAuth();
  const [gallery, setGallery] = useState([] as IGallery[])

  const anonymousURL = anonymous.anonymousURL;

  useEffect(() => {
    fetchGallery()
  }, []);

  //==> RECUPERA DADOS DA GALERIA
  const fetchGallery = async () => {
    const subscribe = firestore()
    .collection('gallery')
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as IGallery[]
        setGallery(data)
      },
    }) 
    return () => subscribe()
  };

  return (
    <Container>
      <Header
        title='Gallery'
        text='Great Moments'
        picture={user.profile ? user.profile : anonymousURL}
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage />
      <Content>
        <FlatList
          data={gallery}
          keyExtractor={item => item.doc_id}
          initialNumToRender={2}
          renderItem={({ item }) => (
            <Memory>
              <Imagem 
                source={{uri: item.url ? item.url : anonymousURL}} 
              />
              <Legend>{item.legend}</Legend>
            </Memory>
          )}
        />
      </Content>
    </Container>
  );
};