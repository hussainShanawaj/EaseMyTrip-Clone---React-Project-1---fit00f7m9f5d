import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Classes from "./Flights.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { Divider } from '@mui/material';
import DatePicker from "react-datepicker";

import { useAuth } from '../../components/Context';
import FlightTo from './Flight DropDown/FlightTo';
import FlightForm from './Flight DropDown/FlightFrom';
import { useNavigate } from 'react-router-dom';
import { Class } from '@mui/icons-material';
function Flights() {
const[open,setOpen]= useState(false);
const[openModal,setOpenModal]= useState(false);
const[flightFromOpen,setFlightFromOpen]= useState(false);
const[flightTraveller,setFlightTraveller]= useState(false);
const[flightToOpen,setFlightToOpen]= useState(false);
const[searchResults,setSearchResults]= useState([]);
const[errorPost,setErrorPost]= useState("");
const[offers,setOffers]= useState([]);
const[selectedOfferType,setSelectedOfferType]= useState("ALL");
const[loading,setLoading]= useState(true);


const{
    AirportFrom,
    AirportTo,
    travellerCount,
    flightDepartureDate,
    setFlightDepartureDate,
    seatCount,
    setSeatCount,
    seatAdultsCount,
    setSeatAdultsCount,
    seatChildrenCount,
    setSeatChildrenCount,
    seatInfantCount,
    setSeatInfantCount,
} = useAuth()
const navigate = useNavigate();

const CustomInput = ({value,onClick})=>(
    <input
    type="text"
    className={Classes.inputFlight}
    value={moment(value).format("DD MMM YYYY")}
    onClick={onClick}
    readOnly
    />
);

const handleSearch=()=>{
    navigate("/flightrecord");
};

useEffect(()=>{
    const fetchOffers = async () => {
        try{
            const yourProjextID = "f104bi07c490";
            const response = await fetch(
                `https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"${selectedOfferType}"}`,
                {
                  method: "GET",
                  headers:{
                    projectID: yourProjextID,
                  }
                }
            );
            const data = await response.json();
            setOffers(data.data.offers);

        }catch(error){
            console.error("Error fetching offers:", error);
            setOffers([]);
        }finally{
            setLoading(false);
        }
    };
    fetchOffers();
},[selectedOfferType]);

const handleFlightToOpen = () => {
    setFlightToOpen(!flightToOpen);
};

const handleFlightFromOpen= () => {
    setFlightFromOpen(!flightFromOpen);
};

const handleFlightTraveller = ()=>{
    setFlightTraveller(!flightTraveller);
};

const handleOfferTypeTraveller = () =>{
    setFlightTraveller(!flightTraveller);
};

const handleOfferTypeChange = () =>{
    setSelectedOfferType(type);
    setLoading(true);
};

const incrementAdultsSeatCount = () =>{
    setSeatCount((prevCount)=> prevCount+1);
    setSeatAdultsCount((prevCount)=>prevCount+1);
};

const decrementAdultsSeatCount = () => {
    setSeatCount((prevCount)=>(prevCount>1 ? prevCount-1 : 1));
    setSeatAdultsCount((prevCount)=>(prevCount>1 ? prevCount-1 : 1));
};

const incrementChildrenSeatCount = () =>{
    setSeatCount((prevCount)=> prevCount+1);
    setSeatChildrenCount((prevCount)=>prevCount+1);
};

const decrementChildrenSeatCount = () => {
    setSeatCount((prevCount)=>(prevCount>1 ? prevCount-1 : 1));
    setSeatChildrenCount((prevCount)=>(prevCount>0 ? prevCount-1 : 0));
};

const incrementInfantSeatCount = () =>{
    setSeatCount((prevCount)=> prevCount+1);
    setSeatInfantCount((prevCount)=>prevCount+1);
};

const decrementInfantSeatCount = () => {
    setSeatCount((prevCount)=>(prevCount>1 ? prevCount-1 : 1));
    setSeatInfantCount((prevCount)=>(prevCount>0 ? prevCount-1 : 0));
};



  return (
    <div className={Classes.flightSection}>
        <Navbar/>
        <div className={Classes.flightBooking}>
            <div className={Classes.headSearchBar}>
                <div className={Classes.captionFlight}>
                    <h1 className={Classes.searchLowestFlightH1}>
                        Search Lowest Price
                    </h1>
                </div>
            </div>
            <div className={Classes.searchBarFlight}>
                <div className={Classes.mainDivFlightSearch}>
                    <div
                    onClick={handleFlightFromOpen}
                    className={Classes.searchFromFlight}>
                        <div className={Classes.inputHeading}>
                            <p className={Classes.pInputFlight}>From</p>
                        </div>
                        <div className={Classes.inputToSection}>
                            <span className="text-xl font-semibold cursor-pointer">
                                {AirportFrom[0]}
                            </span>
                            <div className="text-sm cursor-pointer flex gap-[5px]">
                                <span>[{AirportFrom[2]}]</span>
                                <span>{AirportFrom[1]}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {flightFromOpen && <FlightForm onclose={handleFlightFromOpen}/> }
                <Divider orientation="vertical" className={Classes.divider}/>
                <img
                className={Classes.swapIcon}
                src="https://www.easemytrip.com/Content/img/swipe_icon.svg"
                />
                <div className={Classes.mainDivFlightSearch}>
                    <div 
                    onClick={handleFlightToOpen}
                    className={Classes.searchToFlight}
                    >
                        <div className={Classes.inputHeading}>
                            <p className={Classes.pInputFlight}>To</p>
                        </div>
                        <div className={Classes.inputToSection}>
                            <span className="text-xl font-semibold cursor-pointer">
                                {AirportTo[0]}
                            </span>
                            <div className="text-sm cursor-pointer flex gap-[5px]">
                                <span>[{AirportTo[2]}]</span>
                                <span>{AirportTo[1]}</span>
                            </div>
                        </div>

                    </div>
                </div>
                {flightToOpen && <FlightTo onclose={handleFlightToOpen}/>}
                <Divider orientation="vertical" className={Classes.divider}/>
                <div className={Classes.searchDepartureFlight}>
                    <div className={Classes.flighthomeDeparture}>
                        <div className={Classes.departureHeading}>
                            <img src="https://www.easemytrip.com/images/hotel-img/hp_icon_2.png"/>
                            <p className={Classes.pInputFlight}>DEPARTURE DATE</p>
                        </div>
                        <DatePicker
                        selected={flightDepartureDate}
                        onChange={(date)=>setFlightDepartureDate(date)}
                        minDate={new Date()}
                        customInput= {<CustomInput/>}
                        />
                    </div>
                </div>
                <Divider orientation="vertical" className={Classes.divider}/>
                <div className={Classes.searchTravellerFlight}>
                    <div onClick={handleFlightTraveller} className={Classes.hotelChooseTraveller}>
                        <div >
                            <p className={Classes.pInputFlight}>TRAVELLER & CLASS</p>
                        </div>
                        <div className="flex justify-evenly items-center">
                            <span className="text-[26px] font-[600] text-[#000]">{seatCount}</span>
                            <span className="text-[13px] font-[600] text-[#000]">Traveller(s)</span>
                            <i className={Classes.dropDownArrow}></i>
                        </div>
                    </div>
                </div>
                {flightTraveller &&
                <div className="w-[15%] max-[600px]:w-[70%] h-55 absolute bg-slate-50lg:mt-10 mt-[21em] p-2 rounded lg:ml-[55em] ml-[1em] z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                  <div className="w-[98%] flex flex-col gap-[5px]">
                    <div className="w-[100%] flex mb-[15px] mt-[5px] justify-between items-center">
                        <div className="flex flex-col justify-center">
                           <p className="text-[13px] text-[#000] font-[600]">Adults</p>
                           <p className="text-[11px]">(12 Years)</p>
                        </div>
                    <div className="rounded-[4px] border border-[#dcdcdc] border-solidflex items-center">
                        <button className="w-[26px] h-[31px] border-[0] text-[0] text-[18px] cursor-pointer text-[#000]" onClick={decrementAdultsSeatCount} disabled={seatAdultsCount <= 0}>-</button>
                        <input className={Classes.travellerInput} type="text" value={seatAdultsCount} readOnly/>
                        <button className="w-[26px] h-[31px] border-[0] text-[0] text-[18px] cursor-pointer text-[#000]" onClick={incrementAdultsSeatCount} disabled={seatAdultsCount <= 9}>+</button>
                    </div>
                    </div>
                    <div className="w-[100%] flex mb-[15px] mt-[5px] justify-between items-center">
                        <div className="flex flex-col justify-center">
                           <p className="text-[13px] text-[#000] font-[600]">Children</p>
                           <p className="text-[11px]">(2-12 Years)</p>
                        </div>
                    <div className="rounded-[4px] border border-[#dcdcdc] border-solidflex items-center">
                        <button className="w-[26px] h-[31px] border-[0] text-[0] text-[18px] cursor-pointer text-[#000]" onClick={decrementChildrenSeatCount} disabled={seatChildrenCount <= 0}>-</button>
                        <input className={Classes.travellerInput} type="text" value={seatChildrenCount} readOnly/>
                        <button className="w-[26px] h-[31px] border-[0] text-[0] text-[18px] cursor-pointer text-[#000]" onClick={incrementChildrenSeatCount} disabled={seatChildrenCount <= 9}>+</button>
                    </div>
                </div>

                <div className="w-[100%] flex mb-[15px] mt-[5px] justify-between items-center">
                        <div className="flex flex-col justify-center">
                           <p className="text-[13px] text-[#000] font-[600]">Infant</p>
                           <p className="text-[11px]">(0-2 Years)</p>
                        </div>
                    <div className="rounded-[4px] border border-[#dcdcdc] border-solidflex items-center">
                        <button className="w-[26px] h-[31px] border-[0] text-[0] text-[18px] cursor-pointer text-[#000]" onClick={decrementInfantSeatCount} disabled={seatInfantCount <= 0}>-</button>
                        <input className={Classes.travellerInput} type="text" value={seatInfantCount} readOnly/>
                        <button className="w-[26px] h-[31px] border-[0] text-[0] text-[18px] cursor-pointer text-[#000]" onClick={incrementInfantSeatCount} disabled={seatInfantCount <= 9}>+</button>
                    </div>
                </div>
                 <div className="w-[100%] border border-[#2196f3]] border-solid  text-[14px] font=[600] bgi-[#fff] text-[#2196f3] flex rounded-[5px] mt-[7px] cursor-pointer justify-center items-center hover:text-[#fff] hover:bg-[#2196f3] pt-[8px]" onClick={handleFlightTraveller}>
                    Done
                 </div>
                  </div>
                </div>
            }
             <div className={Classes.searchButtonFlight} onClick={handleSearch}>
                <h3 className={Classes.h3Search}>SEARCH</h3>
             </div>
     
            </div>
        </div>
        <div className={Classes.offerHeadingFlight}>
            <div className={Classes.headingDivFlight}>
                <h3 className={Classes.headingOffers}>Exclusive Offers</h3>
            </div>
        </div>
        <div className={Classes.listOffers}>
            <p
             className={Classes.listOffersFlight}
             onClick={()=>handleOfferTypeChange("ALL")}
             
             >
                All offers
             </p>
             <p
             className={Classes.listOffersFlight}
             onClick={()=>handleOfferTypeChange("FLIGHTS")}
             >
                Flights
             </p>

        </div>
        <div className={Classes.flightOffersSection}>
            {loading ? (
                <p>Loading Offers...</p>
            ):(
                offers.map((offer)=>(
                    <div className={Classes.flightoffersBoxes} key={offer.id}>
                        <div className={Classes.offerFlightImageDiv}>
                       <div className={Classes.flightOffersImage}>
                        <img
                        className={Classes.imageOffersFlight}
                        src={offer.heroUrl}
                        alt={offer.title}
                        />
                       </div>
                       <div className={Classes.descriptionFlightOffer}>
                        <p>
                            {offer.pTl} {offer.pTx}
                        </p>
                        </div>
                        </div>
                    </div>

                ))
            )}
        </div>
    </div>
  );
}

export default Flights;

