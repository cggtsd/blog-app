//isloggedin 
export const isLoggedIn=()=>{
    let data=sessionStorage.getItem('data')
    if(data==null)
     return false;
    else
      return true;
}

//set jwt token in session storage

export const doLogin= (data,next)=>{

    sessionStorage.setItem('data',JSON.stringify(data))
    next()

}
 

//remove from sessionstorage

export const doLogout=(next)=>{
    sessionStorage.removeItem('data')
    next()
}

//get current user details
export const getCurrentUserDetails=()=>{
    if(isLoggedIn()){
        return JSON.parse(sessionStorage.getItem('data')).user
    }
    else
    return undefined;
}

export const getToken=()=>{
   if(isLoggedIn()){
    return JSON.parse(sessionStorage.getItem('data'))?.token;
   }
   return null;
}