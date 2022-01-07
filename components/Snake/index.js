import React, { Component } from 'react';
import Canvas from 'react-native-canvas'; // 0.1.20

export default function Snake() {
	React.useEffect()

  const handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, 100, 100);
  }

    return (
      <Canvas ref={handleCanvas}/> 
    )
}