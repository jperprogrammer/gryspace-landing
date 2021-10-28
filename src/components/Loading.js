import React from 'react'
import styled, { keyframes } from 'styled-components'

const Loading = () => {
    return (
        <LoadingContainer>
            <LogoText>gry space
                <p className="firstPhase">Lorem Ipsum is </p>
                <p className="secondPhase">simply dummy text </p>
                <p className="thirdPhase">of the printing and </p>
                <p className="fourthPhase">typesetting industry</p></LogoText>
        </LoadingContainer>
    )
}

export default Loading

// keyframe
const logoAnimation = keyframes`
    from {transform: translateX(0px);}
    to {transform: translateX(-100px);}
`;
const descAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateX(0px);
    }
    to {
        opacity: 1;
        transform: translateX(-100px);
    }
`;

const LoadingContainer = styled.div`
    font-family: StyreneAWeb;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    width: 100%;
    height: 100vh;
    color: white;
`;
const LogoText = styled.span`
    display: flex;
    flex-direction: row;
    font-size: 40px;
    animation-name: ${logoAnimation};
    animation-duration: 2s;
    animation-delay: 1s;
    
    p {
        display: none;
        font-size: 16px;
        margin-top: 25px;
        margin-left: 10px;
        font-weight: normal;
    }
    .firstPhase {
        animation-name: ${descAnimation};
        animation-delay: 3s;
        animation-duration: 2s;
    }
`;


