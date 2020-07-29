# Description

Repo covering my working files from [Hacking VS Code - Write your first extension](https://app.pluralsight.com/library/courses/visual-studio-code-write-first-extension/table-of-contents) as I work through the course

## Developer Guide

1. Install Node and NPM from [NodeJS website](https://nodejs.org/en/)
2. Install Yeoman: `npm install -g yo`
3. Install Yo Code (plugin for Yeoman): `npm install -g yo generator-code`
4. Start Yo Code: `yo code`
5. Follow the prompts, choosing `VS Code Extension (Javascript)` and most other things default (whatever you want)
6. Inside the folder that is created, read the `vsc-extension-quickstart.md` file
      (you can preview the MD with Ctrl-Shift-V)

## To install an extension locally

[See here in the VS Code docs](https://code.visualstudio.com/docs/editor/extension-gallery#_where-are-extensions-installed) for info on where to install extensions locally.
Just copy the entire development folder to that location.

* i.e. in Windows, it is `%USERPROFILE%\.vscode\extensions`