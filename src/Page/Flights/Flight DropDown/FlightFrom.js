import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../components/Context';
import Classes from "../Flights.module.css";
import FlightIcon from "@mui/icons-material/Flight";
import { ListItemButton } from '@mui/material';

const FlightForm = ({onclose}) =>{
    const [airport,setAirport] = useState("");
    const [airportDetail,setAirportDetail]= useState([]);
    const [liData,setLiData]= useState(false);
    const{setAirportTo}= useAuth();

    const handleLiData=(e) =>{
        const input = e.target.value;
        setAirport(input);
    };
   
    useEffect(()=>{
        const api = `https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightId}`;

        const fetchData = () =>{
            fetch(api,{
                method: "GET",
                headers:{
                    projectID:"f104bi07c490",
                },
            })
            .then((response)=> response.json())
            .then((flightdata)=>{
                const data = flightdata.data.airports;
                setAirportDetail(data);
            });
        };
        fetchData();
    }, [airport]);

  return (
    <div className="w-80 h-55 absolute bg-slate-50 lg:mt-10 mt-[5em] p-2 rounded ml-1 z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="flex flex-row gap-4 items-center">
            <img
            src="https://www.easemytrip.com/Content/img/icon-search.svg"
            className="items-center"
            alt='search icon'
            />
            <input
            className="w-11/12 p-2 border-none outline-none bg-slate-50"
            />
        </div>

        <div className="w-full h-44 overflow-auto scrollbar">
            <ul className="cursor-pointer">
                {airportDetail.map((data,index)=>{
                    <ListItemButton
                    onClick={()=>{
                        handleLiData(data.city,data.name,data,iata_code)
                    }}
                    className="mt-2"
                    key={index}
                    >
                        <div className={Classes.listFlightTo}>
                            <FlightIcon className={Classes.flightIcon}/>
                            <spn className="text-base font-semibold cursor-pointer">
                                {data.city}
                            </spn>
                            <div className={Classes.spanFlightTo}>
                                <p className="text-sm cursor-pointer">{data.name}</p>
                                <p className="text-sm cursor-pointer">{data.country}</p>
                            </div>
                        </div>
                    </ListItemButton>
                })}
            </ul>
        </div>
    </div>
  )
}

export default FlightForm;