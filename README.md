# MathScript - Free Online LaTeX Math Editor

A professional digital math notebook that runs entirely in your browser. Write mathematical equations line by line, see them rendered instantly, and export to LaTeX. No setup, no account, no install.

**[Try it now →](https://theophile-jr.github.io/maths-tool/)**

## What is MathScript?

MathScript is a free, open-source tool for anyone who works with mathematics. Whether you're a student solving calculus problems, a researcher drafting proofs, or a teacher preparing lecture notes, MathScript gives you a clean, keyboard-driven workspace for writing math.

Unlike heavy LaTeX editors or complex notebook apps, MathScript is designed for one thing: **writing math fast**. Type an equation, press Enter for the next line, and watch everything render in real-time.

## Features

- **Live LaTeX Preview** - See all your equations rendered together as you type
- **Math & Text Lines** - Mix mathematical expressions with plain text annotations
- **Keyboard-Driven Workflow** - Never touch your mouse. Navigate, add, delete, and toggle with shortcuts
- **Auto-Save** - Your work is saved to your browser automatically. Pick up right where you left off
- **Save/Load Projects** - Export your work as JSON files for backup or sharing
- **LaTeX Export** - Generate complete `.tex` documents ready for pdflatex, xelatex, or lualatex
- **LaTeX Import** - Bring in existing LaTeX files and continue editing
- **Copy to Clipboard** - One-click copy of LaTeX code or plain text
- **Undo/Redo** - Full history with 50-state buffer
- **Dark & Light Themes** - Easy on the eyes, your preference is remembered
- **Zero Dependencies** - Runs in any modern browser. No server, no build step

## Quick Start

### Option 1: Open directly
Just double-click `index.html` in your file browser. It works without a server.

### Option 2: Local server (recommended)
```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```
Then open `http://localhost:8000`.

## How to Use

### Writing your first equation
1. Click the math input area (or just start typing)
2. Type LaTeX math: `E = mc^2`
3. Press **Enter** to add a new line
4. See the live preview update below

### Adding text notes
- Press **Shift+Enter** to add a text line instead of a math line
- Or click the **Text** button in the toolbar
- Toggle any line between Math and Text with **Ctrl+Space**

### Navigating
- **Arrow Up/Down** moves between lines
- **Backspace** on an empty line deletes it
- Everything is keyboard-accessible

### Saving your work
- **Auto-save** happens automatically to your browser
- **Ctrl+S** downloads a `.json` project file
- **Load** button restores from a saved project file

### Exporting to LaTeX
- **Ctrl+E** downloads a complete `.tex` file with your equations
- The exported file includes document class, packages, and structure
- Ready to compile with any LaTeX engine

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Add new math line |
| `Shift+Enter` | Add new text line |
| `Ctrl+Space` | Toggle math/text mode on current line |
| `↑` / `↓` | Navigate between lines |
| `Backspace` (on empty line) | Delete current line |
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` or `Ctrl+Y` | Redo |
| `Ctrl+S` | Save project file |
| `Ctrl+E` | Export LaTeX document |
| `Ctrl+L` | Clear all content |
| `Ctrl+M` | Add math line |
| `Ctrl+T` | Add text line |

## Project Structure

```
maths-tool/
├── index.html              # Entry point
├── README.md               # Documentation
├── package.json            # Project metadata
├── old/                    # Legacy versions
│   ├── v1.html
│   └── v2.html
└── src/
    ├── app.js              # Application bootstrap
    ├── core/
    │   ├── math-editor.js  # Editor logic (rows, preview, state)
    │   ├── history.js      # Undo/redo state management
    │   ├── keyboard.js     # Keyboard event handling
    │   └── io.js           # File I/O (save, load, export, import)
    ├── ui/
    │   ├── ui-manager.js   # UI bindings, theme, status
    │   └── onboarding.js   # First-time user experience
    ├── utils/
    │   └── storage.js      # localStorage auto-save
    └── styles/
        ├── variables.css   # CSS custom properties & themes
        ├── layout.css      # Page layout & structure
        └── components.css  # Interactive component styles
```

## Architecture

### Core Modules

**MathEditor** - Manages the line-based editor stack, creates/toggles input rows, builds the combined LaTeX preview, and handles state serialization.

**HistoryManager** - Maintains an immutable state history with a cursor position. Supports undo, redo, and configurable history depth (default: 50 states).

**KeyboardHandler** - Centralized keyboard event routing with context-aware handling for math-field vs textarea inputs. Separates global shortcuts from input-specific behavior.

**ProjectIO** - Handles all file operations: project save/load (JSON), LaTeX export (full document template), LaTeX import (parses document structure), and clipboard operations.

### UI Layer

**UIManager** - Binds toolbar buttons, manages theme toggle with localStorage persistence, and controls the status bar notification system.

**OnboardingManager** - Provides a first-time user experience with a hero section explaining the tool. Dismisses permanently after first use.

**StorageManager** - Automatic localStorage persistence. Saves state on every change with debouncing. Restores on page load.

### Styling

CSS uses custom properties (CSS variables) for consistent theming:
- `variables.css` - Design tokens, color palette, spacing scale, dark/light themes
- `layout.css` - Page structure, hero section, responsive breakpoints
- `components.css` - Buttons, inputs, status bar, badges, keyboard hints

## Who is this for?

- **Students** - Write homework solutions, practice problems, take math notes
- **Researchers** - Draft proofs, sketch equations before paper submission
- **Teachers** - Prepare lecture notes, create problem sets
- **Anyone** - Who needs to write math without installing software

## Dependencies

- **[MathLive](https://cortexjs.io/mathlive/)** (loaded via CDN) - Web component for LaTeX math input
  - Source: `https://esm.run/mathlive`

No other dependencies. No build tools. No npm install required.

## Browser Support

- Chrome 89+
- Firefox 87+
- Safari 15+
- Edge 89+

## License

MIT License. © 2025 Théophile Jérôme-Rocher

Free to use, modify, and distribute. No warranty.
