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
            "alt": "Fashion"
        },
        {
            "url": image2,
            "alt": "Horse"
        },
        {
            "url": image3,
            "alt": "Fashion"
        },
        {
            "url": image4,
            "alt": "Sports"
        },
        {
            "url": image5,
            "alt": "Animal"
        },
        {
            "url": image6,
            "alt": "Hotel"
        },
        {
            "url": image7,
            "alt": "House"
        },
        {
            "url": image8,
            "alt": "River"
        },
        {
            "url": image9,
            "alt": "Mountain"
        },
        {
            "url": image10,
            "alt": "Sea"
        },
        {
            "url": image11,
            "alt": "Fashion"
        },
    ]

    const canvasRef = useRef(null)
    let init = true
    let canvas
    let context
    let imagesParam = []
    let w, h, randX, randY, mouseClientX, mouseClientY
    let scaleDirection = 0.05
    var time = 0;
    var timeMax = 400;
    var fTime = 0;

    let mouse = {
        x : window.innerWidth / 2,
        y : window.innerHeight / 2,
        w : 0,
        alt : false,
        shift : false,
        ctrl : false,
        buttonLastRaw : 0, // user modified value
        buttonRaw : 0,
        over : false,
        buttons : [1, 2, 4, 6, 5, 3], // masks for setting and clearing button raw bits;
    };

    useEffect(() => {
        canvas = canvasRef.current
        context = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight 
        canvas.onmousemove = handleMouseMove
        
        imageData.forEach(i =>  {
            const image = new Image()
            image.src = i.url
            const imageW = image.width
            const imageH = image.height
            image.backroundSize = "cover"
            image.opacity = 0.8

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
            imagesParam.push({"image": image, "imageX": randX, "imageY": randY, "w": w, "h": h, "scale": 1, "alt": i.alt})          
        })     

        let displayTransform = {
            x:0,
            y:0,
            ox:0,
            oy:0,
            scale:1,
            rotate:0,
            cx:0,  // chase values Hold the actual display
            cy:0,
            cox:0,
            coy:0,
            cscale:1,
            crotate:0,
            dx:0,  // deltat values
            dy:0,
            dox:0,
            doy:0,
            dscale:1,
            drotate:0,
            drag:0.1,  // drag for movements
            accel:0.7, // acceleration
            matrix:[0,0,0,0,0,0], // main matrix
            invMatrix:[0,0,0,0,0,0], // invers matrix;
            mouseX:0,
            mouseY:0,
            ctx:context,
            setTransform:function(){
                let m = this.matrix;
                let i = 0;
                this.ctx.setTransform(m[i++],m[i++],m[i++],m[i++],m[i++],m[i++])
            },
            setHome:function(){
                this.ctx.setTransform(1,0,0,1,0,0)
                
            },
            update:function(){
                // smooth all movement out. drag and accel control how this moves
                // acceleration 
                this.dx += (this.x-this.cx)*this.accel
                this.dy += (this.y-this.cy)*this.accel
                this.dox += (this.ox-this.cox)*this.accel
                this.doy += (this.oy-this.coy)*this.accel
                this.dscale += (this.scale-this.cscale)*this.accel
                this.drotate += (this.rotate-this.crotate)*this.accel
                // drag
                this.dx *= this.drag
                this.dy *= this.drag
                this.dox *= this.drag
                this.doy *= this.drag
                this.dscale *= this.drag
                this.drotate *= this.drag
                // set the chase values. Chase chases the requiered values
                this.cx += this.dx
                this.cy += this.dy
                this.cox += this.dox
                this.coy += this.doy
                this.cscale += this.dscale
                this.crotate += this.drotate
                
                // create the display matrix
                this.matrix[0] = Math.cos(this.crotate)*this.cscale
                this.matrix[1] = Math.sin(this.crotate)*this.cscale
                this.matrix[2] =  - this.matrix[1]
                this.matrix[3] = this.matrix[0];
        
                // set the coords relative to the origin
                this.matrix[4] = -(this.cx * this.matrix[0] + this.cy * this.matrix[2])+this.cox
                this.matrix[5] = -(this.cx * this.matrix[1] + this.cy * this.matrix[3])+this.coy        
        
        
                // create invers matrix
                let det = (this.matrix[0] * this.matrix[3] - this.matrix[1] * this.matrix[2])
                this.invMatrix[0] = this.matrix[3] / det
                this.invMatrix[1] =  - this.matrix[1] / det
                this.invMatrix[2] =  - this.matrix[2] / det
                this.invMatrix[3] = this.matrix[0] / det
                
                // check for mouse. Do controls and get real position of mouse.
                if(mouse !== undefined){  // if there is a mouse get the real cavas coordinates of the mouse
                    if(mouse.oldX !== undefined){ // check if panning (middle button)
                        let mdx = mouse.x-mouse.oldX // get the mouse movement
                        let mdy = mouse.y-mouse.oldY
                        // get the movement in real space
                        let mrx = (mdx * this.invMatrix[0] + mdy * this.invMatrix[2])
                        let mry = (mdx * this.invMatrix[1] + mdy * this.invMatrix[3])  
                        this.x += mrx / 2
                        this.y += mry / 2
                    }
                    // do the zoom with mouse wheel
                    if(mouse.w !== undefined && mouse.w !== 0){
                        this.ox = mouse.x
                        this.oy = mouse.y
                        this.x = this.mouseX
                        this.y = this.mouseY
                        /* Special note from answer */
                        // comment out the following is you change drag and accel
                        // and the zoom does not feel right (lagging and not 
                        // zooming around the mouse 
                        /*
                        this.cox = mouse.x;
                        this.coy = mouse.y;
                        this.cx = this.mouseX;
                        this.cy = this.mouseY;
                        */
                        if(mouse.w > 0){ // zoom in
                            this.scale *= 1.1
                            mouse.w -= 20
                            if(mouse.w < 0){
                                mouse.w = 0
                            }
                        }
                        if(mouse.w < 0){ // zoom out
                            this.scale *= 1/1.1
                            mouse.w += 20;
                            if(mouse.w > 0){
                                mouse.w = 0
                            }
                        }
        
                    }
                    // get the real mouse position 
                    let screenX = (mouse.x - this.cox)
                    let screenY = (mouse.y - this.coy)
                    this.mouseX = this.cx + (screenX * this.invMatrix[0] + screenY * this.invMatrix[2])
                    this.mouseY = this.cy + (screenX * this.invMatrix[1] + screenY * this.invMatrix[3])            
                    mouse.rx = this.mouseX  // add the coordinates to the mouse. r is for real
                    mouse.ry = this.mouseY
                    // save old mouse position
                    mouse.oldX = mouse.x
                    mouse.oldY = mouse.y
                }
                
            }
        }
        let timer = 0
        const animate = () => {
            timer += 1; // update timere
            // update the transform
            displayTransform.update()
            // set home transform to clear the screem
            displayTransform.setHome()
            context.clearRect(0, 0 ,canvas.width, canvas.height)
            displayTransform.setTransform()
            context.globalAlpha = 0.9
            draw(imagesParam)            

            requestAnimationFrame(animate)
        }
        animate()
    }, [])

    const handleMouseMove = (e) => {
        mouse.x = e.offsetX
        mouse.y = e.offsetY
        mouseClientX = e.clientX
        mouseClientY = e.clientY
        if (mouse.x === undefined) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }
    }

    
    const draw = (imagesParam) => {
      	// Draw viewport background
        context.clearRect(0, 0, canvas.width, canvas.height)
        imagesParam.forEach(iParam => {
            if(checkDistance(mouseClientX, iParam.imageX, mouseClientY, iParam.imageY, iParam.w, iParam.h)) { 
                context.drawImage(iParam.image, iParam.imageX, iParam.imageY, iParam.w * iParam.scale, iParam.h * iParam.scale)
                // context.font = "25px Akkurat-Mono"
                // context.fillStyle = "white"
                // context.fillText(iParam.alt, mouse.x, mouse.y)
                if(iParam.scale < 2) {
                    iParam.scale += scaleDirection
                } 
            } else {
                context.drawImage(iParam.image, iParam.imageX, iParam.imageY, iParam.w * iParam.scale, iParam.h * iParam.scale)
                if(iParam.scale > 1) {
                    iParam.scale -= scaleDirection
                } 
            }
        })
    }

    const checkDistance = (mousePosX, imagePosX, mousePosY, imagePosY, iw, ih) => {
        let distanceX = Math.abs(mousePosX - (imagePosX + iw / 2))
        let distanceY = Math.abs(mousePosY - (imagePosY + ih / 2))
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        if(distance < Math.sqrt(iw * iw + ih * ih)  || distance < iw) {
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




