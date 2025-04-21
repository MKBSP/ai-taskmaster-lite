# Taskmaster Prompt Templates

This file contains prompt templates to use with GitHub Copilot Chat or similar AI assistants to manage your project documentation.

Copy and paste these into your AI assistant chat, filling in the bracketed sections with your specific information.

## Core Commands

### Initialize Project

```
I want to use taskmaster-lite to manage my project. Please initialize my project with this description: "[Your project description]". 

Create the following files if they don't exist:
1. .taskmaster/project-prd.md - A comprehensive PRD based on my description
2. .taskmaster/tasks.md - A task breakdown with checkboxes
3. .taskmaster/schema.md - An initial database schema if applicable
4. .taskmaster/architecture.md - A high-level architecture overview

Please make these detailed but concise, as if created by an experienced project manager.
```

### Update PRD

```
Please review my .taskmaster/project-prd.md file and update it with the following new information: "[New information or requirements]".

Make sure the document remains cohesive, well-structured, and complete. Add any new sections needed.
```

### Generate Tasks

```
Based on my current .taskmaster/project-prd.md file, please update the .taskmaster/tasks.md file with a comprehensive task breakdown.

Use the format:
- [ ] Major Task
  - [ ] Subtask 1
  - [ ] Subtask 2

For any tasks that appear to be completed in my codebase, mark them with [X] instead.
```

### Mark Task Complete

```
Please update the .taskmaster/tasks.md file to mark the following task as complete:
"[Task description or exact text]"

Also update any parent tasks if all subtasks are now complete.
```

### Update Architecture

```
Please review my current codebase and the .taskmaster/architecture.md file, then update the architecture document with the following changes: "[Architecture changes]"

Ensure the document provides a clear overview of components, their interactions, data flow, and file organization.
```

### Update Schema

```
Please review my current database implementation and update the .taskmaster/schema.md file with the following changes: "[Schema changes]"

The schema document should include tables, fields, relationships, and any important constraints or indexes.
```

## Additional Commands

### Project Status Report

```
Please review my .taskmaster files and codebase to generate a project status report. Include:
1. Percentage of tasks completed
2. Current milestone progress
3. Next priority tasks
4. Any potential issues or roadblocks
```

### Refactor Suggestion

```
Based on my .taskmaster architecture documentation and current codebase, suggest potential refactoring opportunities to better align with the documented architecture and best practices.
```