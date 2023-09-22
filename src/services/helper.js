import axios from "axios"
import { toast } from "react-toastify"
import { getToken } from "../auth";

export const BASE_URL='http://localhost:8080/api/v1'

export const myAxios=axios.create({
    baseURL:BASE_URL
});

export const myPrivateAxios=axios.create({
    baseURL:BASE_URL
});

myPrivateAxios.interceptors.request.use((config)=>{
    const token=getToken();
    console.log(token)
    if(token){
     config.headers.Authorization=`Bearer ${token}` 
     return config;
    } 
  
 
},error=>Promise.reject(error))

