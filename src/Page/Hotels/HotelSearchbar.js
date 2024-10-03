import React, { useState } from 'react';
import Datepicker from "react-datepicker";
import moment from 'moment';
import { Divider } from '@mui/material';
import Classes from "./Hotels.module.css";
import {useAuth} from "../../components/Context";
import "react-datepicker/dist/react-datepicker.css";

function HotelSearchbar() {

  const [HotelTraveller,setHotelTraveller] = useState(false);

  const{
    setHotelLocation,
    hotelLocation,
    setHotelDepartureDate,
    searchHotelResults,
    setSearchHotelResults,
    isSelectedDayCheckOut,
    setSelectedDayCheckOut,
    seatHotelCount,
    setSeatHotelCount,
    seatHotelAdultsCount,
    setSeatHotelAdultsCount,
    seatHotelChildrenCount,
    setSeatHotelChildrenCount
  } = useAuth();

  const CustomInput = ({value,onclick}) =>(
    <input
    className={Classes.hotelInputDatepickIn}
    type="text"
    value={moment(value).format("DD MM YYYY")}
    onClick={onclick}
    readOnly
    />
  )

    const CustomInputCheckout = ({value,onClick}) => (
      <input
      className={Classes.hotelInputDatepickOut}
      type='text'
      value={moment(value).format("DD MM YYYY")}
      onClick={onClick}
      readOnly
      />
    )

    const handleSetLocation = (e) => {
      setHotelLocation(e.target.value);
    }

    const handleSearch = () =>{
      setSearchHotelResults([]);
    }

    const handleHotelTraveller = () => {
      setHotelTraveller(!HotelTraveller);
    }

    const incrementHotelAdultsSeatCount = () => {
      setSeatHotelCount((prevCount) => prevCount+1);
      setSeatHotelAdultsCount((prevCount)=> prevCount+1);
    }

    const decrementHotelAdultsSeatCount = () => {
      seatHotelCount((prevCount)=>(prevCount>1 ? prevCount-1:1));
      setSeatHotelAdultsCount((prevCount)=>(prevCount>1 ? prevCount-1:1));
    }

    const incrementHotelChildrenSeatCount = () => {
      setSeatHotelCount((prevCount) => prevCount+1);
      setSeatHotelChildrenCount((prevCount)=> prevCount+1);
    }

    const decrementHotelChildrenSeatCount = () => {
      seatHotelCount((prevCount)=>(prevCount>1 ? prevCount-1:1));
      setSeatHotelChildrenCount((prevCount)=>(prevCount>1 ? prevCount-1:1));
    }
  
  return (
    <div className={Classes.searchBarHotelHeaders}>
      <div className={Classes.searchBarHotel}>
        <div className={Classes.searchBHeadersHotel}>
          <div className={Classes.searchFromHotel}>
            <p className={Classes.headingInputHotel}>
              Entry City name, Location or specific hotel
            </p>
            <div className={Classes.inputFormSectionHotel}>
              <input
              className={Classes.formSearchBoxHotel}
              placeholder="Enter City name,Location"
              value={hotelLocation}
              onChange={handleSetLocation}
              />
            </div>
          </div>
        </div>
        <div className={Classes.hotelDatesSection}>
          <div className={Classes.searchCheckIn}>
            <div className={Classes.searchCheckInClick}>
              <p className={Classes.headingCheckIn}>Check-in</p>
              <div className={Classes.searchDateInput}>
                <Datepicker
                className={Classes.datePickerCalender}
                selected={setHotelDepartureDate}
                onChange={(date)=> setHotelDepartureDate(date)}
                minDate={new Date()}
                CustomInput={<CustomInput/>}
                />
              </div>
            </div>
          </div>
          <Divider orientation="vertical"/>
          <div className={Classes.searchCheckOut}>
            <div className={Classes.searchCheckOutClick}>
              <p className={Classes.headingCheckOut}>Check-out</p>
              <Datepicker
               selected={isSelectedDayCheckOut(date)}
               minDate={new Date()}
               customInput= {<CustomInputCheckout/>}
               />
            </div>
          </div>
        </div>
        <div className={Classes.searchRooms}>
          <div
          onClick={`${Classes.searchRoomsClick} ${HotelTraveller ? Classes.activeDropdown : ""}`}
          >
            <div>
              <p className={Classes.headingCheckOut}>Guests</p>
            </div>
            <div className={Classes.guestCountDisplay}>
              <span>{seatHotelCount}</span>
              <span>Guest(s)</span>
              <i className={Classes.dropDownArrow}></i>
            </div>
          </div>
        </div>
        {HotelTraveller && (
          <div className={Classes.hotelTravllerDropdown}>
            <div className={Classes.travellerItem}>
              <div className={Classes.travellerDetails}>
                <p className={Classes.travellerLabel}>Adults</p>
                <p className={Classes.travellerAge}>(12+ Years)</p>
              </div>
              <div className={Classes.travellerCounter}>
                <button className={Classes.counterButton} onClick={decrementHotelAdultsSeatCount} disabled={seatHotelAdultsCount <= 1}>-</button>
                <input className={Classes.travllerInput} type="text" value={seatHotelAdultsCount} readOnly/>
                <button className={Classes.counterButton} onClick={incrementHotelAdultsSeatCount} disabled={seatHotelAdultsCount >= 9}>+</button>
              </div>
            </div>
            <div className={Classes.doneButton} onClick={handleHotelTraveller}>
              Done
            </div>
          </div>
        )}
        <div className={Classes.searchButtonHotel}
        onClick={handleSearch}
        >
          <h3>Modify Searrch</h3>
        </div>
      </div>
    </div>
  )
}

export default HotelSearchbar