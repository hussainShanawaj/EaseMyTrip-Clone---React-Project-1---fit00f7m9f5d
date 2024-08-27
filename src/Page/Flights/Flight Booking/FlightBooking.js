import React, { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar/Navbar';
import { useAuth } from '../../components/Context';
import moment from "moment";
import Classes from "../Flight.module.css";
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Class } from '@mui/icons-material';

function FlightBooking() {
    const [hotelDetailError,setHotelDetailError]= useState(null);
    const [flightBokkingDetailData,setFlightBookingDetailData]=useState([]);
    const {
        flightBookingId,
        AirportForm,
        AirportTo,
        flightdepartureDate,
        seatCount,
        setFare,
        setBookingId,
        setBookingType
    }= useAuth();
    const[]= moment(flightdepartureDate).format("ddd");
    const[]= moment(flightdepartureDate).format("DD MM YYYY");

    const navigate = useNavigate();
    const[firstName,setFirstName]= useState("");
    const[lastName,setLastName]= useState("");
    const[firstNameError,setFirstNameError]= useState("");
    const[lasttNameError,setLasttNameError]= useState("");
    const fetchSingleFlightData = async ()=>{
      try{
        const projectID ="f104bi07c490";
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightBookingId}`,
          {
            method:"GET",
            headers: {
              projectID,
            },
          }
        );
        if(response.ok){
        const data = await response.json();
        setFlightBookingDetailData(data?.data);
        }else{
          const errorData = await response.json();
          setHotelDetailError(errorData.message);
        }
      } catch (error){
        console.error("Error fetching flight data:",error);
        setHotelDetailError("Failed to fetch flight data");
        
      }
     
    };
   useEffect(()=>{
    fetchSingleFlightData();
   },[]);
   const handlePayment = (flightfare, bookingType,flightId)=>{
    if(!firstName.trim()){
      setFirstNameError("First Name is required");
      return;
    }
    setFare(flightfare);
    setBookingId(flightId);
    setBookingType(bookingType);
    navigate("/FlightPayment");
   }
    

  return (
    <div>
      <Navbar/>
      <div className="w-[100%] h-[100vh] max-[600px]:h-auto bg-[#e8f2fa] flex justify-center">
        <div className="w-[90%] h-[100%] flex flex-row max-[600px]:flex-col gap-[20px] justify-between">
          <div className="w-[70.5%] max-[600px]:w-[100%] mt-[20px]">
            <div className={Classes.bookingFlightData}>
              <div className={Classes.bookingHeader}>
                <div className={Classes.flightBookingImg}></div>
                <span>Flight Detail</span>
              </div>
              <div className="w-[96%]">
                   <div className={Class.bookingFlightData}>
                 <div className="w-[98%] mt-[30px] mb-[30px] flex flex-col gap-[5px]">
                  <div className={Classes.flightBookingImg}></div>
                  <div className="flex gap-[7px] items-center">
                       <span className="text-[20px] text-[#1a1a1a">
                         {flightBokkingDetailData?.source} -{" "}
                        {flightBokkingDetailData?.destination}{" "}
                       </span>{" "}
                       |
                        <span className="text-[12px] text-[#6a6869]">
                         {departureDay} - {departureDate}
                       </span>
                  </div>


                 </div>
                 <div className="w-[100%] max-[600px]:flex-col flex">
                  <div className="w-[25%] max-[600px]:w-[100%] h-[100%] flex">
                    <span className="text-[16px] text-[#1e1f1f]">
                      {flightBokkingDetailData?.flightID}
                    </span>
                  </div>
                  <div className="w-[75%] max-[600px]:w-[100%] h-[100%] flex gap-[10px]">
                    <div className="w-[32%] h-[100%] flex flex-col items-center">
                      <div className="w-[80%]">
                        <div className="text-[24px] text-[#1a1a1a] font-[600]">
                          <span>{AirportForm[0]}</span>
                          <span>{AirportForm[2]}</span>

                        </div>
                        <div className="text-[12px] text-[#6a6868] font-[600]">
                          <span>{departureDay}</span>-
                          <span>{departureDate}</span>

                        </div>
                      </div>
                    </div>
                    <div className="w-[32%] h-[100%] flex flex-col items-center">
                      <div className="rext-[12px] text-[#6a6868] mt-[5px] items-center">
                        <span>
                          {flightBokkingDetailData?.duration}h 10m
                        </span>
                      </div>
                      <div className={Classes.flightFromToImg}>
                        <div className={Classes.leftDotFlightBooking}></div>
                        <div className={Classes.arrowImgFlightBooking}></div>
                        <div className={Classes.rightDotFlightBooking}></div>

                      </div>

                    </div>
                    <div className="w-[32%] h-[100%] flex flex-col items-center">
                      <div className="w-[45%]">
                        <div className="w-[90%] text-[240px] text-[#1a1a1a] font-[600]">
                          {flightBokkingDetailData?.arrivalTime}
                        </div>
                        <div className="text-[12px] text-[#6a6868] font-[600]">
                        <span>{AirportForm[0]}</span>
                        <span>{AirportForm[2]}</span>
                        </div>
                        <div className="text-[12px] text-[6a6868]">
                        <span>{departureDay}</span>-
                        <span>{departureDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                 </div>
                </div>
              </div>
            </div>
            <div className={Classes.personalDetailFlight}>
              <div className={Classes.bookingHeader}>
                <div className={Classes.PersbookingImg}></div>
                <span>Traveller Details</span>
              </div>
              <div className={Classes.personalDetail}>
                <h3>Add Contact Details</h3>
                <div className="w-[100%] h-[100%] mt-[20px] flex flex-row max-[600px]:flex-col gap-[30px]">
                  <div 
                  style={{display:"flex", flexDirection:"column"}}
                  className="w-[30%] max-[600px]:w-[100%] gap-[5px]"
                  >
                    <label>
                      (First Name && (Middle name,if any)
                    </label>
                    <input
                    type="text"
                    className={Classes.personalDataFlightMobileNo}
                    value={firstName}
                    onChange={(e)=>{
                      setFirstName(e.target.value);
                      setFirstNameError("");
                    }}
                    />
                    {firstNameError && (
                      <p className="text-red-500 text-xs">{lasttNameError}</p>

                    )}
                    
                  </div>
                </div>
              </div>
            </div> 
          </div>
          <div className="w-[26%] max-[600px]:w-[100%] mt-[20px] flex flex-col">
            <div className={Classes.flightBookingAmount}>
             <div className={Classes.flightBookingAmountHeader}>
                <div className="text-[18px] text-[1a1a1a] h-[50px] flex items-center ml-[10px]">
                   <p>Price Summary</p>
                 </div>
             </div>
             <div className="w-80%]">
              <div className="w-[100%] border-b-2 border-b-[#e5e3e3] flex justify-center">
                <div className="w-[66%] pl-[4%] text-[13px] text-[1a1a1a] h-[35px] flex items-center">
                  Adult x 1
                </div>
                <div className="w-[30%] text-[1a1a1a] text-[12px] h-[35px] font-[600] flex items-center gap-[5px]">
                  <i>₹</i> {flightBokkingDetailData?.ticketPrice}
                </div>
              </div>
              <Divider flexItem/>
              <div className="w-[100%] border-b-2 border-b-[#e5e3e3] flex justify-between">
                <div className="w-[66%] pl-[4%] text-[18px] text-[#d63b05] h-[35px] font-bold flex items-center">
                  Grand Total
                </div>
                <div className="w-[30%] text-[18px] text-[#d63b05] font-bold h-[35px] flex items-centwe gap=[5px]">
                  <i>₹</i> {flightBokkingDetailData?.ticketPrice * seatCount}
                </div>
              </div>
             </div>
              

            </div>
          </div>
          <div className="w-[100%] mt-[7px]">
            <p
            className="bg-[#ef6614] text-[#fff] text-[19px] h-[45px] cursor-pointer rounded-[40px] flex justify-center items-center"
            onClick={()=>handlePayment(
              flightBokkingDetailData?.ticketPrice,
              "flight",
              flightBokkingDetailData?._id
            )}
            >Continue </p>
          </div>
           
        </div>
      </div>
    </div>
  )
}

export default FlightBooking