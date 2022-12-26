import React, { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { ChampionDTO } from '@dtos/ChampionDTO';
import { RankingDTO } from '@dtos/RankingDTO';

//==> TIPAGEM DO CONTEXTO
export type ChampionContextDataProps = {
    champion: ChampionDTO;
    setChampionContext: (championData: ChampionDTO) => void;
    ranking: RankingDTO;
    setRankingContext: (rankingData: RankingDTO) => void;
};

//==> TIPAGEM DO PROVIDER
type ChampionContextProviderProps = {
    children: ReactNode;
};

export const ChampionContext = createContext<ChampionContextDataProps>({} as ChampionContextDataProps);

export function ChampionContextProvider({ children }: ChampionContextProviderProps) {
  
  //==> ESTADO DO CONTEXTO A SER COMPARTILHADO
  const [champion, setChampion] = useState<ChampionDTO>({} as ChampionDTO);

  //==> ESTADO DO CONTEXTO A SER COMPARTILHADO
  const [ranking, setRanking] = useState<RankingDTO>({} as RankingDTO)

  //==> FUNÇÃO QUE SETA UM NOVO VALOR NO CONTEXTO
  function setChampionContext(championData: ChampionDTO) {
    setChampion(championData)
  };

  //==> FUNÇÃO QUE SETA UM NOVO VALOR NO CONTEXTO
  function setRankingContext(rankingData: RankingDTO) {
    setRanking(rankingData)
  };
  
  //==> RETORNO DO PROVIDER
  return (
    <ChampionContext.Provider value={{ 
      champion, 
      setChampionContext, 
      ranking, 
      setRankingContext 
    }}>
      {children}
    </ChampionContext.Provider>
  );
};