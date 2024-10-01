
import React, { useRef, useState, useEffect } from 'react';

import './Drawing.css'; 
import { useNavigate } from 'react-router-dom';
const Drawing = () => {

  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#ff0000'); // Default to red
  const [colors, setColors] = useState(['#ffffff', '#ff0000', '#0000ff', '#ffff00']); // white, red, blue, yellow
  const [showColorSelect, setShowColorSelect] = useState(false);
  const [penSize, setPenSize] = useState(2);
  const [newColor, setNewColor] = useState({ r: 0, g: 0, b: 0 });

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  // Set background color on mount
  useEffect(() => {
    // document.body.style.background = "#006699";
    initializeCanvas();
    window.addEventListener('resize', initializeCanvas);
    return () => window.removeEventListener('resize', initializeCanvas);
  }, []);

  // Initialize and resize the canvas
  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Get the device pixel ratio, falling back to 1.
    const dpr = window.devicePixelRatio || 1;

    // Get the size of the canvas in CSS pixels.
    const rect = canvas.getBoundingClientRect();

    // Set the size of the canvas in device pixels.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale the context to ensure correct drawing operations.
    context.scale(dpr, dpr);

    // Fill the canvas with white background.
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, rect.width, rect.height);
  };

  // Mouse Event Handlers
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setLastPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    drawLine(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseLeave = () => {
    setIsDrawing(false);
  };

  // Touch Event Handlers
  const handleTouchStart = (e) => {
    e.preventDefault(); // Prevent scrolling
    if (e.touches.length !== 1) return; // Only handle single touch
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    setLastPos({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    setIsDrawing(true);
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent scrolling
    if (!isDrawing || e.touches.length !== 1) return;
    const touch = e.touches[0];
    drawLine(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  // Unified Drawing Function
  const drawLine = (clientX, clientY) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const currentPos = { x: clientX - rect.left, y: clientY - rect.top };

    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = penSize;
    context.strokeStyle = color;

    context.beginPath();
    context.moveTo(lastPos.x, lastPos.y);
    context.lineTo(currentPos.x, currentPos.y);
    context.stroke();

    setLastPos(currentPos);
  };

  // Toggle color select panel
  const toggleColorSelect = () => {
    setShowColorSelect(!showColorSelect);
  };

  // Update new color based on sliders
  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setNewColor(prev => ({ ...prev, [name]: value }));
  };

  // Add new color to the list
  const addNewColor = () => {
    const rgb = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
    setColors([...colors, rgb]);
    setColor(rgb); // Select the new color
    setShowColorSelect(false);
  };

  // Handle color selection
  const selectColor = (selectedColor) => {
    setColor(selectedColor);
  };

  // Handle pen size change
  const handlePenSizeChange = (e) => {
    setPenSize(e.target.value);
  };

  // Clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    context.clearRect(0, 0, rect.width, rect.height);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, rect.width, rect.height);
  };

  // Download the image
  const downloadImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement('a');
    link.download = "my-drawing.jpg";
    link.href = dataURL;
    link.click();
  };

  return (
    <div id="body" className="drawing-container">
      {/* Pencils Images */}
      <img 
        src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727417075/qb7hanveyiklnlsltd6b.png' 
        alt="Pencils Right" 
        className="pencils pencils-right"
      />
      <img 
        src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727417075/v8tsqrp0szeq5n04zaua.png'
        alt="Pencils Left" 
        className="pencils pencils-left"
      />

      {/* Back Button */}
      <div 
        className="back-button"
        onClick={() => window.history.back()}
      >
        &#129136;
      </div>

      {/* Canvas */}
      <canvas
        id="canvasD"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="drawing-canvas"
      ></canvas>

      {/* Controls */}
      <div className="controls">
        {/* Color Selection */}
        <ul className="color-palette">
          {colors.map((c, index) => (
            <li 
              key={index} 
              className={`color-swatch ${c === color ? 'selected' : ''}`} 
              style={{ backgroundColor: c }}
              onClick={() => selectColor(c)}
            ></li>
          ))}
        </ul>
        <button className="new-color-button" onClick={toggleColorSelect}>New Color</button>

        {/* Color Select Panel */}
        {showColorSelect && (
          <div className="color-select-panel">
            <span 
              className="new-color-display" 
              style={{ backgroundColor: `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})` }}
            ></span>
            <div className="color-sliders">
              <p>
                <label htmlFor="red">Red</label>
                <input 
                  id="red" 
                  name="r" 
                  type="range" 
                  min="0" 
                  max="255" 
                  value={newColor.r} 
                  onChange={handleSliderChange} 
                />
              </p>
              <p>
                <label htmlFor="green">Green</label>
                <input 
                  id="green" 
                  name="g" 
                  type="range" 
                  min="0" 
                  max="255" 
                  value={newColor.g} 
                  onChange={handleSliderChange} 
                />
              </p>
              <p>
                <label htmlFor="blue">Blue</label>
                <input 
                  id="blue" 
                  name="b" 
                  type="range" 
                  min="0" 
                  max="255" 
                  value={newColor.b} 
                  onChange={handleSliderChange} 
                />
              </p>
            </div>
            <div className="add-color-button-container">
              <button className="add-color-button" onClick={addNewColor}>Add Color</button>
            </div>
          </div>
        )}

        {/* Pen Size, Clear and Download Buttons */}
        <div className="canvas-controls">
          <button className="clear-button" onClick={clearCanvas}>Clear</button>
          <div className="pen-size-control">
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={penSize} 
              onChange={handlePenSizeChange} 
              className="pen-size-slider" 
            />
            <p className="pen-size-display">{penSize}</p>
          </div>
          <button className="download-button" onClick={downloadImage}>Download Image</button>
        </div>
      </div>
    </div>
  );
};

export default Drawing;
