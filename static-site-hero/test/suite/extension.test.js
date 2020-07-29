const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const myExtension = require('../../extension');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.equal(-1, [1, 2, 3].indexOf(5));
		assert.equal(-1, [1, 2, 3].indexOf(0));
	});

	test("Update Template with Date", () => {
		let template = "/images/${year}/${month}";
		let updatedTemplate = myExtension.updateTemplateWithDate(template);

		let controlTemplate = template;

		let today = new Date();
		let year = today.getFullYear();
		let month = ('0' + (today.getMonth() + 1)).slice(-2);

		controlTemplate = controlTemplate.replace("${year}", year);
		controlTemplate = controlTemplate.replace("${month}", month);

		assert.equal(updatedTemplate, controlTemplate, `Updated Template not correct. Expected: ${controlTemplate}, but got: ${updatedTemplate}`);
	})
});
