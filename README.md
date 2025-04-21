# 🚀 AI Taskmaster Lite

> **TL;DR**: Make GitHub Copilot, Claude, or ChatGPT write better code by giving them context. Stop getting garbage code suggestions that don't match your project. This lightweight tool supercharges your AI coding assistant by 90% with zero setup pain.

![Stars](https://img.shields.io/github/stars/mkbsp/ai-taskmaster-lite?style=social)
![License](https://img.shields.io/github/license/mkbsp/ai-taskmaster-lite)
![Last Commit](https://img.shields.io/github/last-commit/mkbsp/ai-taskmaster-lite)

## 😩 The Problem

We've all been there:

- GitHub Copilot suggests code that **breaks your existing architecture**
- Claude keeps forgetting what your project is actually about
- ChatGPT invents components you already built
- Your AI assistant has no idea what your database schema looks like
- You're tired of repeating project context in EVERY. SINGLE. PROMPT.

## 💡 The Solution

**AI Taskmaster Lite** gives your AI coding assistant the context it needs by:

1. Maintaining key project documents (PRD, tasks, schema, architecture)
2. Auto-instructing AI to check these files BEFORE writing code
3. Forcing AI to update documentation as your project evolves
4. Zero setup, works with ANY project

## 🔥 Works With

- GitHub Copilot
- OpenAI ChatGPT (4o, GPT-4)
- Anthropic Claude
- Any AI coding assistant in VS Code

## ⚡️ Quick Install

```bash
git clone https://github.com/yourusername/ai-taskmaster-lite.git .taskmaster
cd .taskmaster && chmod +x setup.sh && ./setup.sh
```

That's it! Now use snippets `/tm` or `/tmfix` in your AI chat.

## 🎬 Demo

VIDEO

*AI Taskmaster checking context before suggesting code changes*

## 🛠️ How It Works

1. **Type `/tm` in your AI chat** followed by your request
2. **AI automatically checks** your documentation files
3. **Documentation updates** with changes from your request
4. **Get context-aware code** that fits your architecture
5. **No more bad suggestions!**

```
/tm Add a function to enlarge profile pics when clicked
```

The AI will:
- Check your PRD, tasks, architecture, and schema files
- Update documentation with the new feature
- Write code that integrates with your existing systems

## 🐛 Troubleshooting Made Easy

Got errors? Type `/tmfix` followed by your error message.

The AI will:
1. Check your project context
2. Identify the likely cause
3. Suggest 3 solutions with pros/cons
4. Let you choose the best approach

```
/tmfix TypeError: Cannot read property 'profile' of undefined
```

## 📂 Core Files

- **project-prd.md**: Product Requirements Document
- **tasks.md**: Task tracking with checkboxes
- **schema.md**: Database schema documentation
- **architecture.md**: System architecture overview

## 🙏 Help Wanted!

I'm just a shitty self-taught developer who got tired of fixing AI-generated code that breaks my projects. This is my attempt to fix it, but I need your help!

- 🌟 **Star the repo** if you find it useful
- 🐛 **Report issues** when you find them
- 🔧 **Submit PRs** to improve the tool
- 💡 **Share ideas** for making it even better

## 🔍 Why This Helps "Vibe Coding"

When you're in the flow state (aka "vibe coding"), the last thing you want is to debug bad AI suggestions. AI Taskmaster keeps your AI assistant informed about your project so you can stay in the zone.

## 🎯 Search Keywords

Code faster | Fix GitHub Copilot | Fix Claude | Fix AI agent coding mistakes | GitHub Copilot Claude | GitHub Copilot OpenAI | ChatGPT | ChatGPT 4o | Taskmaster | Vibe coding | Stop bad AI code | AI coding assistant | VS Code AI | Prompt engineering | AI context | Project management

## 📄 License

MIT License - Use it, improve it, share it!