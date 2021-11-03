import React, { useState, useEffect} from 'react'
import styled from 'styled-components'

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const addEventListeners = () => {
        document.addEventListener('mousemove',mMove);
      };
  
      const removeEventListeners = () => {
        document.removeEventListener('mousemove', mMove);
  
      };
  
      const mMove = (el) => {
        setPosition({ x: el.clientX, y: el.clientY });
      };
    
      addEventListeners();
      return () => removeEventListeners();
    }, []);

    return (
        <CursorPointer style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
        }}>

        </CursorPointer>
    )
}

export default Cursor

const CursorPointer = styled.div`
    width: 30px;
    height: 30px;
    border: 2px solid #7A7A7A;
    border-radius: 100%;
    position: fixed;
    transform: translate(-50%, -50%);
`;
