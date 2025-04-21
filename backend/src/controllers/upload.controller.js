const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fileController = require('./file.controller');

// Configure in-memory storage for uploaded files
const storage = multer.memoryStorage();

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Upload image from device and save to database
exports.uploadImage = (req, res) => {
  // The upload middleware will handle the file
  const uploadSingle = upload.single('image');

  uploadSingle(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(400).json({ message: 'File upload error', error: err.message });
    } else if (err) {
      // An unknown error occurred
      return res.status(500).json({ message: 'Unknown error', error: err.message });
    }

    // Everything went fine, a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      // Prepare file data for database
      const fileData = {
        filename: Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(req.file.originalname),
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        data: req.file.buffer,
        size: req.file.size
      };

      // Save file to database
      const savedFile = await fileController.saveFile(fileData);

      // Return the URL for accessing the file
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const fileUrl = `${baseUrl}${savedFile.fileUrl}`;

      res.status(200).json({
        message: 'File uploaded successfully',
        url: fileUrl,
        fileId: savedFile._id
      });
    } catch (error) {
      console.error('Error saving file to database:', error);
      res.status(500).json({ message: 'Error saving file', error: error.message });
    }
  });
};

// Save image from URL (cloud)
exports.saveImageFromUrl = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    // Validate URL format
    try {
      new URL(imageUrl);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid URL format' });
    }

    // Return the provided URL (external URL)
    res.status(200).json({
      message: 'URL saved successfully',
      url: imageUrl
    });
  } catch (error) {
    console.error('Error saving image from URL:', error);
    res.status(500).json({ message: 'Error saving image from URL', error: error.message });
  }
};