# Blockbench Autoload Plugin

## About

This repository contains the System File Loader Blockbench plugin, which allows for easy importing of PNG and animation files into a project when the geometry file is located in the same directory as the other files. It can currently read files from the same directory or from subdirectories.

## Installation

Currently, installation is only possible through a local file that can be installed. We are working on hosting the plugin on our GitHub so that you can install it via URL in the future.

To install the plugin from a file, follow these steps:

1. Clone this repository.
2. Open Blockbench.
3. Import the plugin file by going to **File -> Plugins... -> Load Plugins from File**. Navigate to the cloned repository and select the `system_autoload.json` file.
4. To confirm that the plugin has been installed correctly, go to **File -> Plugins...**. Under the "Installed" section, you should see `System File Loader`

## Usage

1. Open a geometry file from a system.
2. Go to **File -> Import -> Load Files from System**.

**Note:** This will import all texture and animation files from the same directory into the project. It is recommended to follow the system hierarchy below when dealing with multiple geometries in the same system:

```java
- my_system
    - _scope.json
    - _map.py
    - some_file.json
    - some_other_file.json
    - big_chair
        - big_chair.geo.json
        - big_chair_0.animation.json
        - big_chair_1.animation.json
        - big_chair_0.png
        - big_chair_1.png
        - big_chair_2.png  
    - small_chair
        - small_chair.geo.json
        - small_chair.animation.json
        - small_chair.png                        
```