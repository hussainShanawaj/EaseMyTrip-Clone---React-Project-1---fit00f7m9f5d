import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../components/Context';
import { ListItemButton } from '@mui/material';
import Classes from "../Flights.module.css";
import FlightIcon from "@mui/icons-material/Flight";


const FlightTo= ({onclose})=> {
    const [airport,setAirport] = useState("");
   const [airportDetail,setAirportDetail]= useState([]);
   const [liData,setLiData]= useState(false);
   const{setAirportTo}= useAuth();
   
   const handleLiData = (city,name,iata_code)=>{
   setAirportTo([city,name,iata_code]);
   setLiData(true);
   onclose(liData);
   }
   const handleChange = (e)=>{
    const input = e.target.value;
    setAirport(input);
   
   };
   useEffect(()=>{
    const api = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${airport}"}`;
     const projectId ="f104bi07c490";
    const fetchData = ()=>{
        fetch(api,{
            method:"GET",
            headers:{
                projectID:projectId,

            },
        })
        .then((response)=>response.json())
        .then((flightdata)=>{
            const data = flightdata.data.airports;
            setAirportDetail(data);
        });

    };
    fetchData();
   },[airport]);

  

  return (
 <div className="w-80 h-55 absolute bg-slate-50 lg:mt-10 mt-[5em] p-2 rounded ml-1 z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
    <div className="flex flex-row gap-4 items-center">
        <img 
        src="https://www.easemytrip.com/Content/img/icon-search.svg"
        className="items-center"
        alt="search icon"
        />
        <input
        className="w-11/12 p-2 border-none outline-none bg-slate-50"
        onChange={handleChange}
        />

    </div>
    <div className="w-full h-44 overflow-aut scrollbar">
        <ul className="cursor-pointer">
            {airportDetail.map((data,index)=>{
                <ListItemButton
                onClick={()=>{
                    handleLiData(data.city,data.name,data.data_code);
                }}
                className="mt-2"
                key={index}
                >
                    <div className={Classes.listFlightTo}>
                        <FlightIcon className={Classes.flightIcon}/>
                        <span className="text-base font-semibold cursor-pointer">
                            {data.city}
                        </span>
                        <div className={Classes.spanFlighTo}>
                            <p className='text-sm cursor-pointer'>{data.name}</p>
                            <p className='text-sm cursor-pointer'>{data.country}</p>
                        </div>
                    </div>

                </ListItemButton>
            })}
        </ul>
    </div>
 </div>
    
  )
}

export default FlightTo;