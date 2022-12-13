import React, { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { UserDTO } from '@dtos/userDTO'

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (
      id: string,
      name: string,
      email: string,
      avatar: string,
      profile: string
    ) => void;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    avatar: '',
    profile: ''
  })

  function signIn(
    id: string,
    name: string,
    email: string,
    avatar: string,
    profile: string
    ) {
    setUser({
      id,
      name,
      email,
      avatar,
      profile,
    })
  }
  
  return (
    <AuthContext.Provider value={{ user, signIn }}>
        {children}
      </AuthContext.Provider>
  )
};