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

export const updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    res.status(200).send(`Updating user ${userId} with name ${name} and email ${email}`);
}

export const deleteUser = (req, res) => {
    const userId = req.params.id;
    res.status(204).send(`Deleting user ${userId}`);
}

// multiple route parameters

export const getUser = (req, res) => {
    const { name, id } = req.params;
    res.send(`Getting user ${name} with id ${id}`);

}