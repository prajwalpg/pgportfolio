const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const standalone = path.join(root, '.next', 'standalone');

if (fs.existsSync(standalone)) {
  try {
    const staticSrc = path.join(root, '.next', 'static');
    const staticDest = path.join(standalone, '.next', 'static');
    if (fs.existsSync(staticSrc)) {
      fs.cpSync(staticSrc, staticDest, { recursive: true });
    }

    const publicSrc = path.join(root, 'public');
    const publicDest = path.join(standalone, 'public');
    if (fs.existsSync(publicSrc)) {
      fs.cpSync(publicSrc, publicDest, { recursive: true });
    }

    console.log('Successfully copied standalone static assets.');
  } catch (err) {
    console.error('Error copying standalone assets:', err);
  }
}
