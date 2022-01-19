import React from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'
import '../styles.css'

type HeaderProps = {
  startDate: Date
  endDate: Date
  setStartDate: (date: Date) => void
  setEndDate: (date: Date) => void
  showLiked: boolean
  setShowLiked: (val: boolean) => void
  fetch: (start: Date | null, end: Date | null) => void
}

const Header: React.FC<HeaderProps> = (props) => {
  const [showCalendar, setShowCalendar] = React.useState(false)
  const minDate = new Date('1995-06-16')
  const maxDate = new Date()
  let selectionRange = {
    startDate: new Date(props.startDate),
    endDate: new Date(props.endDate),
    key: 'selection',
  }

  const handleSelect = (ranges: any) => {
    ranges.selection.endDate =
      ranges.selection.endDate > maxDate ? maxDate : ranges.selection.endDate
    selectionRange = {
      startDate: new Date(ranges.selection.startDate),
      endDate: new Date(ranges.selection.endDate),
      key: 'selection',
    }
    props.setStartDate(ranges.selection.startDate)
    props.setEndDate(ranges.selection.endDate)
    props.fetch(ranges.selection.startDate, ranges.selection.endDate)
  }

  const getCalendar = () => {
    return showCalendar ? (
      <div style={{ marginBottom: '2em' }}>
        <button
          className="liked-posts-btn"
          style={{ display: 'flex', marginBottom: '1em' }}
          onClick={() => props.setShowLiked(!props.showLiked)}
        >
          View Liked Posts
        </button>
        <div
          style={{
            backgroundColor: 'white',
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            borderRadius: '10px',
          }}
        >
          <DateRangePicker
            minDate={minDate}
            dragSelectionEnabled={false}
            maxDate={maxDate}
            ranges={[selectionRange]}
            onChange={handleSelect}
          />
          <button
            className="exit-btn"
            onClick={() => setShowCalendar(!showCalendar)}
          ></button>
        </div>
      </div>
    ) : (
      getFilterButton()
    )
  }

  const getFilterButton = () => {
    return (
      <div style={{ display: 'flex', marginBottom: '2em' }}>
        <button
          className="liked-posts-btn"
          onClick={() => props.setShowLiked(!props.showLiked)}
        >
          View Liked Posts
        </button>
        <button
          className="pill-btn"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <div>Filter Dates</div>
        </button>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#F0F0F0', width: '40em' }}>
      <div className={'title'}>
        <strong>NASAgram</strong>
      </div>
      <div className="sub-title">Brought to you by NASA's image API</div>
      <br />
      {!props.showLiked ? (
        getCalendar()
      ) : (
        <div style={{ display: 'flex' }}>
          <button
            className="liked-posts-btn"
            style={{ display: 'flex', marginBottom: '1em' }}
            onClick={() => props.setShowLiked(!props.showLiked)}
          >
            View All Posts
          </button>
          <div style={{ fontSize: '30px', marginLeft: '9.5%' }}>
            Liked Posts
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
