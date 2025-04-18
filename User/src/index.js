import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'

dotenv.config();
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is listening on port: ${process.env.PORT}`);  
    })
})
.catch((err)=>{
    console.log("Mongo Db Connection Failed !!!",err);
    
})