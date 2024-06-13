import { useEffect } from "react";
import { Conversation } from "./Conversation";
import { useGetConversations } from "../hooks/useGetConversations";
import { getRandomEmoji } from "../utils/emoji";
import { useSocketContext } from "../context/SocketContext";

export const Conversations = () => {
  const { loading, conversations,setConversations } = useGetConversations();
  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket) {
      socket.on('conversationUpdated', (updatedConversation) => {
        setConversations(prevConversations => {
          const index = prevConversations.findIndex(conversation => conversation._id === updatedConversation._id);
          if (index !== -1) {
            prevConversations[index] = updatedConversation;
            return [...prevConversations];
          } else {
            return [...prevConversations, updatedConversation];
          }
        });
      });

      // Cleanup event listener on component unmount
      return () => {
        socket.off('conversationUpdated');
      };
    }
  }, [socket, setConversations]);


  console.log(conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation,idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner ms-auto"></span>
      ) : null}
    </div>
  );
};
