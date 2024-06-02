export const signup = (req, res) => {
    try {
        const { fullName, username, password,cPassword,gender}= req.body;
    } catch (error) {
        
    }
};

export const login = (req, res) => {
    res.send("login");
}

export const logout = (req, res) => {
    res.send("logout");
}