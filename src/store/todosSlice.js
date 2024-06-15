import { createSlice } from '@reduxjs/toolkit';
import {addToIdsByDate, removeFromIdsByDate} from '../utils/idsByDateHelper'

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todosById: {},
        todoIdsByDate: {},
    }, 
    reducers: {
        addTodos(state, action) {
            const { todos = [] } = action.payload;
            for (const todo in todos) {
                const { todoId } = todo;
                if ( todoId ) {
                    state.todosById[todoId] = todo;
                    addToIdsByDate(state.todoIdsByDate, todoId, todo.startDate, todo.deadlineDate);
                }
            }
        },
        removeTodo(state, action) {
            const { todoId } = action.payload;
            if ( !todoId ) { return; }
            const oldTodo = state.todosById[todoId];
            if ( !oldTodo ) { return; }

            removeFromIdsByDate(state.todoIdsByDate, todoId, oldTodo.startDate, oldTodo.deadlineDate);
            state.todosById[todoId] = null;
        },
        updatedTodo(state, action) {
            const { updatedTodo } = action.payload;
            if (!updatedTodo) { return; }
            const { todoId } = updatedTodo;
            if (!todoId) { return; }
            const { oldTodo } = state.todosById[todoId];
            if ( !oldTodo ) { return; }
            const { updatedStartDate } = updatedTodo.startDate;
            if ( !updatedStartDate ) { return; }

            if (oldTodo.startDate !== updatedStartDate || oldTodo.deadlineDate !== updatedTodo.deadlineDate) {
                removeFromIdsByDate(state.todoIdsByDate, todoId, oldTodo.startDate, oldTodo.deadlineDate);
                addToIdsByDate(state.todoIdsByDate, todoId, updatedStartDate, updatedTodo.deadlineDate)
            }
        }
    },
});

export const { addTodos, removeTodo, updatedTodo } = todosSlice.actions;
export default todosSlice;