import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversation from "./useConversation";
import notificationSound from "../../assets/notification.mp3";


export const useListenMessages = () => {
    const {socket}=useSocketContext();
    const {messages,setMessages} = useConversation();
    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (newMessage) => {
                newMessage.shouldShake=true;
                const sound = new Audio(notificationSound);
                sound.play();
                setMessages([...messages, newMessage]);
            });
            return () => {
                socket?.off("newMessage");
            };
        }
    }, [socket,setMessages,messages]);
}
