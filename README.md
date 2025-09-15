# AI Code Review Agent

An AI-powered code review agent that uses Google's Gemini model to analyze code changes and provide constructive feedback.

## Features

- 🔍 Analyzes git diffs and code changes
- 🤖 Powered by Google's Gemini 2.5 Flash model
- 📝 Provides detailed, constructive code review feedback
- ⚡ Fast and efficient with parallel processing
- 🛡️ Robust error handling and validation

## Prerequisites

- [Bun](https://bun.com) runtime
- Google AI API key
- Git repository

## Setup

1. Install dependencies:
```bash
bun install
```

2. Set up your environment variables:
```bash
# Create .env file with your Google AI API key
echo "GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here" > .env
```

3. Get your Google AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Usage

### Basic Usage
```bash
bun run index.ts
```

### With Custom Prompt
```bash
bun run index.ts "Please review the recent changes and focus on security issues"
```

### Development Mode
```bash
bun run dev
```

## How It Works

1. The agent scans your git repository for changes
2. It uses the Google Gemini model to analyze the code
3. Provides detailed feedback following best practices for code review
4. Focuses on correctness, clarity, maintainability, and security

## Configuration

The agent automatically excludes common files like:
- `dist/` directory
- `bun.lock`
- `node_modules/`
- Vim swap files (`*.swp`, `*.swo`)

You can customize exclusions by modifying the `defaultExcludeFiles` array in `tools.ts`.

## Scripts

- `bun run start` - Run the application
- `bun run dev` - Run in watch mode for development
- `bun run build` - Build the application
- `bun run type-check` - Run TypeScript type checking

## License

Private project - All rights reserved.
