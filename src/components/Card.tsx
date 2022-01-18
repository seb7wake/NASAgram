import React from 'react';
import Like from './Like';

type CardProps = {
    key: string;
    date: string;
    explanation: string;
    url: string;
    title: string;
    liked: boolean;
    setLikes: (set: Set<string>) => void;
}

const CardStyle = {
    display: 'flex',
    borderRadius: '15px',
    paddingBottom: '3em',
    marginBottom: '2em',
    width: '40em', 
    // justifyContent:'center', 
    backgroundColor: 'white',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
}

const PhotoStyle = {
    width: '100%',
    borderRadius: '14px 14px 0px 0px',
}

const Card: React.FC<CardProps> = (props) => {

    const onLike = (date: string) => {
        let saved = localStorage.getItem("likes")
        console.log('start:', saved)
        if (saved != '[]' && saved != null) {
            let set = JSON.parse(saved)
            let newSet = new Set<string>(set)
            newSet.add(date)
            props.setLikes(newSet)
            console.log('adding to storage1', newSet)
            localStorage.setItem("likes", JSON.stringify([...newSet]))
        } else {
            let newSet = new Set<string>([date])
            props.setLikes(newSet)
            console.log('adding to storage2', newSet, JSON.stringify(newSet))
            localStorage.setItem("likes", JSON.stringify([...newSet]))
        }
        console.log('storage:', localStorage.getItem("likes"))
    }

    const onUnlike = (date:string) => {
        let saved = localStorage.getItem("likes")
        if (saved) {
            let set = JSON.parse(saved)
            let newSet = new Set<string>(set)
            newSet.delete(date)
            localStorage.setItem("likes", JSON.stringify([...newSet]))
            props.setLikes(newSet)
        }
    }

    return (
        <div style={CardStyle}>
            <div>
                <img style={PhotoStyle} src={props.url} alt={props.title}/>
                <br/>
                <div style={{display:'flex', textAlign: 'left', alignItems:'center', fontSize: '20px', marginLeft:'25px', marginTop: '20px'}}>
                    <Like onLike={onLike} onUnlike={onUnlike} date={props.date} liked={props.liked}/>
                    <div style={{marginLeft:'5px'}}>{props.title} - <span style={{fontSize:'18px', paddingBottom:'10px'}}>{props.date}</span></div>
                </div>
                <br />
                <div style={{textAlign: 'left', fontSize: '16px', marginLeft:'3em', marginRight: '3em'}}>{props.explanation}</div>
            </div>
        </div>
    )
}

export default Card;