import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser}=useAuthContext();
    const signup = async (inputData) => {
        const success = handleInputError(inputData);
        if (!success) return;
        console.log(inputData);
        setLoading(true);

        try {
            const response = await fetch("/api/auth/signup",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message || "An error occurred");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return {loading, signup};
}

function handleInputError(data){
    if (!data.fullName || !data.username || !data.password || !data.gender) {
        toast.error("All fields are required");
        return false;
    }
    if (data.password !== data.cPassword) {
        toast.error("Passwords do not match");
        return false;
    }
    return true;
}