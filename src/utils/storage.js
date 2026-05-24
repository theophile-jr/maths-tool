const STORAGE_KEY = "mathscript-autosave";

export class StorageManager {
  constructor(editor, historyManager, showStatus) {
    this.editor = editor;
    this.history = historyManager;
    this.showStatus = showStatus;
    this.saveTimer = null;
  }

  loadFromStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return false;

      const parsed = JSON.parse(data);
      if (parsed.content && Array.isArray(parsed.content)) {
        this.editor.restoreState(parsed.content);
        this.history.save(this.editor.getState());
        return true;
      }
    } catch (error) {
      console.error("Failed to load autosave:", error);
    }
    return false;
  }

  saveToStorage() {
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => {
      try {
        const state = this.editor.getState();
        const data = {
          version: "1.0",
          saved: new Date().toISOString(),
          content: state
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error("Failed to autosave:", error);
      }
    }, 500);
  }

  clearStorage() {
    localStorage.removeItem(STORAGE_KEY);
  }
}
