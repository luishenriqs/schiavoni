import { useContext } from 'react';
import { AllPlayersContext } from '@contexts/allPlayersContext'

export function useAllPlayers() {
    const context = useContext(AllPlayersContext);
    return context;
};