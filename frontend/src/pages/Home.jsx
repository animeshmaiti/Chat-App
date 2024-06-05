import React from "react";
import { SideBar } from "../components/SideBar";
import { MessageContainer } from "../components/MessageContainer";

export const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <SideBar />
      <MessageContainer/>
    </div>
  );
};
