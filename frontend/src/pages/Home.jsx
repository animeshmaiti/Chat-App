import { SideBar } from "../components/Sidebar/SideBar";
import { MessageContainer } from "../components/Messages/MessageContainer";

export const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <SideBar />
      <MessageContainer/>
    </div>
  );
};
