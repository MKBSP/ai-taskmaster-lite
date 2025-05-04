/**
 * AI Taskmaster Lite
 * A lightweight tool that supercharges AI coding assistants by providing project context.
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

/**
 * Initialize the Taskmaster context in the project
 * @param {Object} options Configuration options
 * @param {string} options.projectDir The project directory to initialize Taskmaster in
 * @returns {Promise<boolean>} Success status
 */
async function initializeTaskmaster(options = {}) {
  try {
    const projectDir = options.projectDir || process.cwd();
    const taskmasterDir = path.join(projectDir, '.taskmaster-files');
    
    // Ensure the directory exists
    await fs.ensureDir(taskmasterDir);
    
    console.log(chalk.green('Taskmaster directory initialized at:'), taskmasterDir);
    return true;
  } catch (error) {
    console.error(chalk.red('Failed to initialize Taskmaster:'), error.message);
    return false;
  }
}

/**
 * Read a Taskmaster file
 * @param {string} filename The name of the file to read (without path)
 * @param {Object} options Additional options
 * @returns {Promise<string>} The file contents
 */
async function readTaskmasterFile(filename, options = {}) {
  try {
    const projectDir = options.projectDir || process.cwd();
    const filePath = path.join(projectDir, '.taskmaster-files', filename);
    
    if (!await fs.pathExists(filePath)) {
      return null;
    }
    
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(chalk.red(`Failed to read Taskmaster file ${filename}:`), error.message);
    return null;
  }
}

/**
 * Write or update a Taskmaster file
 * @param {string} filename The name of the file to write (without path)
 * @param {string} content The content to write to the file
 * @param {Object} options Additional options
 * @returns {Promise<boolean>} Success status
 */
async function writeTaskmasterFile(filename, content, options = {}) {
  try {
    const projectDir = options.projectDir || process.cwd();
    const filePath = path.join(projectDir, '.taskmaster-files', filename);
    
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, content, 'utf8');
    
    return true;
  } catch (error) {
    console.error(chalk.red(`Failed to write Taskmaster file ${filename}:`), error.message);
    return false;
  }
}

/**
 * List all Taskmaster files in the project
 * @param {Object} options Additional options
 * @returns {Promise<string[]>} Array of filenames
 */
async function listTaskmasterFiles(options = {}) {
  try {
    const projectDir = options.projectDir || process.cwd();
    const taskmasterDir = path.join(projectDir, '.taskmaster-files');
    
    if (!await fs.pathExists(taskmasterDir)) {
      return [];
    }
    
    return await fs.readdir(taskmasterDir);
  } catch (error) {
    console.error(chalk.red('Failed to list Taskmaster files:'), error.message);
    return [];
  }
}

/**
 * Get all Taskmaster context files as an object
 * @param {Object} options Additional options
 * @returns {Promise<Object>} Object with file contents
 */
async function getTaskmasterContext(options = {}) {
  try {
    const files = await listTaskmasterFiles(options);
    const context = {};
    
    for (const file of files) {
      context[file] = await readTaskmasterFile(file, options);
    }
    
    return context;
  } catch (error) {
    console.error(chalk.red('Failed to get Taskmaster context:'), error.message);
    return {};
  }
}

// Export the API
module.exports = {
  initializeTaskmaster,
  readTaskmasterFile,
  writeTaskmasterFile,
  listTaskmasterFiles,
  getTaskmasterContext,
  
  // Also export the setup function
  setup: require('./setup')
};