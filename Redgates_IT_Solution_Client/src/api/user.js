import { axiosPrivate } from "./axios";

const controller = new AbortController();

export const signup = async (params)=>{
    return await axiosPrivate.post('/signup',params, {
        headers:{"Content-Type":"application/json"},
        withCredentials: true
    })
}

export const signin = async (params)=>{
    return await axiosPrivate.post('/signin',params, {
        headers:{"Content-Type":"application/json"},
        withCredentials: true
    })
}