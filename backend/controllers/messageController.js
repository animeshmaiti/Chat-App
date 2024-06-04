import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

export const sendMessage=async(req,res)=>{
    try {
        const {message}=req.body;
        const {id: receiverId}=req.params;
        const senderId= req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
            // await conversation.save(); 1
            // await newMessage.save(); 2
            await Promise.all([conversation.save(),newMessage.save()]); // 1 and 2 will run parallely
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sending message: ",error);
        res.status(500).json({error:"Internal server error"});
    }
}