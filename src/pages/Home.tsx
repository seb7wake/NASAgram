import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { BallTriangle } from 'react-loader-spinner'
import Loading from '../components/Loading'
import Card from '../components/Card'
import Header from '../components/Header'
import '../styles.css'

const Home: React.FC = () => {
  let today = new Date()
  let pastDate: Date = new Date(today)
  pastDate.setDate(pastDate.getDate() - 8)
  const [showLiked, setShowLiked] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [photoData, setPhotoData] = React.useState<any>(null)
  const [endDate, setEndDate] = React.useState<Date>(today)
  const [startDate, setStartDate] = React.useState<Date>(pastDate)
  const [likes, setLikes] = React.useState<Set<Date | string>>(new Set())
  let url =
    'https://api.nasa.gov/planetary/apod?api_key' +
    process.env.REACT_APP_NASA_API_KEY

  const HomeStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  }

  /**
   * Switch between showing liked photos and all photos
   */
  React.useEffect(() => {
    if (showLiked) {
      setPhotoData([])
      fetchLikedPhotos()
    } else {
      setPhotoData([])
      fetchPhoto(null, null)
    }
  }, [showLiked])

  /**
   * Sets likes state to the likes value in local storage
   */
  React.useEffect(() => {
    let saved = localStorage.getItem('likes')
    if (saved != '[]' && saved != null) {
      let set = JSON.parse(saved)
      const newSet: Set<string | Date> = new Set(set)
      setLikes(newSet)
    }
  }, [])

  /**
   * Fetches 8 most recent photos from NASA's API
   * @param startVal
   * @param endVal
   */
  async function fetchPhoto(startVal: Date | null, endVal: Date | null) {
    setLoading(true)
    let start = ''
    let end = ''
    if (startVal && endVal) {
      start =
        startVal.getFullYear() +
        '-' +
        ('0' + (startVal.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + startVal.getDate()).slice(-2)
      end =
        endVal.getFullYear() +
        '-' +
        ('0' + (endVal.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + endVal.getDate()).slice(-2)
    } else {
      start =
        startDate.getFullYear() +
        '-' +
        ('0' + (startDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + startDate.getDate()).slice(-2)
      end =
        endDate.getFullYear() +
        '-' +
        ('0' + (endDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + endDate.getDate()).slice(-2)
    }
    const res = await fetch(url + '&start_date=' + start + '&end_date=' + end)
    const data = await res.json()
    setPhotoData(data.reverse())
    setLoading(false)
  }

  /**
   * Fetch all liked photos from NASA API
   */
  async function fetchLikedPhotos() {
    setLoading(true)
    let photos = []
    let likesArr: Array<Date | string> = [...likes]
    for (let i = 0; i < likesArr.length; i++) {
      let x = new Date(likesArr[i])
      const res = await fetch(url + '&date=' + likesArr[i])
      const data = await res.json()
      photos.unshift(data)
    }
    setPhotoData(photos)
    setLoading(false)
  }

  /**
   * Refreshes the list of posts by adding another 8 when the user scrolls down too far.
   */
  async function refresh() {
    let newStart = startDate
    newStart.setDate(newStart.getDate() - 8)
    setStartDate(newStart)
    let start =
      startDate.getFullYear() +
      '-' +
      ('0' + (startDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + startDate.getDate()).slice(-2)
    let end =
      endDate.getFullYear() +
      '-' +
      ('0' + (endDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + endDate.getDate()).slice(-2)
    const res = await fetch(url + '&start_date=' + start + '&end_date=' + end)
    const data = await res.json()
    setPhotoData(data.reverse())
  }

  if (!photoData) {
    return (
      <div
        style={{ margin: '0', position: 'absolute', top: '40%', left: '45%' }}
      >
        <BallTriangle color="#00BFFF" height={100} width={100} />
      </div>
    )
  }

  /**
   * Displays a list of liked posts or a loading state.
   */
  const displayLikedPhotos = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header
          showLiked={showLiked}
          setShowLiked={setShowLiked}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          fetch={fetchPhoto}
        />
        <br />
        {loading ? (
          <Loading />
        ) : photoData.length > 0 ? (
          photoData.map((item: any, i: number) => (
            <Card
              key={i.toString()}
              url={item.url}
              setLikes={setLikes}
              title={item.title}
              liked={likes.has(item.date)}
              explanation={item.explanation}
              date={item.date}
            />
          ))
        ) : (
          <div
            style={{ height: '100vh', fontSize: '20px', marginTop: '100px' }}
          >
            No liked posts yet...
          </div>
        )}
      </div>
    )
  }

  /**
   * Displays a list of the most recent pictures or more if filtered by date.
   */
  const displayAllPhotos = () => {
    return (
      <div>
        <Header
          showLiked={showLiked}
          setShowLiked={setShowLiked}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          fetch={fetchPhoto}
        />
        {loading ? (
          <Loading />
        ) : (
          photoData.map((item: any, i: number) => (
            <Card
              key={i.toString()}
              url={item.url}
              setLikes={setLikes}
              title={item.title}
              liked={likes.has(item.date)}
              explanation={item.explanation}
              date={item.date}
            />
          ))
        )}
      </div>
    )
  }

  return (
    <div style={HomeStyle}>
      {showLiked ? (
        displayLikedPhotos()
      ) : (
        <InfiniteScroll
          style={{
            backgroundColor: '#F0F0F0',
            paddingLeft: '25px',
            paddingRight: '25px',
          }}
          dataLength={photoData.length} //This is important field to render the next data
          next={refresh}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          refreshFunction={() => {
            return photoData
          }}
        >
          {displayAllPhotos()}
        </InfiniteScroll>
      )}
    </div>
  )
}

export default Home
