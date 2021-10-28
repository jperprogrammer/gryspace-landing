import React from 'react'
import styled from 'styled-components'

const Header = () => {
    return (
        <Main>
            <Logo>gry space</Logo>
            <Filter>
                <p>Filter: </p>
                <ul>
                    <li>LENS</li>
                    <li>NEURO</li>
                    <li>TACTILE</li>
                    <li>EXPERIMENTS</li>
                </ul>
            </Filter>
        </Main>
    )
}

export default Header

const Main = styled.div`
    background-color: black;
    height: 100px;
    display: flex;
    align-items: center;
    color: #7A7A7A;
`;

const Logo = styled.p`
    flex: 1;
    font-family: StyreneAWeb;
    font-size: 25px;
    margin-left: 50px;
    bottom: 0;
`;

const Filter = styled.div`
    flex: 3;
    font-family: Akkurat-Mono;
    font-size: 15px;
`;
