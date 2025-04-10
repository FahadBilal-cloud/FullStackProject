export interface UserResponse{
    statuscode : number,
    data:Data,
    message:String,
    success:boolean
    
}

export interface Data{
    _id:string,
    fullName:string,
    email:string,
    googleId:number,
}





