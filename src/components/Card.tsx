import React from 'react'
import Like from './Like'
import ShowMoreText from 'react-show-more-text'

type CardProps = {
  key: string
  date: string
  explanation: string
  url: string
  title: string
  liked: boolean
  setLikes: (set: Set<string>) => void
}

const CardStyle = {
  display: 'flex',
  borderRadius: '15px',
  paddingBottom: '3em',
  marginBottom: '2em',
  width: '40em',
  backgroundColor: 'white',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
}

const PhotoStyle = {
  width: '100%',
  borderRadius: '14px 14px 0px 0px',
}

const Card: React.FC<CardProps> = (props) => {
  /**
   * Saves to local storage and updates state when a post is liked
   * @param date
   */
  const onLike = (date: string) => {
    let saved = localStorage.getItem('likes')
    if (saved != '[]' && saved != null) {
      let set = JSON.parse(saved)
      let newSet = new Set<string>(set)
      newSet.add(date)
      props.setLikes(newSet)
      localStorage.setItem('likes', JSON.stringify([...newSet]))
    } else {
      let newSet = new Set<string>([date])
      props.setLikes(newSet)
      localStorage.setItem('likes', JSON.stringify([...newSet]))
    }
  }

  /**
   * Saves to local storage and state when a post is unliked
   * @param date
   */
  const onUnlike = (date: string) => {
    let saved = localStorage.getItem('likes')
    if (saved) {
      let set = JSON.parse(saved)
      let newSet = new Set<string>(set)
      newSet.delete(date)
      localStorage.setItem('likes', JSON.stringify([...newSet]))
      props.setLikes(newSet)
    }
  }

  return (
    <div style={CardStyle}>
      <div>
        <img style={PhotoStyle} src={props.url} alt={props.title} />
        <br />
        <div className={'card-title-container'}>
          <Like
            onLike={onLike}
            onUnlike={onUnlike}
            date={props.date}
            liked={props.liked}
          />
          <div style={{ marginLeft: '7px', wordWrap: 'break-word' }}>
            {props.title} - {props.date}
          </div>
        </div>
        <ShowMoreText
          lines={6}
          more="Show more"
          less="Show less"
          className="card-content"
          anchorClass="my-anchor-css-class"
          expanded={false}
          truncatedEndingComponent={'... '}
        >
          <div>{props.explanation}</div>
        </ShowMoreText>
      </div>
    </div>
  )
}

export default Card
