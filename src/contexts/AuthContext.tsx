import React, { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { UserDTO } from '@dtos/userDTO'

export type AuthContextDataProps = {
    user: UserDTO;
    setUserContext: (userData: UserDTO) => void;
    anonymous: IUrl;
    setAnonymousContext: (url: IUrl) => void;
};

type IUrl = {
  anonymousURL: string;
}

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({
    doc_id: '',
    id: '',
    name: '',
    email: '',
    isAdmin: false,
    avatar: '',
    profile: ''
  })

  const [anonymous, setAnonymous] = useState({
    anonymousURL: 'https://firebasestorage.googleapis.com/v0/b/schiavoni-8efc7.appspot.com/o/ProfileImage%2FProfile_Image_Anonymous%20Player.jpeg?alt=media&token=f3f5e53d-372a-43b4-a0b7-7a7db5462576'
  })

  function setUserContext(userData: UserDTO) {
    setUser(userData)
  }

  function setAnonymousContext(url: IUrl) {
    setAnonymous(url)
  }
  
  return (
    <AuthContext.Provider value={{ user, setUserContext, anonymous, setAnonymousContext }}>
        {children}
      </AuthContext.Provider>
  )
};