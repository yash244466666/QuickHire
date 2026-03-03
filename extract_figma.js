const fs = require('fs');

const fileData = JSON.parse(fs.readFileSync('figma_file.json', 'utf8'));

function traverse(node, cb) {
  cb(node);
  if (node.children) {
    node.children.forEach(c => traverse(c, cb));
  }
}

const images = [];
traverse(fileData.document, node => {
  let hasImage = false;
  
  if (node.fills && Array.isArray(node.fills)) {
    if (node.fills.some(f => f.type === 'IMAGE')) {
       hasImage = true;
    }
  }

  // also export names that look like images as before
  if (hasImage || (node.name && (node.name.toLowerCase().includes('logo') || node.name.toLowerCase().includes('image') || node.name.toLowerCase().includes('avatar') || node.name.toLowerCase().includes('thumb')))) {
      images.push({
        id: node.id,
        name: node.name,
        type: node.type
      });
  }
});

fs.writeFileSync('figma_images_extracted.json', JSON.stringify(images, null, 2));
console.log(`Extracted ${images.length} potential image layers.`);
