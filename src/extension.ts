// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const MAX_URL_LENGHT = 2047;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('"ecosia-search" extension is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ecosia-search.search', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		let activeTextEditor = vscode.window.activeTextEditor;
		if (!activeTextEditor) {
			vscode.window.showInformationMessage('Make sure to activate an editor window first and select some texts.');
			return;
		}
		// what about multiple selections? maybe a quick message
		if (activeTextEditor.selection.isEmpty) {
			vscode.window.showInformationMessage('Make sure to activate an editor window first and select some texts.');
			return;
		}

		// TODO: Fix characters and whitespaces
		let query: string = activeTextEditor.document.getText(activeTextEditor.selection);
		if (!query) {
			vscode.window.showInformationMessage('Make sure to activate an editor window first and select some texts.');
			return;
		}
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

// this method is called when your extension is deactivated
export function deactivate() { }
