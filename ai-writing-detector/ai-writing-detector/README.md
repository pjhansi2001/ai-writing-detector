# AI Writing Detector

Scan any text for 25 telltale patterns that give away AI-generated writing. Runs entirely in the browser — no text is sent to any server.

## What it detects

**Content patterns** — significance inflation, promotional language, vague attributions, formulaic challenge sections

**Language patterns** — overused AI vocabulary, copula avoidance, negative parallelisms, rule of three, synonym cycling, false ranges

**Style patterns** — em dash overuse, boldface overuse, inline-header lists, emoji decoration

**Communication patterns** — chatbot artifacts, knowledge-cutoff disclaimers, sycophantic tone

**Filler & hedging** — filler phrases, excessive hedging, generic positive conclusions, hyphenated pair overuse

## Pages

- **/** — The detector. Paste text, get a score and detailed findings
- **/patterns** — Browse all 25 patterns with before/after examples and fixes
- **/about** — How it works, scoring methodology, limitations

## Getting started

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

## Build for production

```bash
npm run build
npm run preview
```

## How scoring works

Each detected pattern adds deductions based on match count. The tool also factors in pattern density relative to text length, so a short text with many tells is penalized more heavily than a long one with the same count. Scores range from 0 (saturated with AI patterns) to 100 (reads human).

## Based on

[Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), maintained by WikiProject AI Cleanup.

## Tech stack

React 18 · React Router · Vite · All client-side, no backend
