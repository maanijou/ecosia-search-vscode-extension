import * as vscode from 'vscode';
import { appendLanguageID } from './utils/utils';

const MAX_URL_LENGTH: number = vscode.workspace.getConfiguration().get("ecosia-search.maxQueryLength", 2047);
const SEARCH_ENGINE: string = vscode.workspace.getConfiguration().get("ecosia-search.searchEngine", "ecosia");
const MUST_APPEND_LANGUAGE_ID: boolean = vscode.workspace.getConfiguration().get("ecosia-search.autoInsertLanguageName", true);

const SEARCH_ENGINE_URLS: { [key: string]: string } = {
    "ecosia": "https://ecosia.org/search?q=",
    "google": "https://www.google.com/search?q=",
    "duckduckgo": "https://duckduckgo.com/?q=",
};

export function activate(context: vscode.ExtensionContext) {

    console.log('"ecosia-search" extension is now active!');

    const noSelectionBehaviour = vscode.workspace.getConfiguration().get('ecosia-search.ifNoSelection');

    let disposable = vscode.commands.registerCommand('ecosia-search.search', () => {
        let activeTextEditor = vscode.window.activeTextEditor;
        const languageID: string | undefined = activeTextEditor?.document.languageId;
        if (!activeTextEditor) {
            vscode.window.showInformationMessage('Make sure to activate an editor window first and select some texts.');
            console.info('No window/text is selected');
            return;
        }

        if (activeTextEditor.selection.isEmpty) {
            if (noSelectionBehaviour === "emptySearchPage") {
                vscode.commands.executeCommand("vscode.open", vscode.Uri.parse('https://ecosia.org'));
                return;
            } else if (noSelectionBehaviour === "error") {
                vscode.window.showInformationMessage('Make sure to activate an editor window first and select some texts.');
                console.info('No window/text is selected');
                return;
            }
        }

        let query: string = activeTextEditor.document.getText(activeTextEditor.selection);
        if (!query) {
            vscode.window.showInformationMessage('Make sure to activate an editor window first and select some texts.');
            console.info('No window/text is selected');
            return;
        }

        query = query.replace(/\s+/g, ' ').trim();
        if (MUST_APPEND_LANGUAGE_ID) {
            query = appendLanguageID(query, languageID, SEARCH_ENGINE);
        }
        query = encodeURIComponent(query);
        const url: string = `${SEARCH_ENGINE_URLS[SEARCH_ENGINE]}${query}`;

        if (url.length > MAX_URL_LENGTH) {
            vscode.window.showInformationMessage('Try to select a smaller range of text. The selected text is too large.');
            console.info('Generated query is bigger than max url length.');
            return;
        }

        // workaround to fix url encode problems in vscode
        // @ts-ignore 
        vscode.env.openExternal(url);
    });


    let clipboardDisposable = vscode.commands.registerCommand('ecosia-search.searchFromClipboard', async () => {

        let query: string = await vscode.env.clipboard.readText();

        if (!query) {
            vscode.window.showInformationMessage('There is no text in the clipboard.');
            console.info('Clipboard is empty.');
            return;
        }

        query = query.replace(/\s+/g, ' ').trim();
        query = encodeURIComponent(query);
        const url: string = `${SEARCH_ENGINE_URLS[SEARCH_ENGINE]}${query}`;

        if (url.length > MAX_URL_LENGTH) {
            vscode.window.showInformationMessage('Try to select a smaller range of text. The selected text is too large.');
            console.info('Generated query is bigger than max url length.');
            return;
        }

        // workaround to fix url encode problems in vscode
        // @ts-ignore 
        vscode.env.openExternal(url);
    });

    context.subscriptions.push(clipboardDisposable);
    context.subscriptions.push(disposable);
}

export function deactivate() { }
