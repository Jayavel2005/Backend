export const defaultRoute = (req, res) => {
    res.send("Hello ");
}

export const createuser = (req, res) => {
    console.log(req.body.email);

    res.status(201).send("form recieved");
}