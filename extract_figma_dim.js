const fs = require('fs');

const fileData = JSON.parse(fs.readFileSync('figma_file.json', 'utf8'));

function traverse(node, cb) {
  cb(node);
  if (node.children) {
    node.children.forEach(c => traverse(c, cb));
  }
}

const uiMap = [];
traverse(fileData.document, node => {
  if (node.name && (node.name.toLowerCase().includes('hero') || node.name.toLowerCase().includes('logo') || node.type === 'INSTANCE')) {
      uiMap.push({
        name: node.name,
        type: node.type,
        box: node.absoluteBoundingBox,
        w: node.absoluteBoundingBox ? node.absoluteBoundingBox.width : 0,
        h: node.absoluteBoundingBox ? node.absoluteBoundingBox.height : 0
      });
  }
});

fs.writeFileSync('figma_dimensions.json', JSON.stringify(uiMap.filter(i => i.box), null, 2));
console.log('Figma dimensions extracted');
