# Contributing to My Agent

This document outlines the conventions and rules for contributing to this project.

## Project Rules

1.  **Tool Input Validation:** All tools must define a Zod schema for their inputs to ensure type safety and clear validation.
2.  **Secrets Management:** All secrets, such as API keys, must be managed through environment variables. Do not hardcode them in the source code.
3.  **Tool Organization:** Each tool should reside in its own file within the `tools/` directory. A central `tools/index.ts` should export all available tools.
4.  **Asynchronous Operations:** All I/O operations, especially network requests, must be asynchronous using async/await.
5.  **HTTP Client:** Use the native `fetch` API for all HTTP requests.
