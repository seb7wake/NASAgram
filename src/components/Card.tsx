import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

type CardProps = {
    key: string;
    date: string;
    explanation: string;
    url: string;
    title: string
}
const Card: React.FC<CardProps> = (props) => {
    const CardStyle = {
        border: '1px solid black',
        borderRadius: '7px',
        paddingBottom: '2em',
        width: '50em',
        display: 'flex',  
        justifyContent:'center', 
        alignItems:'center'
    }

    const photoStyle = {
        width: '100%'
    }
    return (
        <div style={CardStyle}>
            <img style={photoStyle} src={props.url} alt={props.title}/>
        </div>
    )
}

export default Card;