/**
 * Represents an abstract translation class.
 */
class AbstractTranslate {
  /**
   * Performs the translation of the target text.
   * @param {string} targetText - The text to be translated.
   */
  performTranslation(targetText) {
    this.targetText = targetText;
  }
}
export default AbstractTranslate;
