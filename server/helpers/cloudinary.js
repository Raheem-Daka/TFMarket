import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Cloudinary config using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Multer memory storage (keeps file in buffer, not disk)
const storage = multer.memoryStorage();

// File type and size validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// Utility: upload to Cloudinary
async function imageUploadUtil(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",  // Automatically detect the file type
    });
    return result;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error('Image upload failed');
  }
}

export { upload, imageUploadUtil };
