// src/components/Animals.jsx

import React, { useState, useEffect } from 'react';
import '../css/style.css'; // Ensure your styles are imported
import axios from 'axios'
import Ripples from 'react-ripples'

const Animal = () => {

  const [tortoiseData, setTortoiseData] = useState([]);
  const [fishData, setfishData] = useState([])
  const [frogData, setfrogData] = useState([])
  const [lionData, setlionData] = useState([])
  const [cowData, setcowData] = useState([])
  const [horseData, sethorseData] = useState([])




  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API}/animals`)// Make sure the port matches your server
      .then((res) => {
        // Set the data in state
        setTortoiseData(res.data.result['tortoise']);
        setfishData(res.data.result['fish']);
        setfrogData(res.data.result['frog']);
        setlionData(res.data.result['lion']);
        setcowData(res.data.result['cow']);
        sethorseData(res.data.result['horse']);
        console.log(res.data.result);
      })
      .catch((error) => {
        console.error('Error fetching animal data:', error);
      });
  }, []);

  useEffect(() => {
    // Initialize jQuery Ripples when the component mounts
    $(".full-landing-image").ripples({
      resolution: 600,
      perturbance: 0.2,
    });
  }, []);


  return (
    <section className="animals up-and-down" id="animals">
      {/* Water Creatures */}
      <div className="box-container">
        <h3 className="title">Water Creatures</h3>
        {/* <div className="image-wrapper"> */}
        <Ripples className='image-wrapper'>
          <div className="full-landing-image">
            <a href="/tortoise.html" target="_blank" rel="noopener noreferrer">
              <div className="box">
                <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727415611/m9ovz5yvp2siq5fltdyj.webp' alt="Tortoise" />
                <div className="info">
                  <h1 style={{ fontWeight: 900, color: 'white' }}>Tortoise</h1>
                  <pre>
                    {tortoiseData}
                  </pre>
                </div>
              </div>
            </a>

            {/* Fish */}
            <a href="/fish.html" target="_self" rel="noopener noreferrer">
              <div className="box">
                <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727417281/fotxoq0hvm6yn93sckxb.webp' alt="Fish" />
                <div className="info">
                  <h1 style={{ fontWeight: 900, color: 'white' }}>Fish</h1>
                  <pre>
                    {fishData}
                  </pre>
                </div>
              </div>
            </a>

            {/* Frog */}
            <a href="/frog.html" target="_blank" rel="noopener noreferrer">
              <div className="box">
                <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727417281/h5ncgb1vl0nzh33cafsh.png' alt="Frog" />
                <div className="info">
                  <h1 style={{ fontWeight: 900, color: 'white' }}>Frog</h1>
                  <pre>
                    {frogData}
                  </pre>
                </div>
              </div>
            </a>
          </div>

        </Ripples>
        {/* </div> */}
      </div>

      {/* Stick Image */}
      <img className="stick" src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727415609/u6kvttselopbymq4gy2y.png' alt="Stick" />

      {/* Land Creatures */}
      <div className="box-container">
        <h1 className="title">Land Creatures</h1>
        <div className="image-wrapper">
          {/* Lion */}
          <a href="/lion.html" target="_blank" rel="noopener noreferrer">
            <div className="box">
              <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727417287/bzbdhzvbgcvbvn1gcqoe.png' alt="Lion" />
              <div className="info">
                <h1 style={{ fontWeight: 900 }}>Lion</h1>
                <pre className="pre1">
                  {lionData}
                </pre>
              </div>
            </div>
          </a>

          {/* Cow */}
          <a href="/cow.html" target="_blank" rel="noopener noreferrer">
            <div className="box">
              <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727415605/pdpdgttwuxl2u2k6vgbo.png' alt="Cow" />
              <div className="info">
                <h1 style={{ fontWeight: 900 }}>Cow</h1>
                <pre className="pre1">
                  {cowData}
                </pre>
              </div>
            </div>
          </a>

          {/* Horse */}
          <a href="/horse.html" target="_blank" rel="noopener noreferrer">
            <div className="box">
              <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727417281/acwuzcrbiwmymlurvxbo.png' alt="Horse" />
              <div className="info">
                <h1 style={{ fontWeight: 900 }}>Horse</h1>
                <pre className="pre1">
                  {horseData}
                </pre>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Animal;
