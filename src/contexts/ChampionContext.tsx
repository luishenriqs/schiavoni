import React, { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { ChampionDTO } from '@dtos/ChampionDTO';
import { RankingDTO, LevelDTO } from '@dtos/RankingDTO';
import { CurrentSeasonDTO } from '@dtos/CurrentSeasonDTO';

//==> TIPAGEM DO CONTEXTO
export type ChampionContextDataProps = {
    champion: ChampionDTO;
    setChampionContext: (championData: ChampionDTO) => void;
    ranking: RankingDTO;
    setRankingContext: (rankingData: RankingDTO) => void;
    level: LevelDTO;
    setLevelContext: (levelData: LevelDTO) => void;
    currentSeason: CurrentSeasonDTO;
    setCurrentSeasonContext: (currentSeasonData: CurrentSeasonDTO) => void;
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
  const [ranking, setRanking] = useState<RankingDTO>({} as RankingDTO);

  //==> ESTADO DO CONTEXTO A SER COMPARTILHADO
  const [level, setLevel] = useState<LevelDTO>({} as LevelDTO);

  //==> ESTADO DO CONTEXTO A SER COMPARTILHADO
  const [currentSeason, setCurrentSeason] = useState<CurrentSeasonDTO>({} as CurrentSeasonDTO);

  //==> FUNÇÃO QUE SETA UM NOVO VALOR NO CONTEXTO
  function setChampionContext(championData: ChampionDTO) {
    setChampion(championData);
  };

  //==> FUNÇÃO QUE SETA UM NOVO VALOR NO CONTEXTO
  function setRankingContext(rankingData: RankingDTO) {
    setRanking(rankingData);
  };

  //==> FUNÇÃO QUE SETA UM NOVO VALOR NO CONTEXTO
  function setLevelContext(levelData: LevelDTO) {
    setLevel(levelData);
  };

  //==> FUNÇÃO QUE SETA UM NOVO VALOR NO CONTEXTO
  function setCurrentSeasonContext(currentSeasonData: CurrentSeasonDTO) {
    setCurrentSeason(currentSeasonData);
  };
  
  //==> RETORNO DO PROVIDER
  return (
    <ChampionContext.Provider value={{ 
      champion, 
      setChampionContext, 
      ranking, 
      setRankingContext,
      level,
      setLevelContext,
      currentSeason,
      setCurrentSeasonContext
    }}>
      {children}
    </ChampionContext.Provider>
  );
};