// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.originalname}`);
//   }
// });

// const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//     if (file.mimetype === 'text/csv') {
//         cb(null, true);
//     } else {
//         console.log("Error while Uploading File : Acceptable File-Type - *.csv \n")
//         cb(null, false);
//     }
// };

// // Create the Multer instance
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter
// });

// export { upload };
