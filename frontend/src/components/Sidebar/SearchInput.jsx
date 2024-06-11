import {useState} from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../hooks/useConversation";
import { useGetAllUsers} from "../hooks/useGetConversations";
import toast from "react-hot-toast";

export const SearchInput = () => {
  const [search, setSearch] = useState("");
  const {setSelectedConversation}=useConversation();
  const {users}=useGetAllUsers();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length <3 ) {
      return toast.error("Search query must be at least 3 characters long");
    }
    const user = users.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
    if (user) {
      setSelectedConversation(user);
      setSearch("");
    }else{
      toast.error("No user found with that name");
    }
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
