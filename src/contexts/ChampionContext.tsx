import React, { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { ChampionDTO } from '@dtos/ChampionDTO'

//==> TIPAGEM DO CONTEXTO
export type ChampionContextDataProps = {
    champion: ChampionDTO;
    setChampionContext: (championData: ChampionDTO) => void;
};

//==> TIPAGEM DO PROVIDER
type ChampionContextProviderProps = {
    children: ReactNode;
};

export const ChampionContext = createContext<ChampionContextDataProps>({} as ChampionContextDataProps);

export function ChampionContextProvider({ children }: ChampionContextProviderProps) {
  
  //==> ESTADO DO CONTEXTO A SER COMPARTILHADO
  const [champion, setChampion] = useState({
    avatar: '',
    doc_id: '',
    email: '',
    id: '',
    name: '',
    profile: '',
    season: 0,
  });

  //==> FUNÇÃO QUE SETA UM NOVO VALOR NO CONTEXTO
  function setChampionContext(championData: ChampionDTO) {
    setChampion(championData)
  };
  
  //==> RETORNO DO PROVIDER
  return (
    <ChampionContext.Provider value={{ champion, setChampionContext }}>
      {children}
    </ChampionContext.Provider>
  );
};