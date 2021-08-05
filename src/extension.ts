import { stringify } from 'querystring';
import * as vscode from 'vscode';

const MAX_URL_LENGHT = 2047;

export function activate(context: vscode.ExtensionContext) {

    console.log('"ecosia-search" extension is now active!');

    const noSelectionBehaviour = vscode.workspace.getConfiguration().get('ecosia-search.ifNoSelection');

    let disposable = vscode.commands.registerCommand('ecosia-search.search', () => {
        let activeTextEditor = vscode.window.activeTextEditor;
        if (!activeTextEditor) {
            vscode.window.showInformationMessage('Make sure to activate an editor window first and select some texts.');
            return;
        }

        if (activeTextEditor.selection.isEmpty) {
            if (noSelectionBehaviour === "emptySearchPage") {
                vscode.commands.executeCommand("vscode.open", vscode.Uri.parse('https://ecosia.org'));
                return;
            } else if (noSelectionBehaviour === "error") {
                vscode.window.showInformationMessage('Make sure to activate an editor window first and select some texts.');
                return;
            }
        }

        let query: string = activeTextEditor.document.getText(activeTextEditor.selection);
        if (!query) {
                vscode.window.showInformationMessage('Make sure to activate an editor window first and select some texts.');
                return;
        }

        query = query.replace(/\s+/g, ' ').trim();
        query = encodeURI(query);
        const url: string = `https://ecosia.org/search?q=${query}`;
        if (url.length > MAX_URL_LENGHT) {
            vscode.window.showInformationMessage('Try to select a smaller range of text. The selected text is too large.');
            return;
        }
        vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(url));
    });
    context.subscriptions.push(disposable);
}

export function deactivate() { }
