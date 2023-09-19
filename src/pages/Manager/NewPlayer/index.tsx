import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Alert, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import ModalComponent from '@components/ModalComponent';
import { UserDTO } from '@dtos/UserDTO';
import {
  Container, 
  Content,
  Title
} from './styles';

export function NewPlayer({navigation}: {navigation: any}) {
  const { setAllPlayersContext } = useAllPlayers();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  //==> VERIFICAÇÃO DE CAMPOS OBRIGATÓRIOS
  const handleCreateUserAccount = () => {
    if (!name || !email) {
      Alert.alert('Informe o nome e email!')
    } else {
      createNewPlayerAuthentication();
    }
  };

  //==> CRIA NOVO USUÁRIO NO FIREBASE/AUTH
  const createNewPlayerAuthentication = () => {
    const password = '123456';

    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      createNewPlayerFirestore();
    })
    .catch(erro => {
      console.error(erro.code)
      if (erro.code === 'auth/email-already-in-use') {
        setModalVisible(!modalVisible);
      };

      if (erro.code === 'auth/invalid-email') {
        return Alert.alert('Email inválido!');
      };

      if (erro.code === 'auth/weak-password') {
        return Alert.alert('Senha deve ter no mínimo 6 dígitos');
      };
    });
  };

  //==> CRIA NOVO USUÁRIO NO FIRESTORE
  const createNewPlayerFirestore = () => {
    firestore()
    .collection('players')
    .doc(email)
    .set({
      name,
      email,
      isAdmin: false,
      termsOfUse: false,
      avatar: '',
      profile: ''
    })
    .then(() => {
      setModalVisible(!modalVisible);
      Alert.alert('Novo player criado com sucesso!');
      setName('');
      setEmail('');
      getAllPlayers();
    })
    .catch((error) => console.error(error))
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
    <ImageBackground 
      source={require('@assets/wallpapers/blackWallpaper02.jpg')} 
      resizeMode='cover'
      style={{flex: 1, alignItems: 'center'}}
    >
      <Container>
        <Header
          title='New Player'
          text='Cadastre um novo jogador'
          headerSize={'big'}
          onPress={() => navigation.openDrawer()}
        />
          <PsopImage />
          <Content>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              style={{ flex: 1 }}
            >
              <Title>Registre um novo jogador</Title>
              <Input 
                placeholder='Nome'
                autoCorrect={false}
                onChangeText={(value) => setName(value)}
                value={name}
              />
              <Input 
                placeholder='E-mail'
                keyboardType='email-address'
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={(value) => setEmail(value)}
                value={email}
              />
              <Button 
                title='Enviar'
                onPress={handleCreateUserAccount}
              />
            </KeyboardAvoidingView>
          </Content>

          <ModalComponent
            title={`Email Existente!`}
            text={`O email ${email} já foi usado uma vez em nosso sistema, deseja prosseguir com um recadastro?`}
            modalVisible={modalVisible}
            greenButtonText={`Cadastrar Novamente`}
            redButtonText='Cancelar'
            onPressGreenButton={createNewPlayerFirestore}
            onPressRedButton={() => setModalVisible(!modalVisible)}
          />
      </Container>
    </ImageBackground>
  );
};