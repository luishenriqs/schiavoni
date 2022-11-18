import React, { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Header } from '@components/Header';
import { Photo } from '@components/Photo';
import { ButtonEditable } from '@components/ButtonEditable';
import { PsopImage } from '@components/PsopImage';
import PSOPLogo from '@assets/psop/PSOPLogo.svg';
import {
  Container, 
  Content,
  Update,
  Title,
  Status,
  Progress,
  Transferred
} from './styles';

export function Profile({navigation}: {navigation: any}) {
  const [image, setImage] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bytesTransferred, setBytesTransferred] = useState('123 transferred from 521');
  const [progress, setProgress] = useState('0');

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
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

      if (!result.cancelled) {
        setAvatar(result.uri);
      }
    }
  };

  // async function handleUpload() {
  //   const fileName = new Date().getTime();
  //   const MIME = image.match(/\.(?:.(?!\.))+$/);
  //   const reference = storage().ref(`/Images/${fileName}${MIME}`);

  //   const uploadTask = reference.putFile(image);

  //   uploadTask.on('state_changed', taskSnapshot => {
  //     const percentage = ((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100).toFixed(0);
  //     setProgress(percentage);
      
  //     setBytesTransferred(`${taskSnapshot.bytesTransferred} transferido de ${taskSnapshot.totalBytes}`);
  //   });
  //   uploadTask.then(async () => {
  //     const url = await reference.getDownloadURL();
  //     setImageURL(url);
  //     Alert.alert('Upload sent successfully');
  //   });
  //   uploadTask.catch(error => console.error(error));
  // };

  return (
    <Container>
      <Header
        title='Profile'
        text='Diego Souza'
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage
        svg={PSOPLogo}
      />
      <Content>
        <Update>
          <Photo 
            uri={image} 
            onPress={handlePickImage}
            text='Select a new profile picture'
            size={120}
          />
          <ButtonEditable
            title="Update your profile picture"
            onPress={() => console.log('handleUpload')}
            width={120}
            length={120}
          />
        </Update>
        <Status>
          <Progress>{progress}%</Progress>
          <Transferred>'{bytesTransferred}'</Transferred>
        </Status>
        <Update>
          <Photo 
            uri={avatar} 
            onPress={handlePickAvatar} 
            text='Select a new avatar'
            size={120}
          />
          <ButtonEditable
            title="Update your avatar"
            onPress={() => console.log('handleUpload')}
            width={120}
            length={120}
          />
        </Update>
        <Status>
          <Progress>{progress}%</Progress>
          <Transferred>'{bytesTransferred}'</Transferred>
        </Status>
      </Content>
    </Container>
  );
};