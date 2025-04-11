import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { passport } from "./utils/passportSetup.js";
import session from "express-session";
import { ApiResponse } from "./utils/ApiResponse.js";
import { ApiError } from "./utils/ApiError.js";
import cron from 'node-cron';
import { User } from "./models/user.model.js";
import { webhookHandler } from "./controllers/payment.controller.js"




const app = express();
app.post("/webhook", express.raw({ type: "application/json" }), webhookHandler);



app.use(session({
  secret: process.env.SESSION_SECRET || "supersecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set `true` if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cors({ 
  origin: 'http://localhost:5173', // Allow your frontend
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(cookieParser());



app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/signUp",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard"); // Redirect after login
  }
);


app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:5173");
  });
});

app.get("/auth/user", (req, res) => {
  if (req.user) {
    res.status(200).json(new ApiResponse(200,req.user,"User Fetched Sucessfully"))
  } else {
    throw new ApiError(401,"Not Authenticated")
  }
});

cron.schedule('45 15 * * *', async (req,res) => {
  try {
    // Find all users that are currently logged in or active (you can customize this based on your needs)
    const users = await User.find({});

    // Iterate over each user to perform the logout action
    users.forEach(async (user) => {
      // Add your logout logic here, similar to the one in your original `logout` handler
      const options = {
        httpOnly: true,
        secure: true,
      };
      user.isLoggedIn=false;
      await user.save({validateBeforeSave:false})
      console.log(`User ${user.fullName.firstName} logged out at 3:10pm`);
    });
  } catch (error) {
    console.error('Error during scheduled logout:', error);
  }
});


//Routes
import authRoute from "./routes/user.route.js";
import cartRoute from "./routes/cart.routes.js"
import orderRoute from "./routes/order.routes.js"
import paymentRoute from "./routes/payment.route.js"


app.use("/api/v1/auth", authRoute);
app.use("/api/v1/cart",cartRoute)
app.use("/api/v1/order",orderRoute)
app.use("/api/v1/payment",paymentRoute)


app.get("/", (req, res) => {
  res.send("Hello, this is a test response from localhost!");
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});

export { app };
