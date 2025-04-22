#!/bin/bash

echo "Setting up AI Taskmaster Lite..."

# Create .taskmaster-files directory if it doesn't exist
mkdir -p .taskmaster-files

# Copy the original taskmaster content to the new location
if [ -d ".taskmaster" ]; then
  cp -r .taskmaster/* .taskmaster-files/
  echo "Migrated existing .taskmaster content to .taskmaster-files/"
else
  # Create template files if starting fresh
  echo "Creating template files..."
  curl -s https://raw.githubusercontent.com/yourusername/taskmaster-lite/main/templates/project-prd.md > .taskmaster-files/project-prd.md
  curl -s https://raw.githubusercontent.com/yourusername/taskmaster-lite/main/templates/tasks.md > .taskmaster-files/tasks.md
  curl -s https://raw.githubusercontent.com/yourusername/taskmaster-lite/main/templates/schema.md > .taskmaster-files/schema.md
  curl -s https://raw.githubusercontent.com/yourusername/taskmaster-lite/main/templates/architecture.md > .taskmaster-files/architecture.md
  curl -s https://raw.githubusercontent.com/yourusername/taskmaster-lite/main/templates/taskmaster-prompts.md > .taskmaster-files/taskmaster-prompts.md
  # Add the new edits template
  curl -s https://raw.githubusercontent.com/yourusername/taskmaster-lite/main/templates/edits-template.md > .taskmaster-files/edits-template.md
fi

# Create VS Code snippets directory if it doesn't exist
mkdir -p .vscode

# Create symlink for easier access from VS Code
if [ ! -L ".vscode/.taskmaster-files" ]; then
  ln -sf ../.taskmaster-files .vscode/.taskmaster-files
fi

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
      "// - .taskmaster-files/project-prd.md",
      "// - .taskmaster-files/tasks.md",
      "// - .taskmaster-files/schema.md", 
      "// - .taskmaster-files/architecture.md",
      "// ",
      "// Update these files as needed based on my request, and inform me of any changes made.",
      "// For PRD updates, first propose changes and wait for my \"CONFIRM PRD UPDATE\" message.",
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
}
EOL

# Create tm.json for Copilot Chat
mkdir -p .vscode/copilot/snippets
cat > .vscode/copilot/snippets/tm.json << 'EOL'
{
  "name": "tm",
  "description": "AI Taskmaster Lite - Context Management",
  "prompt": "You're helping me with AI Taskmaster Lite context management.\n\nBefore responding, check these files:\n- .taskmaster-files/project-prd.md\n- .taskmaster-files/tasks.md\n- .taskmaster-files/schema.md\n- .taskmaster-files/architecture.md\n\nCommands:\n- 'prd': Show the PRD\n- 'tasks': Show tasks\n- 'schema': Show schema\n- 'arch': Show architecture\n- 'update [file] [changes]': Update a file\n\nFor PRD updates, first show proposed changes and wait for my 'CONFIRM PRD UPDATE' message before making changes.\n\nThe user's request is: {{selection}}"
}
EOL

echo "Setup complete! AI Taskmaster Lite is ready to use."
echo ""
echo "To use with Copilot Chat: Type /tm followed by your command"
echo "To use with Copilot Edits: Reference the .taskmaster-files/edits-template.md file"