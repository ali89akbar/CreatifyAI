
import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import 'dotenv/config';
import axios from "axios";
import fs from 'fs'
import 
import {v2 as cloudinary} from 'cloudinary';
const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle= async(req,res)=>{
     try {
        const {userId} = req.auth();
        const {prompt,length} = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >= 10)
        {
            return res.json({success:false,error:"Free usage limit exceeded. Please upgrade to premium plan."});
        }
        const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature:0.7,
    max_tokens: length,
});
const content = response.choices[0].message.content;
await sql`INSERT INTO creations(user_id,prompt,content,type) values(${userId},${prompt},${content},'article')`;
if(plan !== 'premium')
{
    await clerkClient.users.updateUserMetadata(userId,{
        privateMetadata:{
            free_usage:free_usage + 1
        }
    })
}
res.json({success:true,content});

     } catch (error) {
       console.log(error.message)
       res.json({success:false,error:error.message});
        
     }
}

export const generateBlogTitle = async(req,res)=>{
     try {
        const {userId} = req.auth();
        const {prompt} = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >= 10)
        {
            return res.json({success:false,error:"Free usage limit exceeded. Please upgrade to premium plan."});
        }
        const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature:0.7,
    max_tokens: 100,
});
const content = response.choices[0].message.content;
await sql`INSERT INTO creations(user_id,prompt,content,type) values(${userId},${prompt},${content},'blog_title')`;
if(plan !== 'premium')
{
    await clerkClient.users.updateUserMetadata(userId,{
        privateMetadata:{
            free_usage:free_usage + 1
        }
    })
}
res.json({success:true,content});

     } catch (error) {
       console.log(error.message)
       res.json({success:false,error:error.message});
        
     }
}

export const generateImage = async(req,res)=>{
     try {
        const {userId} = req.auth();
        const {prompt,publish} = req.body;
        const plan = req.plan;
        console.log(plan)

        if(plan !== 'premium' && free_usage >= 10)
        {
            console.log(plan)
            return res.json({success:false,error:"Free usage limit exceeded. Please upgrade to premium plan."});
        }
       
       const formData = new FormData()
       formData.append('prompt', prompt)
       console.log(formData)
       
       // Fixed: Proper axios configuration with responseType in config object
       const response = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
        headers: {
            'x-api-key': process.env.CLIPDROP_API_KEY,
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer', // Moved to correct location
       });

       // Fixed: Proper base64 conversion from arraybuffer
       const base64Image = `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
       
       const uploadResponse = await cloudinary.uploader.upload(base64Image, {
          folder: "clipdrop",
          resource_type: "image",
       });

       const { secure_url } = uploadResponse
       console.log(secure_url)

       await sql`INSERT INTO creations(user_id,prompt,content,type,publish) values(${userId},${prompt},${secure_url},'image',${publish ?? false})`;

       res.json({success:true,content:secure_url});

     } catch (error) {
       console.log(error.message)
       res.json({success:false,error:error.message});
     }
}

export const RemoveImageBackground = async(req,res)=>{
     try {
        const {userId} = req.auth();
        const {image} = req.file;
        const plan = req.plan;

        if(plan !== 'premium')
        {
            console.log(plan)
            return res.json({success:false,error:"Free usage limit exceeded. Please upgrade to premium plan."});
        }
       
       
       const uploadResponse = await cloudinary.uploader.upload(image.path, {
        transformation:[
        {effect:'background_removal',
            background_removal:'remove_the_background'
        }
        ]  
       });

       const { secure_url } = uploadResponse
       console.log(secure_url)

       await sql`INSERT INTO creations(user_id,prompt,content,type) values(${userId},'Remove background from image',${secure_url},'image')`;

       res.json({success:true,content:secure_url});

     } catch (error) {
       console.log(error.message)
       res.json({success:false,error:error.message});
     }
}


export const RemoveImageObject = async(req,res)=>{
     try {
        const {userId} = req.auth();
        const {object} = req.body();
        
        const {image} = req.file;
        const plan = req.plan;

        if(plan !== 'premium')
        {
            console.log(plan)
            return res.json({success:false,error:"Free usage limit exceeded. Please upgrade to premium plan."});
        }
       
       
       const uploadResponse = await cloudinary.uploader.upload(image.path);

       const { public_id} = uploadResponse
       console.log(secure_url)
     const imageUrl = cloudinary.url(public_id, {
        transformation: [{effect: `gen_remove:${object}`}],
         resource_type: "image"
     })

       await sql`INSERT INTO creations(user_id,prompt,content,type) values(${userId},${`Removed ${object} from image`},${imageUrl},'image')`;

       res.json({success:true,content:imageUrl});

     } catch (error) {
       console.log(error.message)
       res.json({success:false,error:error.message});
     }
}


export const resumeReview = async(req,res)=>{
     try {
        const {userId} = req.auth();
        
        const resume = req.file;
        const plan = req.plan;

        if(plan !== 'premium')
        {
            return res.json({success:false,error:"Free usage limit exceeded. Please upgrade to premium plan."});
        }
       
       
       if(resume.size > 5 * 1024 * 1024)
       {
        return res.json({success:false,error:"File size exceeds 5MB limit."});
       }
       const dataBuffer = fs.readFileSync(resume.path);
       const pdfData = await pdf

       await sql`INSERT INTO creations(user_id,prompt,content,type) values(${userId},${`Removed ${object} from image`},${imageUrl},'image')`;

       res.json({success:true,content:imageUrl});

     } catch (error) {
       console.log(error.message)
       res.json({success:false,error:error.message});
     }
}