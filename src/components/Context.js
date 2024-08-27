import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();




export function useAuth() {
  return useContext(AuthContext);
}

   export function AuthProvider({children}){
    const[hotelLocation,setHotelLocation]= useState("Mumbai");
    const[hotelDepartureDate,setHotelDepartureDate]= useState("");
    const[flightdepartureDate,setFlightDepartureDate]= useState("");
    const[traindepartureDate,settrainDepartureDate]= useState("");
    const[buseDepartureDate,setBusDepartureDate]= useState("");
    const[hotelId,setHotelId]= useState("");
    const[flightId,setFlightID]= useState("");
    
    const[trainCity,setTrainCity]= useState("New Delhi");
    const[trainToCity,setTrainToCity]= useState("Pune Junction");
    const[busCity,setBusCity]= useState("Mumbai,Maharsahtra");
    const[busToCity,setBusToCity]= useState("Pune, Maharashtra");
    const[AirportForm,setAirportForm]= useState([
      "Delhi",
      "Indira Gandhi International Airport",
      "DEL",
    ]);
    const[AirportTo,setAirportTo]= useState([
      "Goa",
      "Goa Internationl Airport",
      "GOI",
    ]);
    const[searchHotelResults,setSearchHotelResults]= useState([]);
    const[isSelectedDayCheckOut,SetSelectedDayCheckOut]= useState("");
    const[selectedSeats,setSelectedSeats]= useState([]);
    const[openLogin,setOpenLogin]= useState(false);
    const[openSignUp,setOpenSignUp]= useState(false);
    const[isLoggedIn,setIsLoggedIn]= useState(false);
    const[flightBookingId,setFlightBookingId]= useState("");
    const[BusBookingId,setBusBookingId]= useState("");
    const[travelare,setTravelare]= useState("");
    const[trainBookingId,setTrainBookingId]= useState("");
    const[hotelBookingId,setHotelBookingId]= useState("");
    const[seatCount,setSeatCount]= useState(1);
    const[seatHotelCount,setSeatHotelCount]= useState(1);
    const[seatAdultsCount,setSeatAdultsCount]= useState(1);
    const[seatChildrenCount,setSeatChildrenCount]= useState(0);
    const[seatInfantCount,setSeatInfantCount]= useState(0);
    const[seatHotelChildrenCount,setSeatHotelChildrenCount]= useState(0);
    const[seatHotelAdultsCount,setSeatHotelAdultsCount]= useState(1);
    const[firstName,setGuestName]= useState("");
    const[lastName,setGuestLastName]= useState("");
    const[fare,setFare]= useState("");
    const[bookingId,setBookingId]= useState("");
    const[bookingType,setBookingType]= useState("");
    const[departureTime,setDepartureTime]= useState("");
    const[arrivalTime,setArrivalTime]= useState("");
    const[duration,setDuration]= useState("");
   


    return (
    <AuthContext.Provider
    value={{
      setHotelLocation,
      hotelLocation,
      hotelDepartureDate,
      setHotelDepartureDate,
      AirportForm,
      setAirportForm,
      AirportTo,
      setAirportTo,
      hotelId,
      setHotelId,
      searchHotelResults,
      setSearchHotelResults,
      isSelectedDayCheckOut,
      SetSelectedDayCheckOut,
      flightdepartureDate,
      setFlightDepartureDate,
      flightId,
      setFlightID,
      traindepartureDate,
      settrainDepartureDate,
      trainCity,
      setTrainCity,
      trainToCity,
      setTrainToCity,
      busCity,
      setBusCity,
      busToCity,
      setBusToCity,
      buseDepartureDate,
      setBusDepartureDate,
      selectedSeats,
      setSelectedSeats,
      openLogin,
      setOpenLogin,
      openSignUp,
      setOpenSignUp,
      isLoggedIn,
      setIsLoggedIn,
      flightBookingId,
      setFlightBookingId,
      seatCount,
      setSeatCount,
      lastName,
      setGuestLastName,
      firstName,
      setGuestName,
      seatHotelCount,
      setSeatHotelCount,
      seatHotelCount,
      setSeatHotelCount,
      seatAdultsCount,
      setSeatAdultsCount,
      seatChildrenCount,
      setSeatChildrenCount,
      seatInfantCount,
      setSeatInfantCount,
      seatHotelAdultsCount,
      setSeatHotelAdultsCount,
      seatHotelChildrenCount,
      setSeatHotelChildrenCount,
      hotelBookingId,
      setHotelBookingId,
      BusBookingId,
      setBusBookingId,
      trainBookingId,
      setTrainBookingId,
      fare,
      setFare,
      bookingId,
      setBookingId,
      bookingType,
      setBookingType,
      travelare,
      setTravelare
    }}>
      {children}
    </AuthContext.Provider>
  )
}

