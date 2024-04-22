// Loader.js
import React from 'react';
import loaderGif from '../assets/loading.gif'; // Import the GIF file
import './LoaderCSS.css'
const Loader: React.FC = () => {
    return (
        <div className="loader-container">
            <div className="loader">
                <img src={loaderGif} alt="Loading..." />
            </div>
        </div >
    );
};

export default Loader;
