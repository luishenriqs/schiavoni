import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useAuth } from '@hooks/useAuth';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { ButtonIcon } from '@components/ButtonIcon';
import ModalComponent from '@components/ModalComponent';
import { 
  Container, 
  Content, 
  Memory, 
  ImageWrapper, 
  Imagem, 
  Legend 
} from './styles';

type IGallery = {
  doc_id: string;
  url: string;
  legend: string;
  MIME: RegExpMatchArray | null
};

export function Gallery({navigation}: {navigation: any}) {
  const { user } = useAuth();
  const [id, setId] = useState('');
  const [path, setPath] = useState('');
  const [gallery, setGallery] = useState<IGallery[]>([] as IGallery[]);
  const [modalVisible, setModalVisible] = useState(false);
  const [lastVisible, setLastVisible] = useState({});
  const [fetchLength, setFetchLength] = useState(0);
  let toRender: IGallery[] = [];

  const anonymousURL = 'anonymousURL';

  useEffect(() => {
    fetchGallery()
  }, []);

  useEffect(() => {
    toRender = [...gallery,...toRender]
  }, [gallery]);toRender

  //==> BUSCA IMAGENS DA GALERIA
  const fetchGallery = async () => {
    const subscribe = firestore()
    .collection('gallery')
    .limit(3)
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as IGallery[]
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1]);
        setFetchLength(data.length)
        setGallery(data)
      },
    }) 
    return () => subscribe()
  };

  //==> VERIFICAÇÃO PARA BUSCAR MAIS
  const loadMore = async () => {
    if (fetchLength === 3) fetchMoreGallery()
  };

  //==> BUSCA MAIS IMAGENS DA GALERIA
  const fetchMoreGallery = async () => {
    const subscribe = firestore()
    .collection('gallery')
    .startAfter(lastVisible)
    .limit(3)
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as IGallery[]
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1]);
        setFetchLength(data.length)
        setGallery([...gallery, ...data])
      },
    }) 
    return () => subscribe()
  };

  //==> SETA PATH E ID E ABRE O MODAL DE DELETE
  const handleDelete = (image: IGallery) => {
    setId(image.doc_id)
    setPath(image.legend + image.MIME)
    setModalVisible(!modalVisible)
  };

  //==> DELETA IMAGEM DA GALERIA
  const deleteImage = async () => {
    // Deleta registro da URL e Legenda
    firestore()
    .collection('gallery')
    .doc(id)
    .delete()

    // Deleta imagem do Storage Firebase
    storage()
    .ref('Gallery/' + path)
    .delete()
    .then(() => {
      Alert.alert('Imagem deletada com sucesso!')
    })
    .catch(error => console.error(error))

    setModalVisible(!modalVisible)
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
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => (
            <Memory>
              <ImageWrapper>
                <Imagem 
                  source={{uri: item.url ? item.url : anonymousURL}}
                  progressiveRenderingEnabled
                />
                <ButtonIcon 
                  onPress={() => handleDelete(item)}
                  style={{
                    flexDirection: 'row-reverse',
                    marginLeft: 20,
                    marginTop: -50
                  }}
                />
              </ImageWrapper>
              <Legend>{item.legend}</Legend>
            </Memory>
          )}
        />
      </Content>
      <ModalComponent
        title='Deletar'
        text='Deseja deletar essa imagem?'
        modalVisible={modalVisible}
        greenButtonText='Deletar'
        redButtonText='Cancelar'
        onPressGreenButton={deleteImage}
        onPressRedButton={() => setModalVisible(!modalVisible)}
      />
    </Container>
  );
};