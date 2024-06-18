import styled from 'styled-components';
import TodoListItem from './TodoListItem';

const Container = styled.div`
    border-right: 1px #555555 solid;
    border-bottom: 1px #555555 solid;
    height: 100%;
    padding-left: 40px;
    padding-top: 20px;
    #background-color: rgb(200, 255, 200);
`;

const TodoList = styled.ul`

`;

export default function Todos() {
    const todos=  [];
    return <Container>
        <h2>To-Do</h2>
        <TodoList>
            {todos.map( todo => <TodoListItem todo={todo} />)}
        </TodoList>
    </Container>
}