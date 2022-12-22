import React, { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { UserDTO } from '@dtos/UserDTO'

//==> TIPAGEM DO CONTEXTO
export type AllPlayersContextDataProps = {
    allPlayers: UserDTO[];
    setAllPlayersContext: (allPlayersData: UserDTO[]) => void;
};

//==> TIPAGEM DO PROVIDER
type AllPlayersContextProviderProps = {
    children: ReactNode;
};

export const AllPlayersContext = createContext<AllPlayersContextDataProps>({} as AllPlayersContextDataProps);

export function AllPlayersContextProvider({ children }: AllPlayersContextProviderProps) {
  
  //==> ESTADO DO CONTEXTO A SER COMPARTILHADO
  const [allPlayers, setAllPlayers] = useState([] as UserDTO[]);

  //==> FUNÇÃO QUE SETA UM NOVO VALOR NO CONTEXTO
  function setAllPlayersContext(allPlayersData: UserDTO[]) {
    setAllPlayers(allPlayersData)
  };
  
  //==> RETORNO DO PROVIDER
  return (
    <AllPlayersContext.Provider value={{ allPlayers, setAllPlayersContext }}>
      {children}
    </AllPlayersContext.Provider>
  );
};