# ![logo-32x32](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/assets/92688600/ae0a766c-ef62-4f3c-a6ec-e914231afefb) | Arabic - Franko Chrome Extension 

The "عربي - Franko" Chrome extension is designed to provide translation services between Franko text and Arabic. It enables users to easily translate text from Franko to Arabic and vice versa. 


## ![logo-32x32](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/assets/92688600/ae0a766c-ef62-4f3c-a6ec-e914231afefb) | Download the Extension

You can download and install the "عربي - Franko" Chrome extension from the Chrome Web Store using the following link:

[Download عربي - Franko Chrome Extension](https://chrome.google.com/webstore/detail/%D8%B9%D8%B1%D8%A8%D9%8A-franko/lfnbchcibchaflinekapimhljnpkfaec)

## ![logo-32x32](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/assets/92688600/ae0a766c-ef62-4f3c-a6ec-e914231afefb) | Screenshots

![screenshot-1](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/assets/92688600/36fc5c47-e4a2-40e4-b7d4-3f5d1ac2cea2)

![screenshot-2](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/assets/92688600/7c445be3-9ee1-46c3-8728-195e4f0eb310)


## ![logo-32x32](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/assets/92688600/ae0a766c-ef62-4f3c-a6ec-e914231afefb) | Features

- Translation: The extension uses a custom translation algorithm to convert Franko text to Arabic and vice versa.
- Dataset Integration: The extension utilizes a dataset API provided by Hugging Face to enhance the translation accuracy. The dataset contains Arabic POS dialects and configuration specific to Egyptian dialects.
- English Dictionary: The extension integrates with the DictionaryAPI to handle English words and ensure accurate translations.
- Interactive Interface: The extension provides a user-friendly interface that allows users to input text and view the translated output in real-time.

## ![logo-32x32](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/assets/92688600/ae0a766c-ef62-4f3c-a6ec-e914231afefb) | How to Use

1. Install the Extension: Download and install the "عربي - Franko" Chrome extension from the Chrome Web Store using the provided link.
2. Activate the Extension: Click on the extension icon in the Chrome toolbar to activate the translation interface.
3. Translate Text: Enter the text you want to translate in the input area. As you type, the translation will be displayed in real-time in the output area.
4. Switch Translation Direction: Use the switch button to toggle between translating from Franko to Arabic and from Arabic to Franko.

## ![logo-32x32](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/assets/92688600/ae0a766c-ef62-4f3c-a6ec-e914231afefb) | Code Overview

The extension utilizes JavaScript to implement the translation functionality. Here's an overview of the main code components:

- `AbstractTranslate` class: An abstract class that defines the structure for translation operations.
- `Franko` class: Extends the `AbstractTranslate` class and implements the translation algorithm for Franko text.
- `Arabic` class: Extends the `AbstractTranslate` class and handles translation from Arabic to Franko.
- Translation Logic: The translation logic is implemented in the `performTranslation` methods of the `Franko` and `Arabic` classes.
- Dataset Integration: The extension fetches dataset rows from the Hugging Face API to enhance translation accuracy. The dataset is retrieved in batches using the `getDatasetRows` method.
- User Interface: The extension's user interface is created using HTML and CSS. The interface allows users to input text, view the translated output, and switch the translation direction.

## ![logo-32x32](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/assets/92688600/ae0a766c-ef62-4f3c-a6ec-e914231afefb) | Dependencies

The "عربي - Franko" Chrome extension relies on the following external dependencies:

- [axios](https://github.com/axios/axios): A JavaScript library used for making HTTP requests to retrieve dataset rows.
- [DictionaryAPI](https://dictionaryapi.dev/): An API used to handle English words and provide accurate translations.
- [Google Fonts](https://fonts.google.com/): Remote CSS files are included to load the "Work Sans" font for consistent typography.

## ![logo-32x32](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension/assets/92688600/ae0a766c-ef62-4f3c-a6ec-e914231afefb) | Support and Contributions

If you encounter any issues or have suggestions for improvements, please feel free to open an issue on the GitHub repository: [عربي - Franko](https://github.com/TheOnlyMonster/Franko-Arabic-Chrome-Extension).

Contributions to the project are also welcome. Fork the repository, make your changes, and submit a pull request with a detailed explanation of your modifications.
