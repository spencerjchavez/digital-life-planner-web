import { createSlice } from '@reduxjs/toolkit';
import {addToIdsByDate, removeFromIdsByDate} from '../utils/idsByDateHelper'

const goalsSlice = createSlice({
    name: 'goals',
    initialState: {
        goalsById: {},
        goalIdsByDate: {},
    }, 
    reducers: {
        addGoals(state, action) {
            const { goals = [] } = action.payload;
            for (const goal of goals) {
                state.goalsById[goal.goalId] = goal;
                addToIdsByDate(state.goalIdsByDate, goal.goalId, goal.startDate, goal.deadlineDate);
            }
        },
        removeGoal(state, action) {
            const { goalId = -1 } = action.payload;
            const goalToDelete = state.goalsById[goalId];
            if ( goalToDelete ) {
                removeFromIdsByDate(state.goalIdsByDate, goalToDelete.goalId, goalToDelete.startDate, goalToDelete.deadlineDate);
                state.goalsById[goalId] = null;
            }
        },
        updateGoal(state, action) {
            const { updatedGoal } = action.payload;
            if ( !updatedGoal ) { return }
            const { goalId } = updatedGoal;
            if (!goalId) { return }
            const oldGoal = state.goalsById[goalId];
            if (!oldGoal) { return }

            //check if new goal changes goalIdsByDate
            if (updatedGoal.startDate !== oldGoal.startDate || updatedGoal.deadlineDate !== oldGoal.deadlineDate) {
                removeFromIdsByDate(state.goalIdsByDate, goalId, oldGoal.startDate, oldGoal.deadlineDate);
                addToIdsByDate(state.goalIdsByDate, goalId, updatedGoal.startDate, updatedGoal.deadlineDate);
            }
            state.goalsById[goalId] = updatedGoal;
        },
    },
});

export const { addGoals, removeGoal, updateGoal } = goalsSlice.actions;
export default goalsSlice;