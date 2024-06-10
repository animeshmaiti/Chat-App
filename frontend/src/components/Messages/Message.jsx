import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import useConversation from '../hooks/useConversation';
import { extractTime } from '../utils/extractTime';

export const Message = ({message}) => {
  const {authUser}=useAuthContext();
  const {selectedConversation}=useConversation();
  const fromMe=message.senderId===authUser._id;
  const chatClass=fromMe?'chat-end':'chat-start';
  const profilePic=fromMe?authUser.profilePic:selectedConversation.profilePic;
  const bubbleBgColor=fromMe?'bg-blue-500':'';
  const formattedTime = extractTime(message.createdAt);
  const shakeClass=message.shouldShake?'shake':'';

  return (
    <div className={`chat ${chatClass}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic}/>
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>
        <div className='chat-footer opacity-100 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}
