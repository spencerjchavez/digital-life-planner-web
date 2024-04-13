import { useState, useReducer } from 'react';
import styled from 'styled-components';
import reducer from './features/Reducer';
import Report from './features/report/Report';
import Todos from './features/todos/Todos';
import Calendar from './features/calendar/Calendar';
import fetchReport from './services/Report';
import InfoBar from './features/InfoBar';

const HContainer = styled.div`
    display: flex;
    flex-grow: ${props => props.$flexGrow};
    flex-basis: 0px;
`;

const VContainer = styled(HContainer)`
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;


export default function RootContainer() {
    const report = fetchReport();
    
    const [state, dispatch] = useReducer(reducer, {});

    /* 
        States to keep track of: desires, goals, todos, events
        Should I have a single reducer that keeps track of all 4?
    */



    return <Container>
        <InfoBar />
        <HContainer $flexGrow={1}>
            <VContainer $flexGrow={1}>
                <VContainer $flexGrow={0}>
                    <Report report={report} />
                </VContainer>
                <VContainer $flexGrow={1}>
                    <Todos todos={[]}/>
                </VContainer>
            </VContainer>
            <VContainer $flexGrow={2} >
                <Calendar />
            </VContainer>
        </HContainer>
    </Container>
}
