import { ButtonWarning } from "../components/ButtonWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"

export const Signup = () => {

    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const[password, setPassword] = useState("")
    const[username, setUsername] = useState("")
    const navigate = useNavigate()
    
    return <div className="bg-indigo-950 h-screen flex justify-center">
        <div className="flex flex-col justify-center"> 
            <div className="rounded-lg bg-indigo-100 w-100 text-center p-2 h-max px-4">
                <Heading label = {"Sign Up"}/>
                <SubHeading label = {"Enter your information to create an account"}/>
                <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
                <InputBox
                onChange={(e)=>{
                    setLastName(e.target.value);
                }} placeholder="Enter your Last Name" label={"Last Name"} />
                <InputBox onChange={(e)=>{
                    setUsername(e.target.value);
                }} placeholder={"Enter email"} label = {"Email"}/>
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value);
                }} placeholder={"Enter Password"} label = {"Password"}/>
                <div className="pt-4">
                    <Button onClick={async()=>{
                        const response = await axios.post("http://localhost:3001/api/v1/user/signup",{
                            firstName,
                            lastName,
                            username,
                            password        
                        });
                        localStorage.setItem("token", response.data.token)
                        navigate("/")
                    }} label = {"Sign Up"}/>
                </div>
                <ButtonWarning label = {"Already have an account?"} buttonText = {"Sign In"} to={"/signin"}/>
            </div>
        </div>
    </div>
}

