import React, { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Header } from '@components/Header';
import { Photo } from '@components/Photo';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { PsopImage } from '@components/PsopImage';
import {
  Container, 
  Content, 
  Progress,
  Transferred
} from './styles';

export function AddGallery({navigation}: {navigation: any}) {
  const [legend, setLegend] = useState<string>('');
  const [image, setImage] = useState('');
  const [bytesTransferred, setBytesTransferred] = useState('0 transferido de 0');
  const [progress, setProgress] = useState('0');

  //==> SELECIONA NOVA IMAGEM DA GALERIA
  const handlePickImage = async () => {
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

  //==> CHAMA UPLOAD APÓS VERIFICAÇÕES
  const handleAddGallery = () => {
    !legend && Alert.alert('Defina uma legenda!');
    !image && Alert.alert('Selecione uma imagem!');
    if(legend && image) handleImageGalleryUpload();
  };

  //==> UPLOAD DE NOVA IMAGEM DA GALERIA
  const handleImageGalleryUpload = async () => {
    const fileName = legend;
    const MIME = image.match(/\.(?:.(?!\.))+$/);
    const reference = storage().ref(`/Gallery/${fileName}${MIME}`);

    const uploadTask = reference.putFile(image);

    uploadTask.on('state_changed', taskSnapshot => {
      const percentage = ((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100).toFixed(0);
      setProgress(percentage);
      
      setBytesTransferred(`${taskSnapshot.bytesTransferred} transferred from ${taskSnapshot.totalBytes}`);
    });
    uploadTask.then(async () => {
      const url = await reference.getDownloadURL();
      createNewImageGallery(url, legend, MIME);
      Alert.alert('Upload concluído com sucesso!');
    });
    uploadTask.catch(error => console.error(error));
  };

  //==> REGISTRA URL E LEGENDA DE NOVA IMAGEM DA GALERIA
  const createNewImageGallery = (
    url: string,
    legend: string,
    MIME: RegExpMatchArray | null
  ) => {
    firestore()
    .collection('gallery')
    .doc(legend + '-' + new Date().getFullYear())
    .set({
      url,
      legend,
      MIME
    })
    .catch((error) => console.error(error))
  };

  return (
    <Container>
      <Header
        title='Add to Gallery'
        text='Grandes Momentos'
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage />
      <Content>
        <Photo 
          uri={image}
          text='Selecione uma nova imagem para a galeria'
          onPress={handlePickImage}
        />
        <Input 
          placeholder='Legenda'
          autoCorrect={false}
          autoCapitalize={'words'}
          onChangeText={(value: string) => setLegend(value)}
        />
        <Button
          title="Upload"
          onPress={handleAddGallery}
        />
        <Progress>{progress}%</Progress>
        <Transferred>'{bytesTransferred}'</Transferred>
      </Content>
    </Container>
  );
};