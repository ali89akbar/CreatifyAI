import express, { response } from "express";
import cors from "cors";
import 'dotenv/config';
import {clerkMiddleware, requireAuth} from '@clerk/express';


const app = express();

app.use(cors());
app.use(express.json())
app.use(clerkMiddleware());
app.use(requireAuth());


app.get('/',(req,res)=>response.send('Server is Live!'))


app.listen(process.env.PORT || 3000, () => console.log(`Server is running on port ${process.env.PORT || 3000}`));