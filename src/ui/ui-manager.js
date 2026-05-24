export class UIManager {
  constructor(editor, historyManager, io) {
    this.editor = editor;
    this.history = historyManager;
    this.io = io;
    this.statusBar = document.getElementById("statusBar");
  }

  setup() {
    this.setupThemeToggle();
    this.setupToolbarButtons();
    this.setupActionButtons();
    this.loadThemePreference();
  }

  loadThemePreference() {
    const saved = localStorage.getItem("mathscript-theme");
    if (saved === "light") {
      document.body.classList.add("light-mode");
      const themeBtn = document.getElementById("themeBtn");
      if (themeBtn) themeBtn.querySelector(".btn-icon").textContent = "☀️";
    }
  }

  setupThemeToggle() {
    const themeBtn = document.getElementById("themeBtn");

    themeBtn?.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      localStorage.setItem("mathscript-theme", isLight ? "light" : "dark");
      themeBtn.querySelector(".btn-icon").textContent = isLight ? "☀️" : "🌙";
      this.showStatus(`Switched to ${isLight ? 'light' : 'dark'} mode`);
    });
  }

  setupToolbarButtons() {
    const undoBtn = document.getElementById("undoBtn");
    const addMathBtn = document.getElementById("addMathBtn");
    const addTextBtn = document.getElementById("addTextBtn");
    const clearBtn = document.getElementById("clearBtn");
    const saveBtn = document.getElementById("saveBtn");
    const loadBtn = document.getElementById("loadBtn");
    const exportBtn = document.getElementById("exportBtn");
    const importBtn = document.getElementById("importBtn");

    undoBtn?.addEventListener("click", () => this.handleUndo());
    addMathBtn?.addEventListener("click", () => this.handleAddMath());
    addTextBtn?.addEventListener("click", () => this.handleAddText());
    clearBtn?.addEventListener("click", () => this.io.clearAll());
    saveBtn?.addEventListener("click", () => this.io.saveProject());
    loadBtn?.addEventListener("click", () => this.io.loadProject());
    exportBtn?.addEventListener("click", () => this.io.exportLatex());
    importBtn?.addEventListener("click", () => this.io.importLatex());
  }

  setupActionButtons() {
    const copyBtn = document.getElementById("copyBtn");
    const copyPlainBtn = document.getElementById("copyPlainBtn");

    copyBtn?.addEventListener("click", () => this.io.copyLatex());
    copyPlainBtn?.addEventListener("click", () => this.io.copyPlainText());
  }

  handleUndo() {
    const state = this.history.undo();

    if (state) {
      this.editor.restoreState(state);
      this.updateHistoryButtons();
      this.showStatus("Undone");
    }
  }

  handleRedo() {
    const state = this.history.redo();

    if (state) {
      this.editor.restoreState(state);
      this.updateHistoryButtons();
      this.showStatus("Redone");
    }
  }

  handleAddMath() {
    this.editor.addRow();
    this.history.save(this.editor.getState());
    this.updateHistoryButtons();
  }

  handleAddText() {
    this.editor.addRow(null, "", true);
    this.history.save(this.editor.getState());
    this.updateHistoryButtons();
  }

  updateHistoryButtons() {
    const undoBtn = document.getElementById("undoBtn");
    if (undoBtn) {
      undoBtn.disabled = !this.history.canUndo();
    }
  }

  showStatus(message) {
    if (!this.statusBar) return;

    this.statusBar.textContent = message;
    this.statusBar.classList.add("show");

    setTimeout(() => {
      this.statusBar.classList.remove("show");
    }, 2000);
  }
}
