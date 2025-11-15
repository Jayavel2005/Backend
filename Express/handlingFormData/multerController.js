import multer from "multer";

const storage = multer.diskStorage(
    {
        destination: "uploads",
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "_" + Date.now() + file.originalname);
        }
    }
);

const upload = multer({
    storage,
    limits: {
        fileSize: 1024000
    }
});


export default upload;