import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken'

const userSchema = new Schema(
  {
    fullName: {
     firstName:{
      type:String,
     required:true
     },
     lastName:{
      type:String,
     required:true
     }
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    address: {
      type: String,
      requried: true,
    },
    password: {
      type: String,
      unique: true,
      required: [true, "Password must be required"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      ],
    },
    isLoggedIn:{
      type:Boolean,
      default:false
    }
    
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = function(){
    return JWT.sign(
        {
            _id:this._id,
            fullName:this.fullName,
            email:this.email,
        },
        process.env.TOKEN_SECRET,
        {expiresIn:process.env.EXPIRY_TOKEN}
    )
}

export const User = mongoose.model("User", userSchema);
