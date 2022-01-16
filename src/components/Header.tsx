import React from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';

type HeaderProps = {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  fetch: (start: Date | null, end: Date | null) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  let selectionRange = {
    startDate: new Date(props.startDate),
    endDate: new Date(props.endDate),
    key: 'selection',
  }

  const handleSelect = (ranges:any) => {
    console.log('header:', ranges.selection)
    selectionRange = {
      startDate: new Date(ranges.selection.startDate),
      endDate: new Date(ranges.selection.endDate),
      key: 'selection',
    }
    props.setStartDate(ranges.selection.startDate)
    props.setEndDate(ranges.selection.endDate)
    props.fetch(ranges.selection.startDate, ranges.selection.endDate)
  }

    return (
        <div style={{backgroundColor: '#E8E8E8'}}>
            <div style={{fontSize: '30px'}}>
                NASAgram
            </div>
            <div style={{fontSize: '15px', color:'#B8B8B8'}}>
                Brought to you by NASA's image API
            </div>
            <DateRangePicker
            dragSelectionEnabled={false}
            maxDate={new Date()}
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
        </div>
    )
}

export default Header;