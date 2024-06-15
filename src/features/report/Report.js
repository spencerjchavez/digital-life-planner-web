import styled from 'styled-components';
import { Button } from 'antd';
import GoalProgress from './GoalProgress'
import { useSelector, useDispatch } from 'react-redux';
import { addGoals } from '../../store/goalsSlice';
import { fetchGoalsByDate } from '../../services/Goals';


const Container = styled.div`
    height: 100%;
    padding: 20px 50px;
    border-right: 1px #555555 solid;
    border-bottom: 1px #555555 solid;
    #background-color: rgb(200, 255, 255);
    
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const DateText = styled.p`
    text-align: right;
`;

const AddGoalButton = styled(Button)`
    &:hover {
        background-color: rgb(243, 243, 243);
        cursor: pointer;
    }
`;

export default function Report() {
    const goalsById = useSelector(state => state.goals.goalsById);
    const dispatch = useDispatch();
    const addGoal = () => {
        const goals = fetchGoalsByDate();
        dispatch(
            addGoals({
                goals
            })
        )
        console.log("create goal action: ", addGoals)
        console.log(goalsById);
    }

    const { desires=[], goalsByDesireId={}, todosByGoalId={}, eventsByGoalId={}, goalsHowMuchAccomplished={}, goalsHowMuchPlanned={} } = {};
    
    return <Container>
        {desires.map(desire => {
            return <div key={desire.desireId}>
                <h3>{desire.name}</h3>
                {(goalsByDesireId[desire.desireId] || []).map( goal => {
                    return <GoalProgress key={goal.goalId} goal={goal} progress={(goalsHowMuchAccomplished[goal.goalId] || 0) / (goalsHowMuchPlanned[goal.goalId] || 1)}/>
                })}
            </div>
        })}
        <AddGoalButton type="primary" onClick={addGoal}>
            Add Goal
        </AddGoalButton>
    </Container>
}
