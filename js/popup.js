import Franko from "./Franko.js";
import Arabic from "./Arabic.js";


const englishDictionaryUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const datasetApiUrl =
  "https://datasets-server.huggingface.co/rows?dataset=QCRI%2Farabic_pos_dialect&config=egy&split=train&offset=0&length=100";
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

switchButton.onclick = () => {
  [inputTextArea.classList.value, outputTextArea.classList.value] = [outputTextArea.classList.value, inputTextArea.classList.value];
  [inputLabel.innerText, outputLabel.innerText] = [outputLabel.innerText, inputLabel.innerText];
  inputTextArea.innerHTML = outputTextArea.innerHTML = "";
  isFranko = !isFranko;
}
inputField.oninput = () => {
  if (inputTextArea.children.length > 0) {
    inputTextArea.removeChild(inputTextArea.children[0]);
  } else {
    "";
  }
}
inputTextArea.onkeyup = async function () {
  if (!isFranko) {
    outputTextArea.innerText = arabicObj.performTranslation(inputTextArea.innerText);
    return;
  }
  if(!frankoObj){
    frankoObj = await Franko.create(datasetApiUrl, englishDictionaryUrl);
  } 
  console.log(inputTextArea.innerText);
  arabicWords = await frankoObj.performTranslation(inputTextArea.innerText);
  console.log(arabicWords);
  outputTextArea.innerHTML = "";
  arabicWords.forEach((element) => {
    const node = document.createElement("span");
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
      const suggestedWords = document.createElement("ul");
      for (let j = 0; j < arabicWords[i].length; j++) {
        const suggestedWord = document.createElement("li");
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