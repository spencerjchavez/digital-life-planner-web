import styled from 'styled-components';
import { Button } from 'antd';
import GoalProgress from './GoalProgress'
import { useSelector, useDispatch } from 'react-redux';
import { addGoals } from '../../store/goalsSlice';
import { fetchGoalsByDate } from '../../services/Goals';
import { buildReport } from '../../utils/BuildReport';


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
    // create startDate, which will be previous Sunday
    const now = new Date();
    const dayOfWeek = now.getDay;
    let startDate = new Date();
    startDate.setDate(now.getDate() - dayOfWeek);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    let endDate = new Date();
    endDate.setDate(startDate.getDate + 7);

    const desires = useSelector(state => state.desires.desires);
    const goalsById = useSelector(state => state.goals.goalsById);
    const goalIdsByDate = useSelector(state => state.goals.goalIdsByDate);
    const todosById = useSelector(state => state.todos.todosById);
    const todoIdsByDate = useSelector(state => state.todos.todoIdsByDate);
    const eventsById = useSelector(state => state.events.eventsById);
    const eventIdsByDate = useSelector(state => state.events.eventIdsByDate);
    
    let goalIds = [];
    let todoIds = [];
    let eventIds = [];
    let date = new Date(startDate.valueOf());
    while(date < endDate) {
        goalIds.push(...goalIdsByDate[date] ?? []);
        todoIds.push(...todoIdsByDate[date] ?? []);
        eventIds.push(...eventIdsByDate[date] ?? []);
        date.setDate(date.getDate() + 1);
    }
    
    // map goalIds to goals
    let goals = [];
    goals.push(
        ...goalIds.reduce((res, goalId) => {
            const goal = goalsById[goalId];
            if(goal) {
                res.push(goal);
            }
            return res;
        }, [])
    );

    let todosByGoalId = {};
    for(const todoId in todoIds) {
        const todo = todosById[todoId];
        if(todo) {
            const { linkedGoalId } = todo;
            if(linkedGoalId) {
                let todos = todosByGoalId[linkedGoalId] || [];
                todos.push(todo);
                todosByGoalId[linkedGoalId] = todos;
            }
        }
    }

    let eventsByGoalId = {};
    for(const eventId in eventIds) {
        const event = eventsById[eventId];
        if (event) {
            const { linkedGoalId } = event;
            if(linkedGoalId) {
                let events = eventsByGoalId[linkedGoalId] || [];
                events.push(event);
                eventsByGoalId[linkedGoalId] = events;
            }
        }
    }


    const dispatch = useDispatch();
    const addGoal = () => {
        const goals = fetchGoalsByDate(); // temporarily returns dummy data as parameter for addGoals()
        dispatch(
            addGoals({
                goals
            })
        )
        console.log(goalsById);
    }
    
    const report = buildReport(startDate, endDate, desires, goals, todosByGoalId, eventsByGoalId);
    const { goalsByDesireId = {}, goalsHowMuchAccomplished = 0, goalsHowMuchPlanned = 0} = report;
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
