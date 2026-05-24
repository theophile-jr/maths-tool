# MathScript

A professional digital math notebook for pure mathematics. Write, preview, and export mathematical expressions with an intuitive line-based editor.

## Features

- **Math & Text Lines**: Toggle between LaTeX math input and plain text annotations
- **Live Preview**: See all expressions rendered together in real-time
- **Undo/Redo**: Full history management with 50-state buffer
- **Save/Load Projects**: JSON-based project files for persistence
- **LaTeX Export**: Generate complete `.tex` documents ready for compilation
- **LaTeX Import**: Import existing LaTeX files
- **Keyboard Navigation**: Full keyboard-driven workflow
- **Dark/Light Theme**: Toggle between themes
- **Copy to Clipboard**: Export LaTeX or plain text instantly

## Quick Start

Open `index.html` in any modern browser. No build step required.

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`.

## Project Structure

```
maths-tool/
├── index.html              # Entry point
├── v1.html                 # Original version backup
├── v2.html                 # Pre-refactor backup
├── src/
│   ├── app.js              # Application bootstrap & wiring
│   ├── core/
│   │   ├── math-editor.js  # Editor logic (rows, preview, state)
│   │   ├── history.js      # Undo/redo state management
│   │   ├── keyboard.js     # Keyboard event handling
│   │   └── io.js           # File I/O (save, load, export, import)
│   ├── ui/
│   │   └── ui-manager.js   # UI bindings & status management
│   └── styles/
│       ├── variables.css   # CSS custom properties & themes
│       ├── layout.css      # Page layout & structure
│       └── components.css  # Interactive component styles
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | New math line |
| `Shift+Enter` | New text line |
| `Ctrl+Space` | Toggle math/text mode |
| `↑` / `↓` | Navigate between lines |
| `Backspace` (empty) | Delete current line |
| `Ctrl+Z` | Undo |
| `Ctrl+S` | Save project |
| `Ctrl+E` | Export LaTeX |
| `Ctrl+L` | Clear all |
| `Ctrl+M` | Add math line |
| `Ctrl+T` | Add text line |

## Architecture

### Core Modules

**MathEditor** (`src/core/math-editor.js`)
- Manages the line-based editor stack
- Creates and toggles math-field/textarea rows
- Builds the combined LaTeX preview
- State serialization/deserialization

**HistoryManager** (`src/core/history.js`)
- Immutable state history with cursor
- Configurable max history size (default: 50)
- JSON-based state comparison for deduplication

**KeyboardHandler** (`src/core/keyboard.js`)
- Centralized keyboard event routing
- Context-aware handling (math-field vs textarea)
- Global shortcuts vs input-specific shortcuts

**ProjectIO** (`src/core/io.js`)
- Project save/load (JSON format)
- LaTeX export (full document template)
- LaTeX import (parses document structure)
- Clipboard operations

### UI Layer

**UIManager** (`src/ui/ui-manager.js`)
- Toolbar button bindings
- Theme toggle
- Status bar notifications
- Undo button state management

### Styling

CSS is organized with custom properties for theming:
- `variables.css`: Design tokens, color palette, spacing scale
- `layout.css`: Page structure, responsive breakpoints
- `components.css`: Buttons, inputs, status bar, shortcuts hint

## Dependencies

- **MathLive** (loaded via CDN): LaTeX math input component
  - Source: `https://esm.run/mathlive`

No other dependencies. No build tools required.

## Browser Support

- Chrome 89+
- Firefox 87+
- Safari 15+
- Edge 89+

## License

© 2025 Théophile Jérôme-Rocher
