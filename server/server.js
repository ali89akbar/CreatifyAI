import express, { response } from "express";
import cors from "cors";
import 'dotenv/config';
import {clerkMiddleware, requireAuth} from '@clerk/express';
import aiRouter from "./route/aiRoute.js";
import connectCloudinary from "./configs/Cloudinary.js"
import userRouter from "./route/userRoute.js";
const app = express();
await connectCloudinary();
app.use(cors({
  origin: [
    "http://localhost:5173",   // frontend local
   "https://develop.d1754oldj9p9jn.amplifyapp.com/" // production frontend (Amplify / S3 / CloudFront)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json())
app.use(clerkMiddleware());
app.use(requireAuth());
app.get("/health", (req,res)=> res.sendStatus(200));

app.use('/api/ai',aiRouter)

app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send('Server is Live!');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${process.env.PORT}`));