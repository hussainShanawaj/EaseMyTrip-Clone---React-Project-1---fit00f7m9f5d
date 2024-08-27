import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../components/Context';

function FlightPayment() {
    const[flightError,setFlightError]= useState(null);
    const [flightDetails,setFlightDetails]= useState([]);
    const{flightId,AirportForm,AirportTo,flightdepartureDate}= useAuth();
    const departureDay = moment(flightdepartureDate).format("ddd");
    const departureDate = moment(flightdepartureDate).format("DD MM YYYY");

    const fetchFlightDetails = async ()=>{
        try{
            const projectID = "f104bi07c490";
            const response = await fetch(
                `https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightId}`,
                {
                    method:"GET",
                    headers:{
                        projectID,
                    },
                }
            );
            if(response.ok){
                const data = await response.json();
                setFlightDetails(data?.data);
            }else{
                const errorData = await response.json();
                setFlightDetails(errorData.message);
            }
        } catch (error){
                console.error("Error fetching flight Data", error);
                setFlightError("Failed to fetch flight data");
        }
    };
    useEffect(()=>{
           fetchFlightDetails();
    },[])

  return (
    <div className="h-full w-full flex flex-col items-center">
        <div className="w-[98%] mt-2 bg-[#f6f4f4] rounded-[20px] p-2">
            <div className="bg-[219f3] rounded-[20px] text-[#fff] flex justify-center items-center py-2">
                <p>Flight Information</p>
            </div>
        </div>
        <div className="w-[98%] h-[18vh] max-[600px]:h-auto flex justify-center items-center mt-4">
            <div className="w-full h-full flex flex-col">
                <div className="text-[15px] text-[#000] mb-2">
                    <span>{flightDetails?.source}</span> → <span>{flightDetails?.destination}</span>
                </div>
                <div className="w-full h-[75%] flex">
                    <div className="w-[32%] flex flex-col items-center">
                        <div className="text-[20px] text-[#333] font-[600]">
                            {flightDetails?.departureTime}
                        </div>
                        <div  className="text-[13px] text-[#525252] font-[600]">
                            <span>{AirportForm[0]}</span> <span>{AirportForm[2]}</span>
                        </div>
                        <div className="text-[12px] text-[#333]">
                        <span>{departureDay}</span>-<span>{departureDate}</span>
                        </div>
                    </div>
                    <div className="w=[32%] flex flex-col items-center">
                        <img className="w-[10%] max-[600px]: w-[25%] h-[4vh] overflow-hidden"
                        src="https://flight.easemytrip.com/Content/img/split-img.png"
                        alt="Flight Split Icon"
                        />
                        <div className="text-[12px] text-[#333]">
                            <span>{flightDetails?.duration}h 10m</span>
                        </div>
                    </div>
                    <div className="w-[32%] flex flex-col items-center">
                        <div className="text-[20px] text-[#333] font-[600]">
                            {flightDetails.arrivalTime}
                        </div>
                        <div className="text-[13px] text-[#525252] font-[600]">
                            <span>{AirportForm[0]}</span>-<span>{AirportForm[2]}</span>
                        </div>
                        <div className="text-[12px] text-[#333]">
                            <span>{departureDay}</span>-<span>{departureDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {flightError &&(
            <div className="mt-4 text-red-500">
                {flightError}
                </div>
        )}
    </div>
  )
}

export default FlightPayment