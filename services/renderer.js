const fs = require('fs');
const path = require('path');

module.exports = (renders) => {
  let result = renders.join('<br>');

  const outputPath = path.resolve(`${__dirname}/../output.html`);
  const stylesPath = path.resolve(`${__dirname}/../assets/styles.css`);
  const styles = fs.readFileSync(stylesPath, { encoding: 'utf8' });

  result = `<style>${styles}</style>${result}`;

  return fs.writeFileSync(outputPath, result);
};
