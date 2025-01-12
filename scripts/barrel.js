const fs = require('fs');
const path = require('path');

/**
 * The folder containing the files to be exported.
 * @type {string}
 */
const folderPath = './data'; // Change this to your desired folder path

/**
 * The path to the generated index file.
 * @type {string}
 */
const outputFile = path.join(folderPath, 'index.ts');

/**
 * Reads the folder and generates an index.ts barrel file.
 */
fs.readdir(folderPath, (err, files) => {
	if (err) {
		console.error('Error reading folder:', err);
		return;
	}

	/**
	 * Filter out the `index.ts` file and non-TypeScript files,
	 * then generate export statements for each file.
	 * @type {string}
	 */
	const exportStatements = files
		.filter((file) => file.endsWith('.ts') && file !== 'index.ts') // Exclude index.ts
		.map((file) => `export * from "./${file.replace('.ts', '')}";`)
		.join('\n');

	// Write the export statements to the index.ts file
	fs.writeFile(outputFile, exportStatements, (err) => {
		if (err) {
			console.error('Error writing index.ts file:', err);
		} else {
			console.log('index.ts file created successfully!');
		}
	});
});
