![vscode version](https://vsmarketplacebadge.apphb.com/version/maanijou.ecosia-search.svg)
![number of installs](https://vsmarketplacebadge.apphb.com/installs/maanijou.ecosia-search.svg)
![average user rating](https://vsmarketplacebadge.apphb.com/rating/maanijou.ecosia-search.svg)
![license](https://img.shields.io/github/license/maanijou/ecosia-search-vscode-extension.svg)

# Ecosia search

The Ecosia search extension for Visual Studio Code makes it easy to search your code on the internet. The extension uses Ecosia search engine, a search engine that plants trees! Code, search and help to plant trees. For more information, visit [Ecosia webpage](https://info.ecosia.org/what).

If you prefer **other search engines**, you still have the option to change the default search engine from the extension settings.

## What's new?

### [version 1.2.0]

- Improved commands title.

### [version 1.1.0]

- Add option to select a different search engine.

### [version 1.0.0]

- Now you can search for what you want just by using your keyboard shortcuts! Select or copy a text and use shortcuts to open the search results.

## Features

Highlight and right-click the text and select `search with Ecosia`.

![highlight and search](resources/tutorial1.gif)

Search your clipboard text from vscode using `search clipboard` command. This is especially helpful to search something from vscode terminal.

![Search using clipboard](resources/tutorial2.gif)

## Keybidings

Now you can easily search only by using keyboard shortcuts.

- `Ctrl+K Ctrl+Shift+F` to search from clipboard.
- `Ctrl+K Ctrl+Shift+S` to search the selected text.

You can change these settings using the vscode Keyboard shortcuts section.

## Extension Settings

This extension contributes the following settings:

- `ecosia-search.searchEngine`: Select your desired search engine (default is, of course, Ecosia)
- `ecosia-search.ifNoSelection`: Specifies the behavior in case no text is selected. Show errors by setting to `error` or opening an empty search result page using `emptySearchPage` (default).
- `ecosia-search.maxQueryLength`: Maximum search length (url length). Default is 2047 to support IE browser.

## Known Issues

- The context menu does not work on preview pages or terminal and I Can't search selected text.
  - At this moment, vscode does not support an API to use selected text in such windows. The workaround is to copy the text and use search from the clipboard or use the keyboard shortcuts to search the copied text.

## Disclaimer

This extension is not an official extension from Ecosia. The extension only opens search results inside the Ecosia search engine. [Ecosia](https://www.ecosia.org/) and all its assets are properties of [Ecosia GmbH](https://info.ecosia.org/about).
