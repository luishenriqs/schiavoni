import React, { useState, useEffect } from 'react';
import { Alert, ImageBackground } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@hooks/useAuth';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { useTheme } from 'styled-components';
import { Header } from '@components/Header';
import { Photo } from '@components/Photo';
import { Button } from '@components/Button';
import { getPlayersNames } from '@services/playersServices';
import { UserDTO, SquadOfPlayersDTO } from '@dtos/UserDTO';
import {
  Container,
  Content,
  ImageContainer,
  ImageWrapper,
  ImageContent,
  LabelContainer,
  Label,
  SelectContainer,
  ImageProfileAndAvatar, 
  Status,
  Progress,
  Transferred
} from './styles';

export function Profile({navigation}: {navigation: any}) {
  const { user, setUserContext } = useAuth();
  const { allPlayers, setAllPlayersContext } = useAllPlayers();
  const theme = useTheme();
 
  const [squad, setSquad] = useState<SquadOfPlayersDTO[]>([] as SquadOfPlayersDTO[]);
  const [selectedName, setSelectedName] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('')
  const [profileImage, setProfileImage] = useState('');
  const [progressProfileImage, setProgressProfileImage] = useState('0');
  const [bytesTransferredProfileImage, setBytesTransferredProfileImage] = useState('0 transferido de 0');

  //==> SELECT STYLE
  const pickerSelectStyles = {
    inputIOS: {
      marginBottom: 10,
      backgroundColor: theme.COLORS.gray_700,
      color: theme.COLORS.white,
    },
    inputAndroid: {
      marginBottom: 10,
      backgroundColor: theme.COLORS.gray_700,
      color: theme.COLORS.white,
    },
  };

  const playersPlaceholder = {
    label: 'Selecione um player:',
    value: null,
  };

  useEffect(() => {
    if (allPlayers.length === 0) {
      getAllPlayers();
    } else {
      loadSquadOfPlayers(allPlayers);
    };
  }, []);

  //==> ATUALIZA TODOS OS JOGADORES NO CONTEXTO SE VAZIO
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
          loadSquadOfPlayers(data);
      },
    }) 
    return () => subscribe();
  };

  //==> PLAYERS POSSÍVEIS PARA O SELECT
  const loadSquadOfPlayers = (allPlayers: UserDTO[]) => {
    const squadOfPlayers = getPlayersNames(allPlayers);
    squadOfPlayers && setSquad(squadOfPlayers);
  };
  
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
      termsOfUse: user.termsOfUse,
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

  //==> BUSCA A IMAGEM DE PERFIL DO JOGADOR SELECIONADO
  useEffect(() => {
    const player = allPlayers.filter(item => {
      if (item.name === selectedName) return item
    })
    setSelectedProfile(player[0].profile)
  }, [selectedName]);

  //==> ATUALIZA NOVA IMAGEM DO PERFIL
  const handleProfileImageUpload = async () => {
    if (profileImage) {
      const fileName = 'Profile_Image_' + selectedName;
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
  
  return (
    <Container>
      <Header
        title={user.name}
        text='Atualize seu perfil'
        headerSize={'small'}
        onPress={() => navigation.openDrawer()}
      />
      <ImageBackground 
        source={require('@assets/wallpapers/blackWallpaper01.jpg')} 
        resizeMode='cover'
        style={{flex: 1, alignItems: 'center', maxWidth: 1200, minWidth: 500}}
      >
        <Content>
          <SelectContainer>
            <LabelContainer style={{ marginTop: 30, marginBottom: 15 }}>
              <Label>Selecione um jogador</Label>
            </LabelContainer>
            <RNPickerSelect
              placeholder={playersPlaceholder}
              onValueChange={(value) => setSelectedName(value)}
              style={pickerSelectStyles}
              items={squad}
              value={selectedName}
            />
          </SelectContainer>
          <ImageContainer>
            <LabelContainer>
              <Label>{selectedName} Profile</Label>
            </LabelContainer>
            <ImageWrapper>
              {selectedProfile
                ? <ImageContent>
                    <ImageProfileAndAvatar source={{uri: selectedProfile}}/>
                  </ImageContent>
                : <ImageContent>
                    <ImageProfileAndAvatar source={require('@assets/anonymousImage/AnonymousImage.png')}/>
                  </ImageContent>
              }
              <ImageContent>
                <Photo 
                  uri={profileImage} 
                  onPress={handlePickProfileImage}
                  text='Selecione a imagem de perfil'
                  size={130}
                />
              </ImageContent>
            </ImageWrapper>
            <Button
              title="Atualize a imagem de perfil"
              onPress={handleProfileImageUpload}
            />
            <Status>
              <Progress>{progressProfileImage}%</Progress>
              <Transferred>'{bytesTransferredProfileImage}'</Transferred>
            </Status>
          </ImageContainer>
        </Content>
      </ImageBackground>
    </Container>
  );
};
