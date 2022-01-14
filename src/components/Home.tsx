import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './Card'

const Home: React.FC = () => {
    let today = new Date()
    let pastDate: Date = new Date(today);
    pastDate.setDate(pastDate.getDate() - 8);
    const [photoData, setPhotoData] = React.useState<null | any>(null);
    const [endDate, setEndDate] = React.useState<Date>(today);
    const [startDate, setStartDate] = React.useState<Date>(pastDate);
    let url = 'https://api.nasa.gov/planetary/apod?api_key=ZThbPNfTaibKIjhy91qH2NKqX0gG3zEZZZVZeHIg'

    const ListStyle = {
        display: 'flex',  
        justifyContent:'center', 
        alignItems:'center'
    }

    React.useEffect( () => {
        fetchPhoto()
        async function fetchPhoto() {
            let start = startDate.getFullYear() + '-' + ( '0'+(startDate.getMonth() + 1)).slice(-2) + '-' + ('0'+ startDate.getDate()).slice(-2) 
            let end = endDate.getFullYear() + '-' + ( '0'+(endDate.getMonth() + 1)).slice(-2) + '-' + ('0'+ endDate.getDate()).slice(-2) 
            const res = await fetch(
                url + '&start_date=' + start + '&end_date=' + end
            );
            const data = await res.json();
            setPhotoData(data.reverse());
            console.log(data)
        }
    }, []);

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
        return <div/>;
    }
    console.log(photoData)
    return  (
    <div style={ListStyle}>
        <InfiniteScroll
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
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
        >
        {
        photoData.map((item: any, i: number) =>
            <Card key={i.toString()} url={item.url} title={item.title} explanation={item.explanation} date={item.date}/>
        )}
        </InfiniteScroll>
    </div>
    )
}

export default Home;