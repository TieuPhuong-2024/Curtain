const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../../uploads');
    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create a unique filename with the original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'image-' + uniqueSuffix + ext);
  }
});

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

// Upload image from device
exports.uploadImage = (req, res) => {
  // The upload middleware will handle the file
  const uploadSingle = upload.single('image');
  
  uploadSingle(req, res, function (err) {
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
    
    // Create the URL for the uploaded file
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const relativePath = `/uploads/${req.file.filename}`;
    const fileUrl = `${baseUrl}${relativePath}`;
    
    // Return the URL of the uploaded file
    res.status(200).json({ 
      message: 'File uploaded successfully',
      url: fileUrl,
      filename: req.file.filename
    });
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
    
    // Return the provided URL
    res.status(200).json({ 
      message: 'URL saved successfully',
      url: imageUrl
    });
  } catch (error) {
    console.error('Error saving image from URL:', error);
    res.status(500).json({ message: 'Error saving image from URL', error: error.message });
  }
};