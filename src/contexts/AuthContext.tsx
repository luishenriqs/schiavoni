import React, { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { UserDTO } from '@dtos/userDTO'

export type AuthContextDataProps = {
    user: UserDTO;
    setUserContext: (userData: UserDTO) => void;
};

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

  function setUserContext(userData: UserDTO) {
    setUser(userData)
  }
  
  return (
    <AuthContext.Provider value={{ user, setUserContext }}>
        {children}
      </AuthContext.Provider>
  )
};