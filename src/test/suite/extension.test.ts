import * as assert from 'assert';
import * as vscode from 'vscode';
import { appendLanguageID } from "../../utils/utils";

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test appending language id', () => {
		let expect: string = 'Some text +python';
		let query: string = "Some text";
		assert(expect === appendLanguageID(query, "python", "ecosia"));
		assert(expect === appendLanguageID(query, "python", "duckduckgo"));
		assert(expect === appendLanguageID(query, "python", "google"));
		assert(expect === appendLanguageID(query, "python", "bing"));
		expect = "[python] Some text";
		assert(expect === appendLanguageID(query, "python", "stackoverflow"));
	});
});
