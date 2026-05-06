# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
npm run lint      # run ESLint
npm run preview   # preview production build
```

## Architecture

This is a single-file React app — all logic and UI lives in `src/App.jsx`. There is no routing, no external state library, and no backend; all data is held in React `useState` and resets on page refresh.

**Known bug (intentional):** `amount` is stored as a string in state. The `reduce` calls for `totalIncome` and `totalExpenses` use string concatenation instead of numeric addition, producing incorrect summary totals. The fix is to parse `amount` to a number when adding a transaction or when reading it in the reducers.

**Data shape for a transaction:**
```js
{ id, description, amount, type: "income"|"expense", category, date }
```

Categories are a fixed array: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`.
