# HabitGrid | 365-Day Zero-Server Habit Tracker (`habit-grid.github.io`)

**HabitGrid** is a 100% client-side web application built with **Astro**, **React (Islands Architecture)**, and **Tailwind CSS** that allows users to track daily habits via a GitHub-style 365-day contribution heatmap. Zero server uploads ensure total privacy—all data is persisted entirely in your browser via `LocalStorage`.

- **Live URL:** [https://habit-grid.github.io](https://habit-grid.github.io)
- **Support the Developer:** [Buy Me a Coffee (@kisharadilz)](https://buymeacoffee.com/kisharadilz)

---

## ✨ Key Architectural Features

1. **GitHub-Style 365-Day Contribution Heatmap (`src/components/HeatmapGrid.tsx`)**
   - Renders a 53-week × 7-day calendar matrix for the current year (`2026`) and future years (`2027`, `2028`, `2029`, `2030`).
   - Clicking any day square cycles through 4 custom activity intensity levels (`0 → 1 → 2 → 3 → 0`) or paints directly using brush mode.
   - Horizontally scrollable with hidden scrollbars on mobile/tablet (`no-scrollbar`) and expansive full-width layout on desktop.

2. **Custom 4-Level Color Palette (`tailwind.config.mjs`)**
   - **Level 0 (Empty):** `#FFEFC4`
   - **Level 1 (Low Intensity):** `#97D7FF`
   - **Level 2 (Medium Intensity):** `#4D8DBA`
   - **Level 3 (High Intensity):** `#086288`

3. **Zero-Server Persistence & Year Isolation (`src/hooks/useLocalStorage.ts`)**
   - Custom React `useLocalStorage` hook synchronizes habit boards and daily intensity maps immediately to `window.localStorage`.
   - Each habit board and year (`2026`, `2027`, `2028`, `2029`, `2030`) is isolated under its own storage key, plus full JSON backup/restore support.

4. **High-DPI HTML5 Canvas PNG Export (`src/utils/exportCanvas.ts`)**
   - Clicking **Download Graph** renders the complete 53-week heatmap, habit title, streak KPIs, and color legend onto a 2× Retina HTML5 `<canvas>` and downloads a crisp, shareable `.png` card.

5. **7-Language Subpath i18n Routing & Peak Technical SEO (`src/i18n/`)**
   - Static subpath routes generated for English (`/`), Español (`/es/`), Português (`/pt/`), Deutsch (`/de/`), Français (`/fr/`), 日本語 (`/ja/`), and 简体中文 (`/zh/`).
   - Responsive sticky `Navbar.astro` with strict icon-only mobile/tablet breakpoints, Light/Dark theme switcher, and BuyMeACoffee CTA.

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start Astro dev server
npm run dev

# Build static production bundle into dist/
npm run build
```
