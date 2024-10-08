import React from 'react'
import Navbar from "./Navbar/Navbar";
import App from './App';
import Flights from "../Page/Flights/Flights";
import HotelHome from "../Page/Hotels/HotelHome";
import HotelDetail from "../Page/Hotels/Hotel_Detail/HotelDetail";
import Hotels from "../Page/Hotels/Hotel Records/Hotels";
import FlightRecords from "../Page/Flights/Flight_Records/FlightRecords";
import PrivateRoute from './PrivateRoute';
import FlightBooking from "../Page/Flights/Flight Booking/FlightBooking";
import HotelBooking from "../Page/Hotels/Hotel_Booking/HotelBooking";
import FlightPayment from "../Page/Flights/Flight Booking/FlightPayment";
import HotelPayment from "../Page/Hotels/Hotel_Booking/HotelPayment";
import MyBooking  from "./Navbar/MyBooking";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Routing() {
  return (
   <BrowserRouter>
     <Routes>
        <Route path="/App" element={<App/>}/>
        <Route path="/navbar" element={<Navbar/>}/>
        <Route path="/" element={<Flights/>}/>
        <Route path="/hotels" element={<Hotels/>}/>
        <Route path="/hotelhome" element={<HotelHome/>}/>
       <Route path="/hoteldetails" element={<HotelDetail/>}/>
       <Route path="/flightrecord" element={<FlightRecords/>}/>
      <Route path="/mybooking" element={<MyBooking/>}/>
         <Route element={<PrivateRoute/>}>
            <Route path="/flightpayment" element={<FlightPayment/>}/>
            <Route path="/hotelpayment" element={<HotelPayment/>}/>
            <Route path="/flightbooking" element={<FlightBooking/>}/>
            <Route path="/hotelbooking" element={<HotelBooking/>}/>
         
         </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default Routing