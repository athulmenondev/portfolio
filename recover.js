const fs = require('fs');
const mapFile = JSON.parse(fs.readFileSync('build/static/css/main.d6df3d3f.css.map', 'utf8'));

for(let i=0; i<mapFile.sources.length; i++) {
  if(mapFile.sources[i].includes('index.scss')) {
    console.log("Found index.scss!");
    fs.writeFileSync('src/index.scss', mapFile.sourcesContent[i]);
    break;
  }
}
