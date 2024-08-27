import React, { useState } from 'react'
import Classes from"./Navbar.module.css";
import{useAuth} from "../Context";
import Modal from "@mui/material/Modal";

function ModalSignUp(){
const{openSignUp,setOpenSignUp}= useAuth();
const handleCloseSignUp= ()=>setOpenSignUp(false);
const[firstName,setFirstName]= useState("");
const[lastName,setLastName]= useState("");
const[mail,setMail]=useState("");
const[password,setPassword]= useState("");
const[errorMessage,setErrorMessage]=useState("");
const[correctCredentials,setCorrectCredentials]=useState(false);
const emailPattern = /^\S+@+\s+\.\s+$/;

function mailInput(e){
    const mailSet = e.target.value;
    setMail(mailSet);
}
function passwordInput(e){
    const mailSet = e.target.value;
    setMail(mailSet);
}
function firstNameInput(e){
    const firstNameSet = e.target.value;
    setPassword(passwordSet);
}

function lastNameInput(e){
    const lastNameSet = e.target.value;
    setFirstName(firstNameSet);

}
async function handleBusSignup() {
    if(!firstName){
        setCorrectCredentials(false);
        setErrorMessage("First name is required.");
        return;
    }
    if(!mail || !password){
        setCorrectCredentials(false);
        setErrorMessage("Email and Password required.");
    }
    if(!emailPattern.test(mail)){
        setCorrectCredentials(false);
        setErrorMessage("Email and Password are required.");
        return;

    }
    try{
        const response = await fetch(
            "https://academics.newtonschool.co/api/v1/bookingportals/signup",
            {
                method: 'POST',
                header:{
                    "CONTENT-TYPE": "application/json",
                    projectID: "f104bi07c490",
                },
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`,
                    email:mail,
                    password:password,
                    appType: "facebook",
                }),
            }
           
        );
        if(response.status===403){
            setCorrectCredentials(false);
            setErrorMessage("Email is already registered.Please go and log in instead");
        }else if(response.ok){
           handleCloseSignUp();
        }else{
            const errorData = await response.json();
            setErrorMessage(errorData.message);
            setCorrectCredentials(true);
            handleCloseSignUp();
        }

    }catch(error){
         console.error("Error:",error);
         setErrorMessage("An error occured.Please try again")
    }
    
}
 return (
    <div>
    <Modal 
    open={openSignUp}
    aria-labelledby="modal-modal-title"
    ariadescribedby = "modal-modal-description"
    >
        <div className={Classes.ModalSignUpSection}>
            <div className="w-[95%] flex flex-col gap-[10px]">
                <div className="text-[22px] text-[#000] font-bold bg-[#fff] mt-[15px]">
                    <p>Signup or create </p>
                </div>
                <div className={Classes.closeBtnSignUp} onClick={handleCloseSignUp}></div>
                <p className="errorDisplay" style={{display: correctCredentials? "none": "", color:"red", textAlign:"center"}}>{errorMessage}</p>
                <div className="w-[100%] flex gap-[2%] mt-[100px]">
                    <input
                    type="text"
                    className="w-[49%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
                    value={firstName}
                    onChange={firstNameInput}
                    placeholder='First name'
                    />
                     <input
                    type="text"
                    className="w-[49%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
                    value={lastName}
                    onChange={lastNameInput}
                    placeholder='Last name'
                    />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <input
                    type="email"
                    className="w-[100%] p-[10px] rounded-[0.5px] bprder-solid-gray-200 focus:outline-none"
                    value={mail}
                    onChange={mailInput}
                    placeholder="Email address"/>
                    <input
                    type="password"
                    className="w-[100%] p-[10px] rounded-[0.5px] bprder-solid-gray-200 focus:outline-none"
                    value={password}
                    onChange={passwordInput}
                    placeholder="New password"/>

                </div>
                <div className="w-[100%] flex items-center justify-center mt-[10px]">
                    <div className="text-[18px] text-[#fff] w-[100%] h-[43px] font-[400px] bg-[#EF6614] cursor-pointer flex items-center justify-center" onClick={handleBusSignup}>Continue</div>
                </div>
                <div className="w-[100%] flex justify-center items-center mt-[10px] mb-[15px]">
                    <p className="w-[100%] text-[11px] text-[#8A8686] flex items-center">By logging in ,I understand & agree to EaseMyTrip terms of use and privacy policy</p>
                </div>

            </div>

        </div>
    </Modal>
   </div>
  )
}

export default ModalSignUp;