#!/bin/bash

echo "Setting up Taskmaster Lite..."

# Create .taskmaster directory if it doesn't exist
mkdir -p .taskmaster

# Create template files
echo "Creating template files..."
curl -s https://raw.githubusercontent.com/yourusername/taskmaster-lite/main/templates/project-prd.md > .taskmaster/project-prd.md
curl -s https://raw.githubusercontent.com/yourusername/taskmaster-lite/main/templates/tasks.md > .taskmaster/tasks.md
curl -s https://raw.githubusercontent.com/yourusername/taskmaster-lite/main/templates/schema.md > .taskmaster/schema.md
curl -s https://raw.githubusercontent.com/yourusername/taskmaster-lite/main/templates/architecture.md > .taskmaster/architecture.md
curl -s https://raw.githubusercontent.com/yourusername/taskmaster-lite/main/templates/taskmaster-prompts.md > .taskmaster/taskmaster-prompts.md

# Create VS Code snippets directory if it doesn't exist
mkdir -p .vscode

# Create or update VS Code snippets
cat > .vscode/taskmaster.code-snippets << 'EOL'
{
  "Taskmaster Request": {
    "prefix": "/tm",
    "body": [
      "// TASKMASTER REQUEST",
      "// My request: $1",
      "// ",
      "// IMPORTANT: Before responding, please check the following files:",
      "// - .taskmaster/project-prd.md",
      "// - .taskmaster/tasks.md",
      "// - .taskmaster/schema.md", 
      "// - .taskmaster/architecture.md",
      "// ",
      "// Update these files as needed based on my request, and inform me of any changes made.",
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
      "// 1. Check .taskmaster files to understand context",
      "// 2. Identify the likely reason for this error",
      "// 3. Provide 3 possible solutions with pros and cons",
      "// 4. Make your recommendation",
      "// ",
      "// Wait for my selection before implementing any code changes."
    ],
    "description": "Request troubleshooting help with Taskmaster context"
  }
}
EOL

echo "Setup complete! Taskmaster is ready to use."
echo "In VS Code, type /tm to start a Taskmaster-aware request to Copilot."