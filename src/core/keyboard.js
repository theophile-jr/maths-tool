export class KeyboardHandler {
  constructor(editor, actions) {
    this.editor = editor;
    this.actions = actions;
  }

  setup() {
    document.addEventListener("keydown", (ev) => this.handleGlobalKeydown(ev));
  }

  bindMathField(mf) {
    mf.addEventListener("keydown", (ev) => this.handleMathFieldKeydown(ev, mf));
    mf.addEventListener("input", () => {
      this.editor.updatePreview();
      this.actions.onInput?.();
    });
  }

  bindTextarea(ta) {
    ta.addEventListener("keydown", (ev) => this.handleTextareaKeydown(ev, ta));
    ta.addEventListener("input", () => {
      ta.style.height = "auto";
      ta.style.height = Math.max(44, ta.scrollHeight) + "px";
      this.editor.updatePreview();
      this.actions.onInput?.();
    });
  }

  handleGlobalKeydown(ev) {
    if (!ev.ctrlKey && !ev.metaKey) return;

    const key = ev.key.toLowerCase();

    switch (key) {
      case 'z':
        ev.preventDefault();
        this.actions.undo?.();
        break;
      case 's':
        ev.preventDefault();
        this.actions.save?.();
        break;
      case 'e':
        ev.preventDefault();
        this.actions.export?.();
        break;
      case 'l':
        ev.preventDefault();
        this.actions.clear?.();
        break;
      case 'm':
        ev.preventDefault();
        this.actions.addMath?.();
        break;
      case 't':
        ev.preventDefault();
        this.actions.addText?.();
        break;
    }
  }

  handleMathFieldKeydown(ev, mf) {
    if (ev.key === " " && ev.ctrlKey) {
      ev.preventDefault();
      this.actions.toggleMode?.(mf);
      return;
    }

    if (ev.key === "ArrowUp" && !ev.shiftKey && !ev.ctrlKey) {
      const prevRow = mf.closest(".row")?.previousElementSibling;
      if (prevRow) {
        ev.preventDefault();
        const prevInput = prevRow.querySelector("math-field, textarea");
        if (prevInput) {
          prevInput.focus();
          this.editor.focusInput(prevInput, "end");
        }
      }
    }

    if (ev.key === "ArrowDown" && !ev.shiftKey && !ev.ctrlKey) {
      const nextRow = mf.closest(".row")?.nextElementSibling;
      if (nextRow) {
        ev.preventDefault();
        const nextInput = nextRow.querySelector("math-field, textarea");
        if (nextInput) {
          nextInput.focus();
          this.editor.focusInput(nextInput, "start");
        }
      }
    }

    if (ev.key === "Enter") {
      ev.preventDefault();
      const isText = ev.shiftKey;
      this.editor.addRowAfter(mf, isText);
      this.actions.onAddRow?.();
    }

    if (ev.key === "Backspace" && this.editor.isEmpty(mf)) {
      ev.preventDefault();
      const row = mf.closest(".row");
      const prevRow = row?.previousElementSibling;

      if (prevRow && this.editor.stack.children.length > 1) {
        const prevInput = prevRow.querySelector("math-field, textarea");
        const prevValue = prevInput ? (prevInput.value || "") : "";
        this.editor.removeRow(mf);
        if (prevInput) {
          prevInput.focus();
          this.editor.focusInput(prevInput, "end");
        }
      } else {
        this.editor.removeRow(mf);
      }

      this.actions.onRemoveRow?.();
    }
  }

  handleTextareaKeydown(ev, ta) {
    if (ev.key === " " && ev.ctrlKey) {
      ev.preventDefault();
      this.actions.toggleMode?.(ta);
      return;
    }

    if (ev.key === "ArrowUp" && !ev.shiftKey && !ev.ctrlKey) {
      const start = ta.selectionStart;
      const beforeCursor = (ta.value || "").substring(0, start);
      const isAtFirstLine = !beforeCursor.includes('\n');

      if (isAtFirstLine) {
        const prevRow = ta.closest(".row")?.previousElementSibling;
        if (prevRow) {
          ev.preventDefault();
          const prevInput = prevRow.querySelector("math-field, textarea");
          if (prevInput) {
            prevInput.focus();
            this.editor.focusInput(prevInput, "end");
          }
        }
      }
    }

    if (ev.key === "ArrowDown" && !ev.shiftKey && !ev.ctrlKey) {
      const start = ta.selectionStart;
      const afterCursor = (ta.value || "").substring(start);
      const isAtLastLine = !afterCursor.includes('\n');

      if (isAtLastLine) {
        const nextRow = ta.closest(".row")?.nextElementSibling;
        if (nextRow) {
          ev.preventDefault();
          const nextInput = nextRow.querySelector("math-field, textarea");
          if (nextInput) {
            nextInput.focus();
            this.editor.focusInput(nextInput, "start");
          }
        }
      }
    }

    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      this.editor.addRowAfter(ta);
      this.actions.onAddRow?.();
    }

    if (ev.key === "Backspace" && this.editor.isEmpty(ta)) {
      ev.preventDefault();
      const row = ta.closest(".row");
      const prevRow = row?.previousElementSibling;

      if (prevRow && this.editor.stack.children.length > 1) {
        const prevInput = prevRow.querySelector("math-field, textarea");
        const prevValue = prevInput ? (prevInput.value || "") : "";
        this.editor.removeRow(ta);
        if (prevInput) {
          prevInput.focus();
          this.editor.focusInput(prevInput, "end");
        }
      } else {
        this.editor.removeRow(ta);
      }

      this.actions.onRemoveRow?.();
    }
  }
}
