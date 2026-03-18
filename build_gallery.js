const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'gallery');
const outputFile = path.join(galleryDir, 'gallery.json');
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

// Read existing gallery.json if it exists
let existingGallery = [];
if (fs.existsSync(outputFile)) {
  try {
    const data = fs.readFileSync(outputFile, 'utf8');
    existingGallery = JSON.parse(data);
    // Handle the case where the JSON might be an array of strings (the old format)
    if (existingGallery.length > 0 && typeof existingGallery[0] === 'string') {
      existingGallery = existingGallery.map(src => ({ src, caption: "Team Alphabots in Action" }));
    }
  } catch (err) {
    console.error('Error reading existing gallery.json:', err);
  }
}

fs.readdir(galleryDir, (err, files) => {
    if (err) {
        console.error('Error reading gallery directory:', err);
        return;
    }

    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext) && !file.includes('cad-model.png'); // Exclude CAD model thumbnail
    });

    const newGallery = imageFiles.map(file => {
        const src = `gallery/${file}`;
        const existing = existingGallery.find(item => item.src === src);
        return existing || { src, caption: "Team Alphabots in Action" };
    });

    fs.writeFile(outputFile, JSON.stringify(newGallery, null, 2), (err) => {
        if (err) {
            console.error('Error writing gallery.json:', err);
            return;
        }
        console.log(`Successfully updated gallery.json with ${newGallery.length} images.`);
    });
});
