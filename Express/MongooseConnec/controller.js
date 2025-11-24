export const defaultController = (req, res) => {
    res.cookie("testCookie", "cookieValue123",{maxAge : 60000});
    res.send("Default Controller is working");
}

export const fetchCookie  = (req, res) => {
    const cookieValue = req.cookies;
    console.log(cookieValue);
    
    res.json({cookies: cookieValue}); 
}

export const clearCookie = (req, res) =>{
    res.clearCookie("testCookie");
    res.send("Cookie cleared");
}