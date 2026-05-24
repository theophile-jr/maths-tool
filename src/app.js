import { MathfieldElement } from "https://esm.run/mathlive";
import { MathEditor } from "./core/math-editor.js";
import { HistoryManager } from "./core/history.js";
import { KeyboardHandler } from "./core/keyboard.js";
import { ProjectIO } from "./core/io.js";
import { UIManager } from "./ui/ui-manager.js";

class App {
  constructor() {
    this.stack = document.getElementById("stack");
    this.preview = document.getElementById("preview");

    this.history = new HistoryManager(50);
    this.editor = new MathEditor(this.stack, this.preview, () => this.autoSave());

    this.ui = new UIManager(this.editor, this.history, null);
    this.io = new ProjectIO(this.editor, this.history, (msg) => this.ui.showStatus(msg));

    this.keyboard = new KeyboardHandler(this.editor, {
      undo: () => this.ui.handleUndo(),
      save: () => this.io.saveProject(),
      export: () => this.io.exportLatex(),
      clear: () => this.io.clearAll(),
      addMath: () => this.ui.handleAddMath(),
      addText: () => this.ui.handleAddText(),
      toggleMode: (input) => this.toggleRowMode(input),
      onInput: () => this.autoSave(),
      onAddRow: () => this.history.save(this.editor.getState()),
      onRemoveRow: () => this.history.save(this.editor.getState()),
    });

    this.editor.onInputCreated = (input) => {
      const isMath = input.tagName.toLowerCase() === "math-field";
      if (isMath) {
        this.keyboard.bindMathField(input);
      } else {
        this.keyboard.bindTextarea(input);
      }
    };
  }

  init() {
    this.ui.setup();
    this.io.setup();
    this.keyboard.setup();

    this.editor.addRow();
    this.history.save(this.editor.getState());
    this.ui.updateUndoButton();
  }

  autoSave() {
    clearTimeout(this._autoSaveTimer);
    this._autoSaveTimer = setTimeout(() => {
      this.history.save(this.editor.getState());
      this.ui.updateUndoButton();
    }, 1000);
  }

  toggleRowMode(input) {
    const row = input.closest(".row");
    const toggleBtn = row?.querySelector(".toggleBtn");
    if (toggleBtn) toggleBtn.click();
  }
}

const app = new App();
app.init();
