import { useContext } from 'react';
import { ChampionContext } from '@contexts/ChampionContext'

export function useChampion() {
    const context = useContext(ChampionContext);
    return context;
};