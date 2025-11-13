

export const defaultRoute = (req, res) => {
    res.send("Hello ");
}

export const createuser = (req, res) => {
    console.log(req.body);

    res.status(201).send("form recieved");
}

export const uploadFile = (req, res) => {
    console.log(req.body);
    console.log(req.file);


    res.status(201).send(`file uploaded and the file name is ${req.file.originalname}`);
}

export const multipleFileUploads = (req, res) => {
    console.log(req.body);
    console.log(req.files);

    res.status(201).send("multiple files uploaded");

}


export const uploadImages = (req, res) => {
    console.log(req.files);
    res.status(201).send("multiple images uploaded");

}