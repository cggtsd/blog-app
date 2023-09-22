import { myAxios } from "./helper"

export const signup=data=>{
    return myAxios.post('/auth/register',data)
    .then(response=>{
        console.log(response)
        return response.data
    })
}


export const loginUser= (user)=>{
    return myAxios.post('/auth/login',user).then(response=>{
        console.log(response)
        return response.data
    })
}