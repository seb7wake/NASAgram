# NASAgram

This React project is an instagram-like feed based on NASA's Astronomy Picture of the DAY (APOD) API where users
can like posts and filter them by date. The hosed site can be viewed here: https://nasagram-apod.netlify.app/

## Features

The list of added features in this project includes:
1. Tracking of liked posts and functionality to display all the users liked posts
2. Date range filter feature where the user can view pictures in a given date range using a calendar
3. Loading state while we wait to load pictures from NASA'S API
4. Animated like button

### Liked Posts

The user can "like" and "unlike" a post by pressing on the heart icon on every post. Liking a post
will save it to local storage where it is kept for future reference. The user can then press the "View Liked Posts"
button and then this will display every post teh user has liked in the past.

### Date Range Filter

Pressing the "Filter Dates" button at the top will display a calendar where the user can select any number of dates
in a given range. If teh suer wishes to view more past posts, they can simply continue scrolling and older posts will load.
