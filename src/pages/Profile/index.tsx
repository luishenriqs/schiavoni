import React, { useState } from 'react';
import { Alert } from 'react-native';
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
  Content,
  Update,
  Status,
  Progress,
  Transferred
} from './styles';

export function Profile({navigation}: {navigation: any}) {
  const [profileImage, setProfileImage] = useState('');
  const [profileImageURL, setProfileImageURL] = useState('');
  const [progressProfileImage, setProgressProfileImage] = useState('0');
  const [bytesTransferredProfileImage, setBytesTransferredProfileImage] = useState('123 transferred from 521');
  
  const [avatar, setAvatar] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const [progressAvatar, setProgressAvatar] = useState('0');
  const [bytesTransferredAvatar, setBytesTransferredAvatar] = useState('123 transferred from 521');
  

  const { user } = useAuth();
  console.log('USER NO PROFILE ', user)

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
      Alert.alert('Imagem de perfil atualizada com sucesso!');
    });
    uploadTask.catch(error => console.error(error));
  };
  
  async function handleProfileAvatarUpload() {
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
      Alert.alert('Avatar atualizado com sucesso!');
    });
    uploadTask.catch(error => console.error(error));
  };

  return (
    <Container>
      <Header
        picture='uri do player'
        title={user.name}
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage
        svg={PSOPLogo}
      />
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
    </Container>
  );
};