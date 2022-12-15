import React, { useEffect, useState } from 'react';
import { Alert, Modal } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage'
import { Header } from '@components/Header';
import { Photo } from '@components/Photo';
import { useAuth } from '@hooks/useAuth';
import { ButtonEditable } from '@components/ButtonEditable';
import { PsopImage } from '@components/PsopImage';
import PSOPLogo from '@assets/psop/PSOPLogo.svg';
import {
  Container,
  ImageContainer,
  Avatar, 
  Content,
  Update,
  Status,
  Progress,
  Transferred,
  ModalContainer,
  ModalView,
  ModalText,
  ModalButtonContainer,
  ModalButtonLogin,
  ModalButtonCancel,
  ModalButtonText
} from './styles';

export function Profile({navigation}: {navigation: any}) {
  const { user } = useAuth();

  const [profileImage, setProfileImage] = useState('');
  const [profileImageURL, setProfileImageURL] = useState('');
  const [progressProfileImage, setProgressProfileImage] = useState('0');
  const [bytesTransferredProfileImage, setBytesTransferredProfileImage] = useState('0 transferido de 0');
  
  const [avatar, setAvatar] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const [progressAvatar, setProgressAvatar] = useState('0');
  const [bytesTransferredAvatar, setBytesTransferredAvatar] = useState('0 transferido de 0');
  
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    updateURLs()
  },[profileImageURL, avatarURL])

  function updateURLs() {
    profileImageURL && (
      firestore()
      .collection('players')
      .doc(user.doc_id)
      .update({
        profile: profileImageURL 
      })
    );

    avatarURL && (
      firestore()
      .collection('players')
      .doc(user.doc_id)
      .update({
        avatar: avatarURL 
      })
    );
  };

  async function handlePickProfileImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    }
  }; 

  async function handlePickAvatar() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      }
    }
  };

  async function handleProfileImageUpload() {
    if (profileImage) {
      const fileName = 'Profile_Image_' + user.name;
      const MIME = profileImage.match(/\.(?:.(?!\.))+$/);
      const reference = storage().ref(`/ProfileImage/${fileName}${MIME}`);
  
      const uploadTask = reference.putFile(profileImage);
  
      uploadTask.on('state_changed', taskSnapshot => {
        const percentage = ((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100).toFixed(0);
        setProgressProfileImage(percentage);
        
        setBytesTransferredProfileImage(`${taskSnapshot.bytesTransferred} transferido de ${taskSnapshot.totalBytes}`);
      });
      uploadTask.then(async () => {
        const url = await reference.getDownloadURL();
        setProfileImageURL(url);
        setModalVisible(true);
      });
      uploadTask.catch(error => console.error(error));
    } else {
      Alert.alert('Selecione uma imagem nova!');
    };
  };
  
  async function handleProfileAvatarUpload() {
    if(avatar) {
      const fileName = 'Avatar_' + user.name;
      const MIME = avatar.match(/\.(?:.(?!\.))+$/);
      const reference = storage().ref(`/Avatar/${fileName}${MIME}`);
  
      const uploadTask = reference.putFile(avatar);
  
      uploadTask.on('state_changed', taskSnapshot => {
        const percentage = ((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100).toFixed(0);
        setProgressAvatar(percentage);
        
        setBytesTransferredAvatar(`${taskSnapshot.bytesTransferred} transferido de ${taskSnapshot.totalBytes}`);
      });
      uploadTask.then(async () => {
        const url = await reference.getDownloadURL();
        setAvatarURL(url);
        setModalVisible(true);
      });
      uploadTask.catch(error => console.error(error));
    } else {
      Alert.alert('Selecione um novo avatar!');
    };
  };

  function handleNewLogin() {
    auth().signOut();
    setModalVisible(!modalVisible)
  };

  return (
    <Container>
      <Header
        title={user.name}
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <ImageContainer>
        <Avatar source={{uri: user.profile}}/>
        <Avatar source={{uri: user.avatar}}/>
      </ImageContainer>
      <Content>
        <Update>
          <Photo 
            uri={profileImage} 
            onPress={handlePickProfileImage}
            text='Selecione sua imagem de perfil'
            size={120}
          />
          <ButtonEditable
            title="Atualize sua imagem de perfil"
            onPress={handleProfileImageUpload}
            width={120}
            length={120}
          />
        </Update>
        <Status>
          <Progress>{progressProfileImage}%</Progress>
          <Transferred>'{bytesTransferredProfileImage}'</Transferred>
        </Status>

        <Update>
          <Photo 
            uri={avatar} 
            onPress={handlePickAvatar} 
            text='Selecione o seu avatar'
            size={120}
          />
          <ButtonEditable
            title="Atualize seu avatar"
            onPress={handleProfileAvatarUpload}
            width={120}
            length={120}
          />
        </Update>
        <Status>
          <Progress>{progressAvatar}%</Progress>
          <Transferred>'{bytesTransferredAvatar}'</Transferred>
        </Status>
      </Content>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <ModalContainer>
          <ModalView>
            <ModalText>Sucesso!</ModalText>
            <ModalText>Faça um novo login para carregar a alteração!</ModalText>
            <ModalButtonContainer>            
              <ModalButtonLogin
                onPress={handleNewLogin}
              >
                <ModalButtonText>Fazer login</ModalButtonText>
              </ModalButtonLogin>
              <ModalButtonCancel
                onPress={() => setModalVisible(!modalVisible)}
              >
                <ModalButtonText>Cancelar</ModalButtonText>
              </ModalButtonCancel>
            </ModalButtonContainer>
          </ModalView>
        </ModalContainer>
      </Modal>
    </Container>
  );
};
