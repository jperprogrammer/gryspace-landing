import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'

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

const Home = () => {
    const imageData = [
        {
            "url": image1,
            "alt": null
        },
        {
            "url": image2,
            "alt": null
        },
        {
            "url": image3,
            "alt": null
        },
        {
            "url": image4,
            "alt": null
        },
        {
            "url": image5,
            "alt": null
        },
        {
            "url": image6,
            "alt": null
        },
        {
            "url": image7,
            "alt": null
        },
        {
            "url": image8,
            "alt": null
        },
        {
            "url": image9,
            "alt": null
        },
        {
            "url": image10,
            "alt": null
        },
        {
            "url": image11,
            "alt": null
        },
    ]

    const canvasRef = useRef(null)
    let canvas
    let context
    let camera
    let imagesParam = []
    let w, h, randX, randY, mouseX, mouseY

    useEffect(() => {
        canvas = canvasRef.current
        context = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight 
        canvas.onmousemove = handleMouseMove
        camera = {
            width: .5 * window.innerWidth,
            height: .5 * window.innerHeight,
            x: .5 * window.innerWidth / 2,
            y: .5 * window.innerHeight / 2,
        }
        
        imageData.forEach(i =>  {
            const image = new Image()
            image.src = i.url
            const imageW = image.width
            const imageH = image.height
            image.backroundSize = "cover"

            //set image width and height by dimension
            if (imageW > imageH) {
                w = Math.floor(Math.random() * 100) + 200
                h = Math.floor(Math.random() * 50) + 150 
            } else {
                w = Math.floor(Math.random() * 50) + 150
                h = Math.floor(Math.random() * 100) + 200 
            }

            //set image position x, y
            randX = Math.floor(Math.random() * window.innerWidth) + 0
            randY = Math.floor(Math.random() * window.innerHeight ) + 0
            
            //image param
            imagesParam.push({"image": image, "imageX": randX, "imageY": randY, "w": w, "h": h})          
        })      

        const FRAMES_PER_SECOND = 60;  // Valid values are 60,30,20,15,10
        // set the mim time to render the next frame
        const FRAME_MIN_TIME = (1000/60) * (60 / FRAMES_PER_SECOND) - (1000/60) * 0.5;
        let lastFrameTime = 0;  // the last frame time

        const animate = (time) => {
            draw(imagesParam)
            if(time-lastFrameTime < FRAME_MIN_TIME){ //skip the frame if the call is to early
                window.requestAnimFrame(animate);
                return; // return as there is nothing to do
            }
            lastFrameTime = time; // remember the time of the rendered frame
            // render the frame
            window.requestAnimFrame(animate);
        }
        animate()
    }, [])

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    const handleMouseMove = (e) => {
        mouseX = e.offsetX
        mouseY = e.offsetY
        moveCamera(mouseX, mouseY)
    }

    const moveCamera = (posX, posY) => {
        camera.x = posX
        camera.y = posY
        moveContext()
    }

    const moveContext = () => {
        context.save()
        context.setTransform(1, 0, 0, 1, 0, 0); // Reset context
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.translate(
            (canvas.width / 5 - camera.x + camera.width / 5) * .4,
            (canvas.height / 5 - camera.y + camera.height / 5) * .4
        );
    }

    let scale=1.00;
    let scaleDirection=0.01;

    const draw = (imagesParam) => {
        imagesParam.forEach(iParam => {
            iParam.onload = () => {
                context.drawImage(iParam.image, iParam.imageX, iParam.imageY, iParam.w, iParam.h)
            }
        })
		
      	// Draw viewport background
        context.clearRect(0, 0, canvas.width, canvas.height);
        imagesParam.forEach(iParam => {
            if(checkDistance(mouseX, iParam.imageX, mouseY, iParam.imageY, iParam.w, iParam.h)) {                
                context.drawImage(iParam.image, iParam.imageX, iParam.imageY, iParam.w, iParam.h)
            } else {
                context.drawImage(iParam.image, iParam.imageX, iParam.imageY, iParam.w, iParam.h)
            }
        })
    }

    const checkDistance = (mousePosX, imagePosX, mousePosY, imagePosY, iw, ih) => {
        let distanceX = Math.abs(mousePosX - (imagePosX + iw / 2))
        let distanceY = Math.abs(mousePosY - (imagePosY + ih / 2))
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        if(distance < iw  || distance < ih ) {
            return true
        } else {
            return false
        }
    }

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
            <canvas ref={canvasRef} />             
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
    display: flex;
    align-items: center;
    position: fixed;
    width: 100%;
`;

const Logo = styled.p`
    font-family: StyreneAWeb;
    font-size: 25px;
    margin-left: 50px;
    margin-bottom: 60px;
    margin-right: 200px;
    @media screen and (max-width: 768px) {
        margin-right: 5px;
    }
`;

const Filter = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 15px;
    padding-top: 30px;
    ul {
        list-style-type: none;
    }
`;




