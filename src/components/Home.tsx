import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle, Oval, Grid } from  'react-loader-spinner'
import Card from './Card'
import Header from './Header'

const Home: React.FC = () => {
    let today = new Date()
    let pastDate: Date = new Date(today);
    pastDate.setDate(pastDate.getDate() - 8);
    const [loading, setLoading] = React.useState(false)
    const [photoData, setPhotoData] = React.useState<any>(null);
    const [endDate, setEndDate] = React.useState<Date>(today);
    const [startDate, setStartDate] = React.useState<Date>(pastDate);
    const [likes, setLikes] = React.useState(new Set())
    let url = 'https://api.nasa.gov/planetary/apod?api_key=ZThbPNfTaibKIjhy91qH2NKqX0gG3zEZZZVZeHIg'

    const HomeStyle = {
        display: 'flex',  
        justifyContent:'center', 
        alignItems:'center',
        backgroundColor: '#E8E8E8'
    }

    React.useEffect( () => {
        fetchPhoto(null, null)
        let saved = localStorage.getItem("likes")
        console.log(saved)
        if (saved != '[]' && saved != null){
            let set = JSON.parse(saved)
            console.log(set)
            const newSet = new Set(set)
            setLikes(newSet)
        }
    }, []);

    async function fetchPhoto(startVal: Date | null, endVal: Date | null) {
        console.log('home:', startDate, endDate)
        setLoading(true)
        let start = ''
        let end = ''
        if (startVal && endVal) {
            start = startVal.getFullYear() + '-' + ( '0'+(startVal.getMonth() + 1)).slice(-2) + '-' + ('0'+ startVal.getDate()).slice(-2) 
            end = endVal.getFullYear() + '-' + ( '0'+(endVal.getMonth() + 1)).slice(-2) + '-' + ('0'+ endVal.getDate()).slice(-2) 
        } else {
            start = startDate.getFullYear() + '-' + ( '0'+(startDate.getMonth() + 1)).slice(-2) + '-' + ('0'+ startDate.getDate()).slice(-2) 
            end = endDate.getFullYear() + '-' + ( '0'+(endDate.getMonth() + 1)).slice(-2) + '-' + ('0'+ endDate.getDate()).slice(-2) 
        }
        const res = await fetch(
            url + '&start_date=' + start + '&end_date=' + end
        );
        const data = await res.json();
        setPhotoData(data.reverse());
        setLoading(false)
        console.log(data)
    }

    async function refresh(){
        let newStart = startDate
        newStart.setDate(newStart.getDate() - 8)
        setStartDate(newStart)
        let start = startDate.getFullYear() + '-' + ( '0'+(startDate.getMonth() + 1)).slice(-2) + '-' + ('0'+ startDate.getDate()).slice(-2) 
        let end = endDate.getFullYear() + '-' + ( '0'+(endDate.getMonth() + 1)).slice(-2) + '-' + ('0'+ endDate.getDate()).slice(-2) 
        const res = await fetch(
            url + '&start_date=' + start + '&end_date=' + end
        );
        const data = await res.json();
        setPhotoData(data.reverse());
        console.log(data)
    }

    if (!photoData) {
        return <div style={{margin: '0',position: 'absolute',top: '40%', left: '45%'}}>
                    <BallTriangle color="#00BFFF" height={100} width={100} />
               </div>
    }

    return  (
    <div style={HomeStyle}>
        <InfiniteScroll
        style={{backgroundColor: '#E8E8E8'}}
        dataLength={photoData.length} //This is important field to render the next data
        next={refresh}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
            <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
            </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={() => { return photoData }}
        >
        <Header startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} fetch={fetchPhoto}/>
        <br />
        {loading ?
        <div style={{margin: '0',position: 'absolute',top: '65%', left: '45%', backgroundColor: '#E8E8E8'}}>
            <BallTriangle color="#00BFFF" height={70} width={70} />
        </div>
        :
        photoData.map((item: any, i: number) => 
            <Card key={i.toString()} url={item.url} setLikes={setLikes} title={item.title} liked={likes.has(item.date)} explanation={item.explanation} date={item.date}/>
        )}
        </InfiniteScroll>
    </div>
    )
}

export default Home;