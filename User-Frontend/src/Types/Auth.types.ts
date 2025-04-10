export interface SignInResponse{
    statusCode:number,
    data:Data,
    message:string,
    success:boolean,
    
}

export interface Data{
    token:string,
    user:User,
}

export interface User{
    _id:string,
    email:string,
    phoneNo:number,
    fullName:{
        firstName:string,
        lastName:string
    }
}

export interface ApiError{
    message:string
}

 export interface UserData{
    email:string,
    password:string
}