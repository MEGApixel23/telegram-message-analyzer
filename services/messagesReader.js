const fs = require('fs');
const cheerio = require('cheerio');
const natSortFn = require('javascript-natural-sort');

const fsp = require('fs').promises;

module.exports = (folderPath) => {
  const files = fs.readdirSync(folderPath).filter((filename) => {
    const parts = filename.split('.');

    return parts[parts.length - 1] === 'html';
  }).sort(natSortFn);
  const promises = files.map(
    async (filePath) => {
      const content = await fsp.readFile(`${folderPath}/${filePath}`, { encoding: 'utf8' });

      return {
        file: filePath,
        content: cheerio.load(content)
      };
    }
  );

  return Promise.all(promises);
};
