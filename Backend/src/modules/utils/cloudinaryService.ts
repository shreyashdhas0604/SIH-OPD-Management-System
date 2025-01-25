import { v2 as cloudinary } from 'cloudinary';
import { Request, Response, NextFunction } from 'express';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary Cloud Name
  api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API Key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API Secret
});

// Cloudinary service class
class CloudinaryService {
  // Upload image to Cloudinary
  async uploadImage(imageBuffer: Buffer, publicId: string) {
    try {
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { public_id: publicId },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.end(imageBuffer);
      });

      return uploadResult;
    } catch (error) {
      throw new Error(`Error uploading image: ${error}`);
    }
  }

  // Get optimized image URL (auto-format and auto-quality)
  getOptimizedUrl(publicId: string) {
    return cloudinary.url(publicId, {
      fetch_format: 'auto',
      quality: 'auto',
    });
  }

  // Get transformed image URL (resize, crop, etc.)
  getTransformedUrl(publicId: string, width: number, height: number) {
    return cloudinary.url(publicId, {
      crop: 'auto',
      gravity: 'auto',
      width: width,
      height: height,
    });
  }

  // Middleware for uploading images
  uploadMiddleware = (req: any, res: any, next: any) => {
    if (!req.file) {
      return next();
    }

    const imageBuffer = req.file.buffer;
    const publicId = req.body.public_id || Date.now().toString(); // Use a timestamp as default public_id

    this.uploadImage(imageBuffer, publicId)
      .then((result: any) => {
        req.file.cloudinaryUrl = (result as { secure_url: string }).secure_url; // Add the URL to the request object
        next();
      })
      .catch((error) => {
        return res.status(500).json({ error: `Error uploading image: ${error.message}` });
      });
  };
}

const cloudinaryService = new CloudinaryService();
export default cloudinaryService;
