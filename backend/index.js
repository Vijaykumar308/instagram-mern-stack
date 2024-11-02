import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    return res.status(200).json({
        message:"I'am coming from backend",
        success:true
    });
})

// middlewares
app.use(express.json());
app.use(cookieParser);
app.use(urlencoded({extended:true}));

const corsOptions = {
    origin: "http:localhost:5173",
    credential: true
}

app.use(cors(corsOptions));


app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
});