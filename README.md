# ![logo-32x32](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/blob/main/assets/logo-32x32.png) | Arabic - Franko Chrome Extension 

The "عربي - Franko" Chrome extension is designed to provide translation services between Franko text and Arabic. It enables users to easily translate text from Franko to Arabic and vice versa. 


## ![logo-32x32](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/blob/main/assets/logo-32x32.png) | Download the Extension

You can download and install the "عربي - Franko" Chrome extension from the Chrome Web Store using the following link:

[Download عربي - Franko Chrome Extension](https://chrome.google.com/webstore/detail/%D8%B9%D8%B1%D8%A8%D9%8A-franko/lfnbchcibchaflinekapimhljnpkfaec)

## ![logo-32x32](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/blob/main/assets/logo-32x32.png) | Code Overview

The extension utilizes JavaScript to implement the translation functionality. Here's an overview of the main code components:

- `AbstractTranslate` class: An abstract class that defines the structure for translation operations.
- `Franko` class: Extends the `AbstractTranslate` class and implements the translation algorithm for Franko text.
- `Arabic` class: Extends the `AbstractTranslate` class and handles translation from Arabic to Franko.
- Translation Logic: The translation logic is implemented in the `performTranslation` methods of the `Franko` and `Arabic` classes.
- Dataset Integration: The extension fetches dataset rows from the Hugging Face API to enhance translation accuracy. The dataset is retrieved in batches using the `getDatasetRows` method.
- User Interface: The extension's user interface is created using HTML and CSS. The interface allows users to input text, view the translated output, and switch the translation direction.

## ![logo-32x32](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/blob/main/assets/logo-32x32.png) | Screenshots

![screenshot-1](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/blob/main/screenshots/screenshot-1.jpg)

![screenshot-2](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/blob/main/screenshots/screenshot-2.jpg)



