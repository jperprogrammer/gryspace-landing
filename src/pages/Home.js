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

    const imageRef = useRef(null)
    const canvasRef = useRef(null)
    let w =0
    let h = 0
    let randX = 0
    let randY = 0
    let mouseX = 0 
    let mouseY = 0
    let canvas
    let context
    let canvasImagesParam = []
    let x = 0
    let y = 0

    useEffect(() => {
        canvas = canvasRef.current
        context = canvas.getContext('2d')
        context.canvas.width = window.innerWidth
        context.canvas.height = window.innerHeight
        canvas.onmousemove = handleMouseMove 

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
            canvasImagesParam.push({"image": image, "imageX": randX, "imageY": randY, "w": w, "h": h})          
        })   

        //Init images gallery
        canvasImagesParam.forEach(img => {
            img.image.onload = () => {
                context.drawImage(img.image, img.imageX, img.imageY, img.w, img.h)
            }
        })        

        // return () => {
        //     cancelAnimationFrame(animate)
        // }        
    }, [])

    const handleMouseMove = (e) => {   
        const animate = () => {
            requestAnimationFrame(animate)
            context.clearRect(0, 0, canvas.width, canvas.height)
            
            canvasImagesParam.forEach(img => {
                mouseX = (e.clientX -img.imageX) / 10 + img.imageX
                mouseY = (e.clientY -img.imageY) / 10 + img.imageY 
                if(mouseX > img.imageX) {
                    mouseX -= 0.01
                    if(mouseX < img.imageX) {
                        mouseX = img.imageX
                    }
                }else {
                    mouseX += 0.01
                    if(mouseX > img.imageX) {
                        mouseX = img.imageX
                    }
                }

                if(mouseY > img.imageY) {
                    mouseY -= 0.01
                    if(mouseY < img.imageY) {
                        mouseY = img.imageY
                    }
                }else {
                    mouseY += 0.01
                    if(mouseY > img.imageY) {
                        mouseY = img.imageY
                    }
                }
                context.drawImage(img.image, mouseX, mouseY, img.w, img.h)
            })
        }

        animate()
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




