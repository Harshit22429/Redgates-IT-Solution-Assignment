import React from 'react';
import { useState,useEffect } from "react"
import '../style/signup.css';
import axios from '../api/axios';
import { Link } from "react-router-dom"
import Reduxtodo from './Reduxtodo'
const Signup_URL = "/signup"
const Signun = () => {
    const [success,setSuccess] = useState(false)
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [cnfrmpwd, setCnfrmPwd] = useState('')
    console.log(email, pwd)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (pwd == cnfrmpwd) {
                const response = await axios.post(Signup_URL,
                    { email, pwd},
                    {
                        headers: { "Contetn-Type": "application/json" },
                        credentials: true
                    })                
                setSuccess(true);
                setEmail("");
                setPwd("");
                setCnfrmPwd("");
            } else {
                alert("password is not equal confirm password")
            }
        } catch (error) {
            const errorAsResponse = error.response.data.error 
            console.log(errorAsResponse)
            alert(`Error :  ${errorAsResponse}`)
        }
    }
    useEffect(()=>{
        try{
      const accessToken = localStorage.getItem("accessToken")
      console.log("from accesstoken : ",accessToken)
      if (accessToken){
        setSuccess(true)
      }}catch(error){
        console.log('from accessToken error : ', error.message)
      }
    })
    return (
        <>{success ? <Reduxtodo/>:
        
            <div class="main">
                <div class="register">
                    <h2>SignUp Here</h2>
                    <form action="post" id="register" onSubmit={handleSubmit}>
                        <label for="">Email :</label><br /><br />
                        <input type="email" name="email" id="name" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/><br /><br />
                        <label for="">Password :</label><br /><br />
                        <input type="password" name="password" id="password" placeholder="Enter your password" onChange={(e)=>setPwd(e.target.value)} /><br /><br />
                        <label for="">Confirm Password :</label><br /><br />
                        <input type="password" name="cfmpass" id="cfmpass" placeholder="Re-enter password" onChange={(e)=>setCnfrmPwd(e.target.value)}/><br /><br />
                        <input type="submit" value="Register" name="submit" id="submit" ></input>
                    </form>
                </div>
            <Link to="/signin">SignIn Here</Link>
            </div>
        }
        </>
    )
}

export default Signun;