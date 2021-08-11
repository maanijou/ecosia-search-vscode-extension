import * as vscode from 'vscode';

const SEARCH_URL = "https://ecosia.org/search?q=";
const MAX_URL_LENGTH: number = vscode.workspace.getConfiguration().get('ecosia-search.maxQueryLength', 2047);

export function activate(context: vscode.ExtensionContext) {

    console.log('"ecosia-search" extension is now active!');

    const noSelectionBehaviour = vscode.workspace.getConfiguration().get('ecosia-search.ifNoSelection');

    let disposable = vscode.commands.registerCommand('ecosia-search.search', () => {
        let activeTextEditor = vscode.window.activeTextEditor;
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
        query = encodeURI(query);
        const url: string = `${SEARCH_URL}${query}`;
        if (url.length > MAX_URL_LENGTH) {
            vscode.window.showInformationMessage('Try to select a smaller range of text. The selected text is too large.');
            console.info('Generated query is bigger than max url length.');
            return;
        }
        vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(url));
    });


    let clipboardDisposable = vscode.commands.registerCommand('ecosia-search.searchFromClipboard', async () => {

        let query: string = await vscode.env.clipboard.readText();

        if (!query) {
            vscode.window.showInformationMessage('There is no text in the clipboard.');
            console.info('Clipboard is empty.');
            return;
        }

        query = query.replace(/\s+/g, ' ').trim();
        query = encodeURI(query);
        const url: string = `${SEARCH_URL}${query}`;
        if (url.length > MAX_URL_LENGTH) {
            vscode.window.showInformationMessage('Try to select a smaller range of text. The selected text is too large.');
            console.info('Generated query is bigger than max url length.');
            return;
        }
        vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(url));
    });

    context.subscriptions.push(clipboardDisposable);
    context.subscriptions.push(disposable);
}

export function deactivate() { }
