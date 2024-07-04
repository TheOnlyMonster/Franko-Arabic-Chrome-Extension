import AbstractTranslate from './AbstractTranslate.js';

/**
 * Represents a translator for Arabic text.
 * @extends AbstractTranslate
 */
class Arabic extends AbstractTranslate {
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

  /**
   * Creates an instance of the Arabic translator.
   */
  constructor() {
    super();
  }

  /**
   * Performs translation of the target text.
   * @param {string} targetText - The text to be translated.
   * @returns {string} The translated text.
   */
  performTranslation(targetText) {
    super.performTranslation(targetText);
    let translatedSentence = "";
    const words = targetText.split(" ");
    for (const currentWord of words) {
      let translatedWord = "";
      for (const letter of currentWord) {
        translatedWord += this.letters[letter] || letter;
      }
      translatedSentence += `${translatedWord} `;
    }
    return translatedSentence;
  }
}
export default Arabic;