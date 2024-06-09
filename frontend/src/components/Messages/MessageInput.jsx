import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { useSendMessages } from '../hooks/useSendMessages';

export const MessageInput = () => {
  const[message,setMessage]=useState('');
  const {loading,sendMessage}=useSendMessages();

  const handleSubmit= async(e)=>{
    e.preventDefault();
    await sendMessage(message);
    setMessage('');
  }
  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
          placeholder='Send a message'
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />
        <button className=' absolute inset-y-0 end-0 flex items-center pe-3' type='submit'>
          {loading?<span className='loading loading-spinner'></span>:<BsSend className='text-2xl text-gray-300' />}
        </button>
      </div>
    </form>
  );
};
