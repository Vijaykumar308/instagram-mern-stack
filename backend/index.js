import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./utlis/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
dotenv.config({});

const app = express();
const PORT = process.env.PORT || 8000;

// app.get("/", (req, res) => {
//     return res.status(200).json({
//         message:"I'am coming from backend",
//         success:true
//     });
// })
// app.get("/u", (req, res) => {
//     try {
//         console.log('working');
//         return res.status(201).json({
//             success:true,
//             message:"route working..."
//         })
//     }
//     catch(err) {
//         console.log('err:', err);
//     }
// });

const corsOptions = {
    origin: "http:localhost:5173",
    credential: true
}

app.use(cors(corsOptions));

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.use(urlencoded({extended:true}));



app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});