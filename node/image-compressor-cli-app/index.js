const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Function to compress images in a directory
async function compressImages(inputPath, outputPath) {
  try {
    // Read the files in the input directory
    const files = fs.readdirSync(inputPath);

    // Iterate through each file and compress images
    for (const file of files) {
      const filePath = path.join(inputPath, file);

      // Check if the file is an image (you can extend the list of supported image extensions)
      if (/\.(jpg|jpeg|png)$/i.test(file)) {
        // If outputPath is provided, save compressed image to outputPath; otherwise, overwrite the original image
        const outputFilePath = path.join(outputPath, file);

        // Compress the image using sharp
        await sharp(filePath)
          .jpeg({ quality: 50 }) // You can adjust the quality setting
          .toFile(outputFilePath);

        console.log(`Compressed ${file}`);
      }
    }

    console.log('Compression completed.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Read command-line arguments for input and output paths
const [, , inputPath, outputPath] = process.argv;

// Check if input path is provided
if (!inputPath & !outputPath) {
  console.error('Please provide input and output paths.');
  process.exit(1);
}

// Call the function with the provided input and output paths
compressImages(inputPath, outputPath);
