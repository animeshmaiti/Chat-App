import { useState } from 'react';
import {useAuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser}=useAuthContext();
    const handleInputError = (data) => {
        if (!data.username || !data.password) {
            toast.error("All fields are required");
            return false;
        }
        return true;
    }
    const login = async (inputData) => {
        const success = handleInputError(inputData);
        if (!success) return;
        setLoading(true);

        try {
            const response = await fetch("/api/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message || "An error occurred");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
  return {loading, login};
}
