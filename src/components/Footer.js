import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    return (
        <Main>
            <MoonPhase>
                <div>
                    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="10" stroke="#7A7A7A" strokeWidth="2"/>
                    </svg> 
                    <p>FULL MOON IN LIBRA</p>
                </div>
                <p>34.0728&#176; N, 118.2606&#176; W</p>
            </MoonPhase>
            
        </Main>
    )
}

export default Footer

const Main = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    height: 100px;
    font-size: 15px;
`;
const MoonPhase = styled.div`
    display: flex;
    align-items: center;
    div {
        display: flex;
        align-items: center;
        svg {
        margin-left: 50px;
        }   
        p {
            margin-left: 15px;
        }

        @media screen and (max-width: 768px) {
            svg {
                width: 60px;
            }
        }
    }
    p {
        margin-left: 50px;
    }
`;