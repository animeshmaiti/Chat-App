import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save(); 1
        // await newMessage.save(); 2
        await Promise.all([conversation.save(), newMessage.save()]); // 1 and 2 will run parallely

        //socketIo
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
           io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sending message: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }
        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("Error in getting message: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}