// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const figureTemplate = `<figure class="">
![Alt Text](\${figOptions.path}\${figOptions.imageName})
<figcaption>
Caption
</figcaption>
</figure>`;

let insertText = (value) => {
	let editor = vscode.window.activeTextEditor;

	if (!editor) {
		vscode.window.showErrorMessage("Can't insert text - no document is open.");
		return;
	}

	let selection = editor.selection;

	let range = new vscode.Range(selection.start, selection.end);

	editor.edit((editBuilder) => {
		editBuilder.replace(range, value);
	});
};

let getImageTemplate = () => {
	return vscode.workspace.getConfiguration("staticSiteHero")["imagePathTemplate"];
};

let getFileTemplate = () => {
	return vscode.workspace.getConfiguration("staticSiteHero")["filePathTemplate"];
};

let updateTemplateWithDate = (template) => {
	let today = new Date();
	let year = today.getFullYear();
	let month = ('0' + (today.getMonth() + 1)).slice(-2);

	template = template.replace("${year}", year);
	template = template.replace("${month}", month);

	return template;
}

exports.updateTemplateWithDate = updateTemplateWithDate;

let fillFigureTemplate = (figOptions) => {
	let figure = figureTemplate.replace('${figOptions.imageName}', figOptions.imageName);
	figure = figure.replace('${figOptions.path}', figOptions.path);

	return figure;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "static-site-hero" is now active!');
	vscode.window.showWarningMessage("Warning!! Static Site Hero Helper is active...");

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let fileLinkDisposable = vscode.commands.registerCommand('static-site-hero.insertLink', () => {
		vscode.window.showInformationMessage('Insert File Link Initiated.');

		let linkTypeList = ['File', 'Image'];

		vscode.window.showQuickPick(linkTypeList, { placeHolder: 'Link Type' })
			.then(result => {
				// insertText(result);
				if (result === 'File') {
					const filepath = updateTemplateWithDate(getFileTemplate())
					insertText(`[Link Text](${filepath})`);
				} else if (result === 'Image') {
					const imagepath = updateTemplateWithDate(getImageTemplate())
					insertText(`![Image Text](${imagepath})`);
				}
			});
	});

	context.subscriptions.push(fileLinkDisposable);

	let figureDisposable = vscode.commands.registerCommand('static-site-hero.insertFigure', () => {
		vscode.window.showInformationMessage('Insert Figure Tag Initiated');

		let template = getImageTemplate();
		template = updateTemplateWithDate(template);

		let figOptions = {
			imageName: '',
			path: template
		}

		vscode.window.showInputBox({ prompt: "Image File Name" })
			.then(value => {
				figOptions.imageName = value;
			})
			.then(() => {
				insertText(fillFigureTemplate(figOptions));
			});

		insertText(figureTemplate);
	});

	context.subscriptions.push(figureDisposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

module.exports = {
	activate,
	deactivate,
	updateTemplateWithDate
}
