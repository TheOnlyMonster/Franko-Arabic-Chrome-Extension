import AbstractTranslate from "./AbstractTranslate.js";

/**
 * Represents a translation class for the Franko translation algorithm.
 * @extends AbstractTranslate
 */
class Franko extends AbstractTranslate {

  letters = {
    a: "ا",
    b: "ب",
    c: "ص",
    d: "د",
    e: "ي",
    f: "ف",
    g: "ج",
    h: "ه",
    i: "ي",
    j: "ج",
    k: "ك",
    l: "ل",
    m: "م",
    n: "ن",
    o: "و",
    p: "ب",
    q: "ك",
    r: "ر",
    s: "س",
    t: "ت",
    u: "ي",
    v: "ف",
    w: "و",
    y: "ي",
    z: "ز",
    2: "ا",
    3: "ع",
    4: "ش",
    5: "خ",
    6: "ط",
    7: "ح",
    8: "ق",
  };

  constructor(datasetApiUrl, englishDictionaryUrl) {
    super();
    this.datasetRows = [];
    this.englishDictionaryUrl = englishDictionaryUrl;
    this.datasetApiUrl = datasetApiUrl;
  }

  static async create(datasetApiUrl, englishDictionaryUrl) {
    const instance = new Franko(datasetApiUrl, englishDictionaryUrl);
    instance.datasetRows = await instance.getDatasetRows();
    return instance;
  }


  /**
   * Retrieves the dataset rows from the specified API URL.
   * @returns {Array} An array of dataset rows.
   * @throws {Error} If no dataset rows are retrieved.
   */
  async getDatasetRows() {
    let allRows = [];
    try {
      const response = await axios.get(this.datasetApiUrl);
      allRows = response.data.rows;
      if (allRows.length === 0) {
        throw new Error("No dataset rows retrieved.");
      }
    } catch (error) {
      console.error("Error retrieving dataset rows:", error.message);
    }
    return allRows;
  }


  /**
   * Corrects a word by finding replacements if it is misspelled.
   * @param {string} word - The word to be corrected.
   * @returns {Array<string>} - An array of corrected words, including the original word if it is not misspelled.
   */
  async correctWord(word) {
    if (this.datasetRows.length === 0) {
      console.log("Failed to retrieve dataset rows. Aborting...");
      return [];
    }

    const posTags = this.datasetRows.flatMap((row) => row.row.pos_tags);
    const similarities = [];

    if (this.isMisspelled(word)) {
      const replacements = this.findReplacements(word, posTags, similarities);
      replacements.splice(1,0,word);
      return replacements;
    }
    return [word];
  }

  /**
   * Checks if a word is misspelled.
   *
   * @param {string} word - The word to check for misspelling.
   * @returns {boolean} Returns true if the word is misspelled, false otherwise.
   */
  isMisspelled(word) {
    const foundRow = this.datasetRows.find((row) =>
      row.row.words.includes(word)
    );
    return !foundRow;
  }
  /**
   * Calculates the score between two words using the Levenshtein distance algorithm.
   * The score represents the minimum number of operations (insertions, deletions, or substitutions)
   * required to transform one word into another.
   *
   * @param {string} word1 - The first word.
   * @param {string} word2 - The second word.
   * @returns {number} The score between the two words.
   */
  calculateScore(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = word1[i - 1] === word2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1, 
          dp[i - 1][j - 1] + cost 
        );
        if (
          i > 1 &&
          j > 1 &&
          word1[i - 1] === word2[j - 2] &&
          word1[i - 2] === word2[j - 1]
        ) {
          dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost); 
        }
      }
    }

    return dp[m][n];
  }


  /**
   * Finds potential replacements for a given word based on part-of-speech tags and similarities.
   * @param {string} word - The word to find replacements for.
   * @param {string[]} posTags - An array of part-of-speech tags to filter the replacements.
   * @param {Object[]} similarities - An array to store the similarities between words.
   * @returns {string[]} - An array of potential replacements for the given word.
   */
  findReplacements(word, posTags, similarities) {
    const potentialReplacements = new Set();
    for (const dataRow of this.datasetRows) {
      const row = dataRow.row;
      if (posTags.some((tag) => row.pos_tags.includes(tag))) {
        for (const similarWord of row.words) {
          const score = this.calculateScore(
            word,
            similarWord
          );
          similarities.push({ word: similarWord, score });
          if (similarities.length > 6) {
            similarities.sort((a, b) => a.score - b.score);
            similarities.splice(6);
          }
        }
      }
    }

    for (const similarity of similarities) {
      potentialReplacements.add(similarity.word);
    }

    return Array.from(potentialReplacements);
  }


  /**
   * Performs translation of the target text.
   * @param {string} targetText - The text to be translated.
   * @returns {Promise<Array<Array<string>>>} - A promise that resolves to an array of translated words.
   */
  async performTranslation(targetText) {
    super.performTranslation(targetText);
    const translatedWords = [[]];
    targetText = targetText.toLowerCase();
    targetText = targetText.split(" ");
    for (const word of targetText) {
      let translatedWord = [];
      try {
        const response = await fetch(
          `${this.englishDictionaryUrl}${word}`
        );
        if (
          (response.status == "200" && word.length > 3) ||
          !isNaN(word)
        ) {
          translatedWord.push(word);
        } else {
          let initialTranslatedWord = "";
          for (const letter of word) {
            initialTranslatedWord += this.letters[letter] || letter;
          }
          translatedWord = await this.correctWord(initialTranslatedWord);
        }
        translatedWords.push(translatedWord);
      } catch (error) {
        console.log(error);
      }
    }
    translatedWords.shift();
    return translatedWords;
  }
}

export default Franko;