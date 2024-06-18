import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    margin: 15px;
    gap: 15px;
`;

export default function GoalProgress({ goal, progress}) {
    return <Container>
        <p><b>{progress}%</b></p> 
        <p>{goal.name}</p>
    </Container>;
}