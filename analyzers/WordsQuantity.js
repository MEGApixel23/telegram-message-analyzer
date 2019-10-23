class WordsQuantity {
  constructor () {
    this.content = [];
    this._wordsStorage = {};
    this._sortedWords = {};
  }

  input (data) {
    this.content.push(data);
  }

  calculate () {
    this._formStorage()._sortStorage();

    return this;
  }

  render () {
    let res = '<table>';

    for (let i = 0; i < this._sortedWords.length; i++) {
      const word = this._sortedWords[i][0];
      const quantity = this._sortedWords[i][1];

      res += `<tr><td>${word}</td><td>${quantity}</td></tr>`;
    }

    return res + '</table>';
  }

  _formStorage () {
    for (let i = 0; i < this.content.length; i++) {
      const dom = this.content[i].content;

      dom('.message .text').each((i, node) => {
        const words = dom(node).text()
          .replace(/[\n.?!"',]/g, '')
          .split(' ');

        for (let j = 0; j < words.length; j++) {
          const word = words[j].trim().toLocaleLowerCase();

          if (!word) {
            continue;
          }

          if (!this._wordsStorage[word]) {
            this._wordsStorage[word] = 0;
          }

          this._wordsStorage[word]++;
        }
      });
    }

    return this;
  }

  _sortStorage () {
    const sortedWords = [];

    for (const word in this._wordsStorage) {
      sortedWords.push([word, this._wordsStorage[word]]);
    }

    this._sortedWords = sortedWords.sort((a, b) => b[1] - a[1]);

    return this;
  }
}

module.exports = WordsQuantity;
