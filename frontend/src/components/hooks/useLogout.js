import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";


export const useLogout = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/auth/logout",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            localStorage.removeItem("chat-user");
            setAuthUser(null);
        } catch (error) {
            console.log(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

  return {loading, logout};
}
