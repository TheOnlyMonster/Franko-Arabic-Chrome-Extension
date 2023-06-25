class AbstractTranslate {
  performTranslation(targetText) {
    this.targetText = targetText;
  }
}
class Franko extends AbstractTranslate {
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
  async getDatasetRows() {
    const batchSize = 100;
    let offset = 0;
    let allRows = [];
    while (true) {
      const batchUrl = `${this.datasetApiUrl}&offset=${offset}&limit=${batchSize}`;
      try {
        const response = await axios.get(batchUrl);
        const batchRows = response.data.rows;
        if (batchRows.length === 0) {
          break;
        }
        allRows = allRows.concat(batchRows);
        offset += batchSize;
      } catch (error) {
        console.error("Error retrieving dataset rows:", error.message);
        break;
      }
    }
    return allRows;
  }
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
  isMisspelled(word) {
    const foundRow = this.datasetRows.find((row) =>
      row.row.words.includes(word)
    );
    return !foundRow;
  }
  calculateDamerauLevenshteinDistance(word1, word2) {
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
          dp[i - 1][j] + 1, // Deletion
          dp[i][j - 1] + 1, // Insertion
          dp[i - 1][j - 1] + cost // Substitution
        );
        if (
          i > 1 &&
          j > 1 &&
          word1[i - 1] === word2[j - 2] &&
          word1[i - 2] === word2[j - 1]
        ) {
          dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost); // Transposition
        }
      }
    }

    return dp[m][n];
  }
  findReplacements(word, posTags, similarities) {
    const potentialReplacements = new Set();
    for (let i = 0; i < this.datasetRows.length; i++) {
      const row = this.datasetRows[i].row;
      if (posTags.some((tag) => row.pos_tags.includes(tag))) {
        for (let j = 0; j < row.words.length; j++) {
          const similarWord = row.words[j];
          const score = this.calculateDamerauLevenshteinDistance(
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

    for (let i = 0; i < similarities.length; i++) {
      potentialReplacements.add(similarities[i].word);
    }

    return Array.from(potentialReplacements);
  }
  async performTranslation(targetText) {
    super.performTranslation(targetText);
    let tempTranslation = [[]];
    targetText = targetText.toLowerCase();
    targetText = targetText.split(" ");
    for (let i = 0; i < targetText.length; i++) {
      let tempWord = [];
      try {
        const response = await fetch(
          `${this.englishDictionaryUrl}${targetText[i]}`
        );
        if (
          (response.status == "200" && targetText[i].length > 3) ||
          !isNaN(targetText[i])
        ) {
          tempWord.push(targetText[i]);
        } else {
          let temp = "";
          for (let j = 0; j < targetText[i].length; j++) {
            temp += this.letters[targetText[i][j]] || targetText[i][j];
          }
          tempWord = await this.correctWord(temp);
        }
        tempTranslation.push(tempWord);
      } catch (error) {
        console.log(error);
      }
    }
    tempTranslation.shift();
    return tempTranslation;
  }
}
class Arabic extends AbstractTranslate{
  letters = {
    'ا': 'a',
    'ب': 'b',
    'ت': 't',
    'ث': 'th',
    'ج': 'g',
    'ح': '7',
    'خ': '5',
    'د': 'd',
    'ذ': 'th',
    'ر': 'r',
    'ز': 'z',
    'س': 'c',
    'ش': '4',
    'ص': 's',
    'ض': '9\'',
    'ط': '6',
    'ظ': 'd',
    'ع': '3',
    'غ': '3\'',
    'ف': 'f',
    'ق': '8',
    'ك': 'k',
    'ل': 'l',
    'م': 'm',
    'ن': 'n',
    'ه': 'h',
    'و': 'w',
    'ي': 'y',
  }
  constructor() {
    super();
  }
  performTranslation(targetText) {
    super.performTranslation(targetText);
    let tempTranslation = "";
    let words = targetText.split(" ");
    for (let i = 0; i < words.length; i++){
      let tempWord = "";
      for (let j = 0; j < words[i].length; j++){
        tempWord += this.letters[words[i][j]] || words[i][j];
      }
      tempTranslation += tempWord + ' ';
    }
    return tempTranslation;
  }
}
const englishDictionaryUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const datasetApiUrl =
  "https://datasets-server.huggingface.co/rows?dataset=arabic_pos_dialect&config=egy&split=train&offset=0";
const inputTextArea = document.getElementsByClassName("franko-text")[0];
const outputTextArea = document.getElementsByClassName("arabic-text")[0];
const inputField = document.getElementById("input-text");
const switchButton = document.getElementById("switch-translation");
const inputLabel = document.getElementById("input-label");
const outputLabel = document.getElementById("output-label");
let isFranko = true;
let frankoObj = null;
let arabicObj = new Arabic();
let arabicWords = [[]];
window.addEventListener("DOMContentLoaded", async () => {
  frankoObj = await Franko.create(datasetApiUrl, englishDictionaryUrl);
});
switchButton.onclick = () => {
  [inputTextArea.classList.value, outputTextArea.classList.value] = [outputTextArea.classList.value, inputTextArea.classList.value];
  [inputLabel.innerText, outputLabel.innerText] = [outputLabel.innerText, inputLabel.innerText];
  inputTextArea.innerHTML = outputTextArea.innerHTML = "";
  isFranko = !isFranko;
}
inputField.oninput = () => {
  inputTextArea.children.length > 0
    ? inputTextArea.removeChild(inputTextArea.children[0])
    : "";
}
inputTextArea.onkeyup = async function () {
  if (!isFranko) {
    outputTextArea.innerText = arabicObj.performTranslation(inputTextArea.innerText);
    return;
  }
  arabicWords = await frankoObj.performTranslation(inputTextArea.innerText);
  outputTextArea.innerHTML = "";
  arabicWords.forEach((element) => {
    let node = document.createElement("span");
    node.textContent = element[0];
    outputTextArea.appendChild(node);
    outputTextArea.innerHTML += " ";
  });
};
outputTextArea.onmouseenter = function () {
  if (!isFranko) return; 
  for (let i = 0; i < outputTextArea.children.length; i++) {
    outputTextArea.children[i].onmouseover = function () {
      if (outputTextArea.children[i].children.length > 0) {
        return;
      }
      let suggestedWords = document.createElement("ul");
      for (let j = 0; j < arabicWords[i].length; j++) {
        let suggestedWord = document.createElement("li");
        suggestedWord.textContent = arabicWords[i][j];
        suggestedWords.appendChild(suggestedWord);
      }
      outputTextArea.children[i].appendChild(suggestedWords);
    };
    outputTextArea.children[i].onmouseleave = function () {
      outputTextArea.children[i].removeChild(
        outputTextArea.children[i].lastChild
      );
    };
  }
};


