export const usernameController = (req, res) => {
    const username = req.params.userName;
    res.send(`Hello ${username}`);

}


export const searchController = (req, res) => {
    const keyword = req.query.keyword;
    const greet = req.query.greet;
    res.send(`Searching for ${keyword} with greeting ${greet}`);
}