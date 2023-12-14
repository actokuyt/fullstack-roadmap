const fs = require('fs');
const path = require('path');

// Function to bulk rename files in a directory
function bulkRenameFiles(directoryPath, prefix) {
  // Read the files in the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // Iterate through each file and rename it
    files.forEach((file) => {
      const oldFilePath = path.join(directoryPath, file);
      const newFileName = `${prefix}${file}`;
      const newFilePath = path.join(directoryPath, newFileName);

      // Rename the file
      fs.rename(oldFilePath, newFilePath, (renameErr) => {
        if (renameErr) {
          console.error(`Error renaming ${file}:`, renameErr);
        } else {
          console.log(`Renamed ${file} to ${newFileName}`);
        }
      });
    });
  });
}

// Read command-line arguments for directory path and prefix
const [, , directoryPath, prefix] = process.argv;

// Check if both directory path and prefix are provided
if (!directoryPath || !prefix) {
  console.error('Please provide both a directory path and a prefix.');
  process.exit(1);
}

// Call the function with the provided directory path and prefix
bulkRenameFiles(directoryPath, prefix);
