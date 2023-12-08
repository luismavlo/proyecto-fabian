import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const uploadMultiple = (filename) => upload.array(filename, 3);
