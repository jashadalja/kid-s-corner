import React from 'react';
// import movie1 from '../assets/movie1.mp4'; 

const Movie1 = () => {
  return (
    // <div style={{ width: '100vw', height: '100vh', position: 'relative', margin: 0, padding: 0, overflow: 'hidden' }}>
    <iframe style={{ width: '100vw', height: '100vh', position: 'relative', margin: 0, padding: 0, overflow: 'hidden' }} 
    width="560" height="315" src="https://www.youtube.com/embed/CGy_HzBLVlI?si=aJdYKMgNuKGt5lOK&modestbranding=1&controls=0&rel=0&title=0&autoplay=1"
            title="YouTube video player" frameborder="0" allow=" autoplay; "
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen/>

  );
};

export default Movie1;
