import User from "../models/user.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        // not sending the logged in user in the list of users
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        console.log("Error in getting users: ",error);
        res.status(500).json({error:"Internal server error"});
    }
};