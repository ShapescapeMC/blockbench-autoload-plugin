(function () {
	var import_button;

	// Import required modules
	const path = require("path");
	const fs = require('fs');

	// Get the directory path of the current project
	function getDirectoryPath() {
		return path.dirname(Project.export_path);
	}

	// Scan the specified directory and its subdirectories for animation and PNG files
	function scanDirectory(directoryPath) {
		const animationFiles = [];
		const pngFiles = [];

		// Recursively scan files in a directory
		function scanFiles(dir) {
			const files = fs.readdirSync(dir);

			for (const file of files) {
				const filePath = path.join(dir, file);
				const stat = fs.statSync(filePath);

				if (stat.isDirectory()) {
					// Recursively scan subdirectories
					scanFiles(filePath);
				} else {
					// Check the file ending and add to the appropriate list
					if (file.endsWith("animation.json")) {
						animationFiles.push(filePath);
					} else if (file.endsWith(".png")) {
						pngFiles.push(filePath);
					}
				}
			}
		}

		scanFiles(directoryPath);

		// Return the collected animation and PNG files
		return {
			animationFiles,
			pngFiles,
		};

	}

	// Import a texture from the specified path and handle the loading callback
	function importTextureFromPath(path) {
		console.log("[SYSTEM AUTLOAD] ", path)
		new Texture().fromPath(path).add(false); // Create a new Texture object from the specified path

		Canvas.updateLayeredTextures();

	}

	function importAnimationFromPath(animation_path){
		Blockbench.read(animation_path, { readtype: "text" }, function (file) {
			//debugger;
			Animator.loadFile(file[0]);
		});
	}

	// Import files from the directory and subdirectories
	function importFiles(){
		dirPath = getDirectoryPath();
		console.log('[SYSTEM AUTOLOAD] Directory Path: ', dirPath);

		const importFiles = scanDirectory(dirPath)
		console.log("[SYSTEM AUTOLOAD] Files to Import: ", importFiles);

		// Iterate through the PNG files and import each texture
		for (const filePath of importFiles.pngFiles)
			importTextureFromPath(filePath);

		// Iterate through the Animtion files and import each animation
		for (const filePath of importFiles.animationFiles)
			importAnimationFromPath(filePath);
	}

	// Register the plugin
	BBPlugin.register("system_autoload", {
		title: "System Autoload",
		author: "Shapescape",
		icon: "fas.fa-truck-ramp-box",
		description:
			"Automatically loading relevant files when opening a .geo file from a system_template system.",
		version: "0.0.2",
		variant: "desktop",
		onload() {
			// Create an import button action
			import_button = new Action("load_from_system", {
				name: "Load Files From System",
				description:
					"Loads animations and textures from directory and subdirectories into the project.",
				icon: "fas.fa-truck-ramp-box",
				click: function () {
					importFiles();
				},
			});

			// Add the import button to the menu bar
			MenuBar.addAction(import_button, "file.import.3");
		},
		onunload() {
			// Delete the import button when unloading the plugin
			import_button.delete();
		},
	});
})();
