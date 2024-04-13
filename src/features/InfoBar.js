import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    gap: 15px;
    padding: 15px;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, .3);
    z-index: 1;
`;


export default function InfoBar() {
    return <Container>
        <h4>This Is My Info Bar</h4>
    </Container>
}