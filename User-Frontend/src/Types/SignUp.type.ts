export interface SignUpResponse{
    statuscode:number,
    data:object,
    success:boolean,
    message:string,
}

export interface ApiError{
    message:string
}

 export interface SignUpData{
    email:string,
    password:string,
    firstName:string,
    lastName:string,
    address:string
}