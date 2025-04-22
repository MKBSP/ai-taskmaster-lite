# AI Taskmaster Lite - Copilot Edits Template

When using Copilot Edits, you can reference this template to make Copilot aware of your project context.

Copy and paste the following block at the beginning of your conversation with Copilot:

```
TASKMASTER CONTEXT:
I'm working with AI Taskmaster Lite. Before responding:
1. Check these files:
   - .taskmaster-files/project-prd.md
   - .taskmaster-files/tasks.md
   - .taskmaster-files/schema.md
   - .taskmaster-files/architecture.md
2. Update these files as needed based on my request
3. For PRD updates, first propose changes and wait for "CONFIRM PRD UPDATE" before making changes

Use these files to ground your responses in my project context.
```

## Safety Protocol for PRD Updates

When making changes to the PRD, Copilot will:
1. First propose the changes
2. Ask for confirmation
3. Only make the changes when you explicitly reply with "CONFIRM PRD UPDATE"

This ensures important project documentation isn't modified accidentally.