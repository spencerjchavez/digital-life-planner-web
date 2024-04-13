import styled from 'styled-components';
import GoalProgress from './GoalProgress'

const Container = styled.div`
    height: 100%;
    padding: 20px 50px;
    border-right: 1px #555555 solid;
    border-bottom: 1px #555555 solid;
    background-color: rgb(200, 255, 255);
    
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const DateText = styled.p`
    text-align: right;
`;

export default function Report({ report, reportDispatch }) {    
    const { desires, goalsByDesireId, todosByGoalId, eventsByGoalId, goalsHowMuchAccomplished, goalsHowMuchPlanned } = report;
    
    return <Container>
        {desires.map(desire => {
            return <div key={desire.desireId}>
                <h3>{desire.name}</h3>
                {(goalsByDesireId[desire.desireId] || []).map( goal => {
                    return <GoalProgress key={goal.goalId} goal={goal} progress={(goalsHowMuchAccomplished[goal.goalId] || 0) / (goalsHowMuchPlanned[goal.goalId] || 1)}/>
                })}
                </div>
        })}
    </Container>
}
