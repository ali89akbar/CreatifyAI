import sql from "../configs/db.js";
import 'dotenv/config';
import nodemailer from "nodemailer";



export const getUserCreations = async(req,res) =>{
    try {
        const {userId} = req.auth();

      
        const creations = await sql `SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_At DESC`;
        
        res.json({success:true,creations});
        
    } catch (error) {
        res.json({success:false,error:error.message});
        
    }
}

export const getPublishedCreations = async(req,res) =>{
    try {
        const creations = await sql `SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

        
        res.json({success:true,creations});
        
    } catch (error) {
        res.json({success:false,error:error.message});
        
    }
}

export const toggleLikeCreation = async(req,res) =>{
    try {
        const {userId} = req.auth();
        const {id} = req.body;
        const [creation] = await sql `SELECT * FROM creations WHERE id = ${id}`
        if(!creation){
            return res.json({success:false,error:"Creation not found"});
        }
        const currentLikes = creation.likes; ;
        const userIdStr = userId.toString();
        let updatedLikes;
        let message;
        if(currentLikes.includes(userIdStr)){
            updatedLikes = currentLikes.filter(user => user !== userIdStr);
            message = "Creation Unliked";
        }
        else{
            updatedLikes = [...currentLikes,userIdStr];
            message = "Creation Liked";
        }
        const formattedArray = `{${updatedLikes.join(',')}}`
        await sql `UPDATE creations SET likes = ${formattedArray} :: text[] WHERE id = ${id}`;
        res.json({success:true,message});
        
    } catch (error) {
        res.json({success:false,error:error.message});
        
    }
}

export const getMailinfo = async(req,res)=>{
    try {

        const { to, subject} = req.body;
        const transporter= nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        })

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
        };
        await transporter.sendMail(mailOptions);
        res.json({success:true,message:"Email sent successfully"});
        
    } catch (error) {
        res.json({success:false, error:error.message})
        
    }
}