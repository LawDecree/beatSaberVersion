const path = require('path');
const originDir = 'origin';
const distDir = 'dist';

module.exports = {
  originDir,
  distDir,
  pathOrigin: path.resolve(__dirname, `../${originDir}/`),
  pathDist: path.resolve(__dirname, `../${distDir}/`),
}
