import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle, Oval, Grid } from  'react-loader-spinner'

const Loading: React.FC = () => {
    return (
        <div className='loading'>
            <BallTriangle color="#00BFFF" height={100} width={100} />
        </div>
    )
}

export default Loading;