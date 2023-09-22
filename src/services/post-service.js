import { myAxios,myPrivateAxios } from "./helper"


export const createPost=(data)=>{
    console.log("in2")
    return myPrivateAxios.post(`/user/${data.userId}/category/${data.categoryId}/posts`,data)
    .then(response=>{
        console.log(response)
        return response.data
    })
}