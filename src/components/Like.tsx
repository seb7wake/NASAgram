import React from 'react';
import '../styles.css'

type LikeProps = {
    onLike: (date: string) => void;
    onUnlike: (date: string) => void;
    date: string;
    liked: boolean;
}

const Like: React.FC<LikeProps> = (props) => {
    const [liked, setLiked] = React.useState(props.liked);

    const click = () => {
        if (liked) {
            props.onUnlike(props.date)
            setLiked(false)
        } else {
            props.onLike(props.date)
            setLiked(true)
        }
    }
    return (
        <button className='like-button' onClick={click}>
            <img style={{width: '35px'}} src={liked? require('../Icons/heart.png') : require('../Icons/empty-heart.png')} />
        </button>
    )
}

export default Like;