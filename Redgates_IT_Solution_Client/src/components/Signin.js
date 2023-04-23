import React, { useState, useEffect } from 'react';
import '../style/signin.css';
import axios from "../api/axios"
import { Link } from 'react-router-dom';
import Reduxtodo from './Reduxtodo';
const Signin_URL = '/signin'
const Signin = () => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState("")
    const [success, setSuccess] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(Signin_URL,
                { email, pwd },
                {
                    headers: { "Content-Type": "application/json" },
                    credentials: true
                }
            )
            localStorage.setItem("accessToken",response.data.stsTokenManager.accessToken)
            setSuccess(true)
            setEmail("")
            setPwd("")
        } catch (error) {
            const errorAtLogin = error.response.data.error
            alert(`Error : ${errorAtLogin}`)
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
    console.log(success)
    return (
        <>{success ? <Reduxtodo/> :
            <div class="main">
                <div class="register">
                    <h2>Login Here</h2>
                    <form action="post" id="register" onSubmit={handleSubmit}>
                        <label for="">Email :</label><br /><br />
                        <input type="email" name="email" id="name" placeholder="Enter Your email" onChange={(e)=>setEmail(e.target.value)}/><br /><br />
                        <label for="">Password :</label><br /><br />
                        <input type="password" name="password" id="password" placeholder="Enter Your password" onChange={(e)=>setPwd(e.target.value)}/><br /><br />
                        <input type="submit" value="Login" name="submit" id="submit"></input>
                    </form>
                </div>
                <Link to='/signup'>SignUp Here</Link>
            </div>
        }
        </>
    )
}

export default Signin;