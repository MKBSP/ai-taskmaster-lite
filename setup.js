#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

console.log(chalk.blue('Setting up AI Taskmaster Lite...'));

// Get the current working directory (where the script is run)
const cwd = process.cwd();

// Define paths
const taskmasterFilesDir = path.join(cwd, '.taskmaster-files');
const taskmasterOldDir = path.join(cwd, '.taskmaster');
const vscodeDir = path.join(cwd, '.vscode');
const vscodeSymlinkTarget = path.join(vscodeDir, '.taskmaster-files');
const templateSourceDir = path.join(__dirname, 'templates');

// Create .taskmaster-files directory if it doesn't exist
fs.ensureDirSync(taskmasterFilesDir);

// Check if we need to migrate from old .taskmaster directory
if (fs.existsSync(taskmasterOldDir)) {
  console.log(chalk.yellow('Migrating existing .taskmaster content to .taskmaster-files/'));
  fs.copySync(taskmasterOldDir, taskmasterFilesDir);
} else {
  // Create template files if starting fresh
  console.log(chalk.green('Creating template files...'));
  
  const templates = [
    'project-prd.md',
    'tasks.md',
    'schema.md',
    'architecture.md',
    'taskmaster-prompts.md',
    'edits-template.md',
    'troubleshooting.md'
  ];
  
  templates.forEach(template => {
    const source = path.join(templateSourceDir, template);
    const destination = path.join(taskmasterFilesDir, template);
    if (fs.existsSync(source)) {
      fs.copySync(source, destination);
    } else {
      console.log(chalk.red(`Warning: Template ${template} not found at ${source}`));
    }
  });
}

// Create VS Code snippets directory if it doesn't exist
fs.ensureDirSync(vscodeDir);

// Create symlink for easier access from VS Code
try {
  // Remove symlink if it exists but points to the wrong place
  if (fs.existsSync(vscodeSymlinkTarget) && !fs.lstatSync(vscodeSymlinkTarget).isSymbolicLink()) {
    fs.removeSync(vscodeSymlinkTarget);
  }
  
  // Create the symlink if it doesn't exist
  if (!fs.existsSync(vscodeSymlinkTarget)) {
    // Use relative path for the symlink target
    const relativeTargetPath = path.relative(vscodeDir, taskmasterFilesDir);
    fs.symlinkSync(relativeTargetPath, vscodeSymlinkTarget, 'dir');
  }
} catch (error) {
  console.log(chalk.yellow(`Note: Could not create symlink. This is fine, continuing setup. Error: ${error.message}`));
}

// Create or update VS Code snippets
const snippetsDir = path.join(vscodeDir, 'taskmaster.code-snippets');
const snippetsContent = `{
  "Taskmaster Request": {
    "prefix": "/tm",
    "body": [
      "// TASKMASTER REQUEST",
      "// My request: $1",
      "// ",
      "// IMPORTANT: Before responding, please check the following files:",
      "// - .taskmaster-files/project-prd.md",
      "// - .taskmaster-files/tasks.md",
      "// - .taskmaster-files/schema.md", 
      "// - .taskmaster-files/architecture.md",
      "// ",
      "// Update these files as needed based on my request, and inform me of any changes made.",
      "// For PRD updates, first propose changes and wait for my \\"CONFIRM PRD UPDATE\\" message.",
      "// Then proceed with implementing my request."
    ],
    "description": "Make a request to GitHub Copilot with automatic taskmaster file checking"
  },
  "Taskmaster Troubleshoot": {
    "prefix": "/tmfix",
    "body": [
      "// TASKMASTER TROUBLESHOOT",
      "// Error details: $1",
      "// ",
      "// IMPORTANT: Before responding:",
      "// 1. Check .taskmaster-files to understand context",
      "// 2. Identify the likely reason for this error",
      "// 3. Provide 3 possible solutions with pros and cons",
      "// 4. Make your recommendation",
      "// ",
      "// Wait for my selection before implementing any code changes."
    ],
    "description": "Request troubleshooting help with Taskmaster context"
  }
}`;

fs.writeFileSync(snippetsDir, snippetsContent);

// Create tm.json for Copilot Chat
const copilotSnippetsDir = path.join(vscodeDir, 'copilot', 'snippets');
fs.ensureDirSync(copilotSnippetsDir);

const tmJsonContent = `{
  "name": "tm",
  "description": "AI Taskmaster Lite - Context Management",
  "prompt": "You're helping me with AI Taskmaster Lite context management.\\n\\nBefore responding, check these files:\\n- .taskmaster-files/project-prd.md\\n- .taskmaster-files/tasks.md\\n- .taskmaster-files/schema.md\\n- .taskmaster-files/architecture.md\\n\\nCommands:\\n- 'prd': Show the PRD\\n- 'tasks': Show tasks\\n- 'schema': Show schema\\n- 'arch': Show architecture\\n- 'update [file] [changes]': Update a file\\n\\nFor PRD updates, first show proposed changes and wait for my 'CONFIRM PRD UPDATE' message before making changes.\\n\\nThe user's request is: {{selection}}"
}`;

fs.writeFileSync(path.join(copilotSnippetsDir, 'tm.json'), tmJsonContent);

// Set executable permissions on the setup.js file for Unix-like systems
try {
  if (process.platform !== 'win32') {
    execSync(`chmod +x ${__filename}`);
  }
} catch (error) {
  console.log(chalk.yellow(`Note: Could not set executable permissions. This is okay on some systems. Error: ${error.message}`));
}

console.log(chalk.green('Setup complete! AI Taskmaster Lite is ready to use.'));
console.log('');
console.log('To use with Copilot Chat: Type /tm followed by your command');
console.log('To use with Copilot Edits: Reference the .taskmaster-files/edits-template.md file');
console.log('');
console.log(chalk.blue('Documentation files are located in: .taskmaster-files/'));