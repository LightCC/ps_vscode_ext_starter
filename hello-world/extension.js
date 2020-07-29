// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { toEditorSettings } = require('typescript');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hello-world" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('hello-world.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from Hello World!');

		var editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showErrorMessage("No file is open, can't say Hello!");
			return;
		}

		// toEditorSettings.edit(function (editBuilder) {
		// 	editBuilder.insert(editor.selection.start, "Insert At Start!!");
		// });

		try {
			editor.edit((editBuilder) => {
				editBuilder.delete(editor.selection);
			}).then((editBuilder) => {
				editor.edit((editBuilder) => {
					editBuilder.insert(editor.selection.start, "Delete and Insert - Hello World!!");
				});
			});
		} catch (ex) {
			console.error("Error writing to doc." + ex);
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
