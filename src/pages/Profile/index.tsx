import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '@components/Header';
import { Photo } from '@components/Photo';
import { useAuth } from '@hooks/useAuth';
import { ButtonEditable } from '@components/ButtonEditable';
import { PsopImage } from '@components/PsopImage';
import PSOPLogo from '@assets/psop/PSOPLogo.svg';
import { UserDTO } from '@dtos/userDTO'
import {
  Container, 
  Content,
  Update,
  Status,
  Progress,
  Transferred
} from './styles';

export function Profile({navigation}: {navigation: any}) {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserDTO>({} as UserDTO);

  const [profileImage, setProfileImage] = useState('');
  const [profileImageURL, setProfileImageURL] = useState('');
  const [progressProfileImage, setProgressProfileImage] = useState('0');
  const [bytesTransferredProfileImage, setBytesTransferredProfileImage] = useState('0 transferido de 0');
  
  const [avatar, setAvatar] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const [progressAvatar, setProgressAvatar] = useState('0');
  const [bytesTransferredAvatar, setBytesTransferredAvatar] = useState('0 transferido de 0');
  
  // RECUPERANDO DADOS DO USUÁRIO NO ASYNC STORAGE
  const dataKey = `@storage_Schiavoni:playerData:${user.email}`;
  const getAsyncStorageData  = async () => {
    try {
      const value = await AsyncStorage.getItem(dataKey)
      if(value !== null) {
        setUserData(JSON.parse(value))
      }
    } catch (e) {
      Alert.alert('Houve um erro na recuperação dos dados do player!');
      console.error(e);
    };
  };

  useEffect(() => {
    getAsyncStorageData()
  },[])

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
        Alert.alert('Imagem de perfil atualizada com sucesso!');
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
        Alert.alert('Avatar atualizado com sucesso!');
      });
      uploadTask.catch(error => console.error(error));
    } else {
      Alert.alert('Selecione um novo avatar!');
    };
  };

  return (
    <Container>
      <Header
        picture={userData.profile}
        title={userData.name}
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