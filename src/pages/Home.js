import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import ParallaxMousemove from 'react-parallax-mousemove';

import image1 from '../images/1.png'
import image2 from '../images/2.png'
import image3 from '../images/3.png'
import image4 from '../images/4.png'
import image5 from '../images/5.png'
import image6 from '../images/6.png'
import image7 from '../images/7.png'
import image8 from '../images/8.png'
import image9 from '../images/9.png'
import image10 from '../images/10.png'
import image11 from '../images/11.png'

const style = {
    bgLayerStyle: {
        position: 'absolute',
        height: '100%',
        transform: 'translate(-15%, 17%)',
      }
}

const Home = () => {
    const imageSrc = [
        {
            "url": image1,
            "dimensions": {
                "width": 1368,
                "height": 1710
            },
            "alt": null
        },
        {
            "url": image2,
            "dimensions": {
                "width": 1368,
                "height": 1710
            },
            "alt": null
        },
        {
            "url": image3,
            "dimensions": {
                "width": 1368,
                "height": 1710
            },
            "alt": null
        },
        {
            "url": image4,
            "dimensions": {
                "width": 1368,
                "height": 1710
            },
            "alt": null
        },
        {
            "url": image5,
            "dimensions": {
                "width": 1368,
                "height": 1710
            },
            "alt": null
        },
        {
            "url": image6,
            "dimensions": {
                "width": 1368,
                "height": 1710
            },
            "alt": null
        },
        {
            "url": image7,
            "dimensions": {
                "width": 1368,
                "height": 1710
            },
            "alt": null
        },
        {
            "url": image8,
            "dimensions": {
                "width": 1368,
                "height": 1710
            },
            "alt": null
        },
        {
            "url": image9,
            "dimensions": {
                "width": 1368,
                "height": 1710
            },
            "alt": null
        },
        {
            "url": image10,
            "dimensions": {
                "width": 1368,
                "height": 1710
            },
            "alt": null
        },
        {
            "url": image11,
            "dimensions": {
                "width": 1368,
                "height": 1710
            },
            "alt": null
        },
    ]

    const imageRef = useRef(null)

    useEffect(() => {
        
    }, [])

    return (
        <Main>
            <Header>
                <Logo>gry space</Logo>
                <Filter>
                    <p>Filter: </p>
                    <ul>
                        <li>LENS</li>
                        <li>NEURO</li>
                        <li>SPATIAL</li>
                        <li>TACTILE</li>
                        <li>EXPERIMENTS</li>
                    </ul>
                </Filter>
            </Header>
            <MainContainer ref={imageRef}>                
            </MainContainer>
            <Footer />
        </Main>
    )
}

export default Home

const Main = styled.div`
    width: 100%;
    height: 100vh;
    background-color: black;
    color: #7A7A7A;
    overflow: hidden;
`;

const Header = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const Logo = styled.p`
    flex: 1;
    font-family: StyreneAWeb;
    font-size: 25px;
    margin-left: 50px;
`;

const Filter = styled.div`
    display: flex;
    flex: 3;
    flex-direction: row;
    font-size: 15px;
    margin-top: 50px;
    ul {
        list-style-type: none;
    }
`;

const MainContainer = styled.div`

`;

const ImageContainer = styled.img`
    width: 15%;
    height: 15%;
    opacity: 0.8;
`;



