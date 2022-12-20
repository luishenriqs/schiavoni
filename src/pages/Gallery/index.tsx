import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useAuth } from '@hooks/useAuth';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { ButtonIcon } from '@components/ButtonIcon';
import { 
  Container, 
  Content, 
  Memory, 
  Imagem, 
  LegendWrapper, 
  Legend, 
  ModalContainer,
  ModalView,
  ModalText,
  ModalButtonContainer,
  ModalGreenButton,
  ModalRedButton,
  ModalButtonText 
} from './styles';

type IGallery = {
  doc_id: string;
  url: string;
  legend: string;
  MIME: RegExpMatchArray | null
};

export function Gallery({navigation}: {navigation: any}) {
  const { user, anonymous } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [path, setPath] = useState('');
  const [gallery, setGallery] = useState([] as IGallery[]);

  const anonymousURL = anonymous.anonymousURL;

  /* CORRIGIR EXIBIÇÃO DA GALERIA  */
  /* CORRIGIR EXIBIÇÃO DA GALERIA  */
  /* CORRIGIR EXIBIÇÃO DA GALERIA  */
  /* CORRIGIR EXIBIÇÃO DA GALERIA  */
  /* CORRIGIR EXIBIÇÃO DA GALERIA  */

  useEffect(() => {
    fetchGallery()
  }, []);

  //==> RECUPERA IMAGENS DA GALERIA
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
          initialNumToRender={2}
          renderItem={({ item }) => (
            <Memory>
              <LegendWrapper>
                <Imagem 
                  source={{uri: item.url ? item.url : anonymousURL}} 
                />
                <ButtonIcon 
                  onPress={() => handleDelete(item)}
                  style={{
                    flexDirection: 'row-reverse',
                    marginLeft: 50,
                    marginTop: -50
                  }}
                />
              </LegendWrapper>
              <Legend>{item.legend}</Legend>
            </Memory>
          )}
        />
      </Content>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <ModalContainer>
          <ModalView>
            <ModalText>Deseja deletar essa imagem?</ModalText>
            <ModalButtonContainer>            
              <ModalGreenButton
                onPress={deleteImage}
              >
                <ModalButtonText>Deletar</ModalButtonText>
              </ModalGreenButton>
              <ModalRedButton
                onPress={() => setModalVisible(!modalVisible)}
              >
                <ModalButtonText>Cancelar</ModalButtonText>
              </ModalRedButton>
            </ModalButtonContainer>
          </ModalView>
        </ModalContainer>
      </Modal>
    </Container>
  );
};