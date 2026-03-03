const fs = require('fs');
const https = require('https');
const path = require('path');

const extracted = JSON.parse(fs.readFileSync('figma_images_extracted.json', 'utf8'));
const ids = [...new Set(extracted.map(e => e.id))].join(',');

const TOKEN = 'figd_-AB1RRGi34YlfjVA7jPo-Ccd91Dm40Xj5IlYfp0z';
const FILE_ID = 'PWYovqdcSczquXZKbRLOKC';

const options = {
  hostname: 'api.figma.com',
  path: `/v1/images/${FILE_ID}?ids=${ids}&format=svg`,
  headers: {
    'X-Figma-Token': TOKEN
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', async () => {
    const resPayload = JSON.parse(data);
    if (!resPayload.images) {
      console.error('No images returned', resPayload);
      return;
    }

    fs.writeFileSync('figma_image_links.json', JSON.stringify(resPayload, null, 2));
    console.log(`Successfully fetched links for ${Object.keys(resPayload.images).length} images.`);
    
    let shScript = '#!/bin/bash\n';
    
    // Save mapping directly
    const localMapping = {};

    const destFolder = path.join(__dirname, 'frontend/public/images/companies');
    if (!fs.existsSync(destFolder)) {
      fs.mkdirSync(destFolder, { recursive: true });
    }

    for (const entry of Object.entries(resPayload.images)) {
        const id = entry[0];
        const url = entry[1];
        if (!url) continue;
        const info = extracted.find(x => x.id === id);
        const nameNode = info ? info.name : id;
        const sanitizeMatch = nameNode.replace(/[^a-zA-Z0-9]/gi, '_').toLowerCase();
        const absoluteFilename = path.join(destFolder, `${sanitizeMatch}.svg`);
        
        shScript += `curl -sL "${url}" -o "${absoluteFilename}"\n`;
        localMapping[nameNode] = `/images/companies/${sanitizeMatch}.svg`;
    }
    
    fs.writeFileSync('download_curl.sh', shScript);
    fs.writeFileSync('figma_mapping.json', JSON.stringify(localMapping, null, 2));
    console.log('Wrote download_curl.sh. Please run it.');

  });
}).on('error', (e) => {
  console.error(e);
});
