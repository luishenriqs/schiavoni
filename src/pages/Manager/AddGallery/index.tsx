import React, { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Header } from '@components/Header';
import { Photo } from '@components/Photo';
import { Button } from '@components/Button';
import { PsopImage } from '@components/PsopImage';
import PSOPLogo from '@assets/psop/PSOPLogo.svg';
import {
  Container, 
  Content, 
  Progress,
  Transferred
} from './styles';

export function AddGallery({navigation}: {navigation: any}) {
  const [image, setImage] = useState('');
  const [bytesTransferred, setBytesTransferred] = useState('0 transferido de 0');
  const [progress, setProgress] = useState('0');

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
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
      
  //     setBytesTransferred(`${taskSnapshot.bytesTransferred} transferred from ${taskSnapshot.totalBytes}`);
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
        title='Add to Gallery'
        text='Great Moments'
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage
        svg={PSOPLogo}
      />
      <Content>
        <Photo 
          uri={image} 
          onPress={handlePickImage}
        />
        <Button
          title="Upload"
          onPress={() => console.log('handleUpload')}
        />
        <Progress>{progress}%</Progress>
        <Transferred>'{bytesTransferred}'</Transferred>
      </Content>
    </Container>
  );
};