export const defultController = (req, res) => {
    res.send('Hello World');
}

export const usernameController = (req, res) => {
    const username = req.params.userName;
    res.send(`Hello ${username}`);

}

export const searchController = (req, res) => {
    const keyword = req.query.keyword || "Guest";
    const greet = req.query.greet || "Hello";
    res.send(`Searching for ${keyword} with greeting ${greet}`);
}

export const createUser = (req, res) => {
    const { name, email } = req.body;
    res.status(201).send(`Creating user ${name} with email ${email}`)


}