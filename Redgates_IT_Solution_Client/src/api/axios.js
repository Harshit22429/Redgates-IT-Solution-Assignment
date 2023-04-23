import axios from "axios";

const Base_Url = "http://localhost:3500"

export default axios.create({
    baseURL : Base_Url
})

export const axiosPrivate = axios.create({
    baseURL:Base_Url,
    headers:{'Content-Type':'application/json'},
    withCrendtials: true
})