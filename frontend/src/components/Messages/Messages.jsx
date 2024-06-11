import { useEffect, useRef } from "react";
import { Message } from "./Message";
import { useGetMessages } from "../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useListenMessages } from "../hooks/useListenMessages";

export const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    if (messages.length > 0) {
      const timeoutId = setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timeoutId); // Clear timeout if messages change quickly
    }
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center text-gray-400">No messages yet</p>
      )}
    </div>
  );
};
