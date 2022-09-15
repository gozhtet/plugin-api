const fs = require('fs');
const path = require('path');
const process = require('process');
const { exec, execSync } = require('child_process');

const createPlugin = ({ name }) => {
	const cwd = process.cwd();
	const templateDir = path.join(__dirname, 'templates');
	const packageJson = JSON.parse(
		fs.readFileSync(path.join(__dirname, '../../../package.json'))
	);

	const dir = readDir(templateDir);
	const targetPath = path.join(cwd, name);
	fs.mkdirSync(targetPath);
	createStructure(dir, targetPath, { name, version: packageJson.version });
	runShell('git init');
};

const readDir = (dirPath) => {
	const dir = fs.readdirSync(dirPath);
	return dir.map((entry) => {
		const currentPath = path.join(dirPath, entry);
		const stat = fs.statSync(currentPath);
		const isDirectory = stat.isDirectory();

		return {
			path: currentPath,
			name: entry,
			isDirectory: isDirectory,
			children: isDirectory ? readDir(currentPath) : [],
		};
	});
};

const runShell = (command) => {
	execSync(command);
};

const stripExtension = (name) => name.split('.').slice(0, -1).join('.');

const templateGenerator = (payload) => (content) =>
	content.replace(/%\{(\w*)\}/gim, (_, key) => payload[key] || '');

const createStructure = (dir, targetPath, payload) => {
	const template = templateGenerator(payload);

	dir.forEach((entry) => {
		if (!entry.isDirectory) {
			const file = String(fs.readFileSync(entry.path) || '');

			const newFile = template(file);
			fs.writeFileSync(
				path.join(targetPath, stripExtension(entry.name)),
				newFile
			);
		} else {
			fs.mkdirSync(path.join(targetPath, entry.name));
			createStructure(
				entry.children,
				path.join(targetPath, entry.name),
				payload
			);
		}
	});
};

module.exports = {
	createPlugin,
};
