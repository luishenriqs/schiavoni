import React from 'react';
import { Container } from './styles';

export function PlayerImage({url}: any) {

    const profileUrl = url
    const anonymousURL = 'anonymousURL';

    return (
        <Container source={{uri: url ? url : anonymousURL}}/>
    );
}
