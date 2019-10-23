const fs = require('fs');
const path = require('path');

const messagesReaderService = require('./services/messagesReader');
const renderService = require('./services/renderer');
const WordsQuantityAnalyzer = require('./analyzers/WordsQuantity');

const analyzers = [
  new WordsQuantityAnalyzer()
];

const main = async (targetPath) => {
  const clearedPath = targetPath.trim().replace(/\\/g, '');
  const isValidPath = fs.existsSync(path.normalize(clearedPath));

  if (!isValidPath) {
    console.log('Invalid path. Exiting...\n');

    return;
  }

  const filesContent = await messagesReaderService(clearedPath);
  const results = analyzers.map((analyzer) => {
    for (let i = 0; i < filesContent.length; i++) {
      analyzer.input(filesContent[i]);
    }

    return analyzer.calculate().render();
  });

  renderService(results);
};

main('PATH/TO/CHAT/EXPORT/HERE');