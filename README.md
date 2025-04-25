# 📝 Text Analyzer Web App

This is a simple **text analysis tool** built with JavaScript that provides real-time statistics about any input text. It helps users understand their writing better by counting characters, words, and sentences, estimating reading time, and analyzing letter frequency.

## 🔍 Features

- ✅ Character count (with and without spaces)
- ✅ Word count
- ✅ Sentence count
- ✅ Estimated reading time
- ✅ Letter frequency analysis (A-Z, case-insensitive)
- ✅ Sorted frequency list
- ⚠️ A Warning/alert, when character count nears or exceeds a limit

## 🧪 Unit Testing

This project uses **Jest** for unit testing:

- Tests all counting functions individually
- Includes DOM manipulation tests using `jsdom`
- Edge cases handled (empty strings, special characters, extra spaces, etc.)

## 🚀 How to Run

1. Clone this repo
2. Run:

```bash
npm install
npm test
```

3. To test DOM updates, make sure your `@jest-environment jsdom` is set correctly.

## 📦 Tech Stack

- JavaScript
- Jest (Testing)
- jsdom (for simulating DOM in tests)
