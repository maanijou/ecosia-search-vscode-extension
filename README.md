
![vscode version](https://vsmarketplacebadge.apphb.com/version/maanijou.ecosia-search.svg)
![number of installs](https://vsmarketplacebadge.apphb.com/installs/maanijou.ecosia-search.svg)
![average user rating](https://vsmarketplacebadge.apphb.com/rating/maanijou.ecosia-search.svg)
![license](https://img.shields.io/github/license/maanijou/ecosia-search-vscode-extension.svg)

# Ecosia search

The Ecosia search extension for Visual Studio Code makes it easy to search your code on the internet. The extension uses Ecosia search engine, a search engine that plants trees! Code, search and help to plant trees. For more information, visit [Ecosia webpage](https://info.ecosia.org/what).

## Features

Highlight and right-click the text and select `search with Ecosia`.

![highlight and search](resources/tutorial1.gif)


Search your clipboard text from vscode using `search clipboard` command. This is especially helpful to search something from vscode terminal.

![Search using clipboard](resources/tutorial2.gif)


## Extension Settings

This extension contributes the following settings:

* `ecosia-search.ifNoSelection`: Specifies the behavior in case no text is selected. Show errors by setting to `error` or opening an empty search result page using `emptySearchPage` (default).
* `ecosia-search.maxQueryLength`: Maximum search length (url length). Default is 2047 to support IE browser.

## Disclaimer

This extension is not an official extension from Ecosia. The extension only opens search results inside the Ecosia search engine. [Ecosia](https://www.ecosia.org/) and all its assets are properties of [Ecosia GmbH](https://info.ecosia.org/about).
