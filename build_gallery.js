const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'gallery');
const outputFile = path.join(galleryDir, 'gallery.json');
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

fs.readdir(galleryDir, (err, files) => {
    if (err) {
        console.error('Error reading gallery directory:', err);
        return;
    }

    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
    }).map(file => `gallery/${file}`);

    fs.writeFile(outputFile, JSON.stringify(imageFiles, null, 2), (err) => {
        if (err) {
            console.error('Error writing gallery.json:', err);
            return;
        }
        console.log(`Successfully created gallery.json with ${imageFiles.length} images.`);
    });
});
