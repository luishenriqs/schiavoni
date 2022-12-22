import React, { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@hooks/useAuth';
import { Header } from '@components/Header';
import { Photo } from '@components/Photo';
import { Button } from '@components/Button';
import { UserDTO } from '@dtos/userDTO'
import {
  Container,
  ImageContainer,
  ImageWrapper,
  ImageContent,
  LabelContainer,
  Label,
  ImageProfileAndAvatar, 
  Status,
  Progress,
  Transferred
} from './styles';

export function Profile({navigation}: {navigation: any}) {
  const { user, anonymous, setUserContext } = useAuth();
 
  const [profileImage, setProfileImage] = useState('');
  const [progressProfileImage, setProgressProfileImage] = useState('0');
  const [bytesTransferredProfileImage, setBytesTransferredProfileImage] = useState('0 transferido de 0');
  
  const [avatar, setAvatar] = useState('');
  const [progressAvatar, setProgressAvatar] = useState('0');
  const [bytesTransferredAvatar, setBytesTransferredAvatar] = useState('0 transferido de 0');
  
  const anonymousURL = anonymous.anonymousURL;

  //==> ATUALIZA PROFILE URL NO FIRESTORE
  const updateProfileImageURL = async (url: string) => {
    url && (
      firestore()
      .collection('players')
      .doc(user.doc_id)
      .update({
        profile: url 
      })
    );
  };

  //==> ATUALIZA AVATAR URL NO FIRESTORE
  const updateAvatarURL = async (url: string) => {
    url && (
      firestore()
      .collection('players')
      .doc(user.doc_id)
      .update({
        avatar: url 
      })
    );
  };

  //==> RECUPERA USER DO FIRESTORE
  const getUserFirestore = async () => {
    const subscribe = firestore()
    .collection('players')
    .where('email', '==', user.email)
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as UserDTO[]
        persistUser(data[0])
      },
    }) 
    return () => subscribe()
  };

  //==> PERSISTE USER NO ASYNC STORAGE E CONTEXTO
  const persistUser = async (user: UserDTO) => {
    const userData = {
      doc_id: user.doc_id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      profile: user.profile,
    };
    setAsyncStorageData(userData);
    setUserContext(userData);
  };
  
  //==> PERSISTE ASYNC STORAGE
  const setAsyncStorageData = async (userData: UserDTO) => {
    const Key = `@storage_Schiavoni:playerData`;
    try {
      await AsyncStorage.setItem(Key, JSON.stringify(userData));
    } catch (e) {
      Alert.alert('Houve um erro ao persistir os dados do player!');
      console.error(e);
    };
  };

  //==> SELECIONA NOVA IMAGEM DO PERFIL
  const handlePickProfileImage = async () => {
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

  //==> SELECIONA NOVO AVATAR
  const handlePickAvatar = async () => {
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

  //==> ATUALIZA NOVA IMAGEM DO PERFIL
  const handleProfileImageUpload = async () => {
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
        await updateProfileImageURL(url);
        await getUserFirestore()
        Alert.alert('Atualização realizada com sucesso!');
      });
      uploadTask.catch(error => console.error(error));
    } else {
      Alert.alert('Selecione uma imagem nova!');
    };
  };
  
  //==> ATUALIZA NOVO AVATAR
  const handleProfileAvatarUpload = async () => {
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
        await updateAvatarURL(url);
        await getUserFirestore()
        Alert.alert('Atualização realizada com sucesso!');
      });
      uploadTask.catch(error => console.error(error));
    } else {
      Alert.alert('Selecione um novo avatar!');
    };
  };

  return (
    <Container>
      <Header
        title={user.name}
        headerSize={'small'}
        onPress={() => navigation.openDrawer()}
      />
      <ImageContainer>
        <LabelContainer>
          <Label>Perfil</Label>
        </LabelContainer>
        <ImageWrapper>
          {user.profile
            ? <ImageContent>
                <ImageProfileAndAvatar source={{uri: user.profile}}/>
              </ImageContent>
            : <ImageContent>
                <ImageProfileAndAvatar source={{uri: anonymousURL}}/>
              </ImageContent>
          }
          <ImageContent>
            <Photo 
              uri={profileImage} 
              onPress={handlePickProfileImage}
              text='Selecione sua imagem de perfil'
              size={130}
            />
          </ImageContent>
        </ImageWrapper>
        <Button
          title="Atualize sua imagem de perfil"
          onPress={handleProfileImageUpload}
        />
        <Status>
          <Progress>{progressProfileImage}%</Progress>
          <Transferred>'{bytesTransferredProfileImage}'</Transferred>
        </Status>
      </ImageContainer>
      
      <ImageContainer>
        <LabelContainer>
          <Label>Avatar</Label>
        </LabelContainer>
        <ImageWrapper>
          {user.avatar
            ? <ImageContent>
                <ImageProfileAndAvatar source={{uri: user.avatar}}/>
              </ImageContent>
            : <ImageContent>
                <ImageProfileAndAvatar source={{uri: anonymousURL}}/>
              </ImageContent>
          }
          <ImageContent>
            <Photo 
              uri={avatar} 
              onPress={handlePickAvatar}
              text='Selecione seu novo avatar'
              size={130}
            />
          </ImageContent>
        </ImageWrapper>
        <Button
          title="Atualize seu avatar"
          onPress={handleProfileAvatarUpload}
        />
        <Status>
          <Progress>{progressAvatar}%</Progress>
          <Transferred>'{bytesTransferredAvatar}'</Transferred>
        </Status>
      </ImageContainer>
    </Container>
  );
};
