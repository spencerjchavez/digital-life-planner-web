import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    gap: 15px;
`;

export default function TodoListItem({todo}) {
    return <Container>
        <p>{todo.name}</p>
    </Container>
}