import axios from 'axios'
export const handleUpload = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file); 

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASEURL}/files/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return res;
    } catch (error) {
        console.error("Content upload error:", error);
        return error.response;
    }
};


// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import multer from "multer";
// import nextConnect from "next-connect";

// const upload = multer({ storage: multer.memoryStorage() });

// const s3 = new S3Client({
//   region: process.env.NEXT_PUBLIC_AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
//   },
// });

// const apiRoute = nextConnect();

// apiRoute.use(upload.single("file"));

// apiRoute.post(async (req, res) => {
//   try {
//     const file = req.file;
//     const fileName = `${Date.now()}-${file.originalname}`;

//     const uploadParams = {
//       Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
//       Key: fileName,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//       ACL: "public-read", // Make file public
//     };

//     await s3.send(new PutObjectCommand(uploadParams));

//     const fileUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;

//     res.status(200).json({ success: true, url: fileUrl });
//   } catch (error) {
//     console.error("S3 upload error:", error);
//     res.status(500).json({ success: false, error: "Upload failed" });
//   }
// });

// export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, // Disables Next.js body parsing so multer works
//   },
// };
