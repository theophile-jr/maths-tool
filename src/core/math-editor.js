import { MathfieldElement } from "https://esm.run/mathlive";

export class MathEditor {
  constructor(stackElement, previewElement, onStateChange) {
    this.stack = stackElement;
    this.preview = previewElement;
    this.onStateChange = onStateChange;
    this.lastLatex = "";
    this.onInputCreated = null;
  }

  getState() {
    return [...this.stack.children].map(row => {
      const input = row.querySelector("math-field, textarea");
      const isText = input?.tagName.toLowerCase() === "textarea";
      return { value: input?.value || "", isText };
    });
  }

  restoreState(state) {
    this.stack.innerHTML = "";

    if (state.length === 0) {
      this.addRow();
      return;
    }

    state.forEach(item => {
      this.addRow(null, item.value || "", item.isText);
    });

    this.renumber();
    this.updatePreview();
  }

  addRow(indexAfter = null, initialValue = "", isText = false) {
    const row = document.createElement("div");
    row.className = "row";

    const num = document.createElement("div");
    num.className = "line-num";

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggleBtn";
    toggleBtn.textContent = isText ? "Text" : "Math";

    const input = isText
      ? this.createTextarea(initialValue)
      : this.createMathField(initialValue);

    toggleBtn.addEventListener("click", () => {
      this.toggleRowType(row, input, toggleBtn);
    });

    row.append(num, input, toggleBtn);

    if (indexAfter?.nextSibling) {
      this.stack.insertBefore(row, indexAfter.nextSibling);
    } else {
      this.stack.appendChild(row);
    }

    this.renumber();
    this.updatePreview();
    setTimeout(() => input.focus(), 0);

    this.onInputCreated?.(input);

    return input;
  }

  createTextarea(value = "") {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.rows = 1;
    textarea.style.minHeight = "44px";
    return textarea;
  }

  createMathField(value = "") {
    const mf = new MathfieldElement();
    mf.value = value;
    mf.setAttribute("virtual-keyboard-mode", "manual");
    return mf;
  }

  toggleRowType(row, currentInput, toggleBtn) {
    const value = currentInput.value || "";
    row.removeChild(currentInput);

    const isCurrentlyText = currentInput.tagName.toLowerCase() === "textarea";
    const newInput = isCurrentlyText
      ? this.createMathField(value)
      : this.createTextarea(value);

    row.insertBefore(newInput, toggleBtn);

    const isNowText = !isCurrentlyText;
    toggleBtn.textContent = isNowText ? "Text" : "Math";

    setTimeout(() => newInput.focus(), 0);
    this.updatePreview();
    this.onInputCreated?.(newInput);
    this.onStateChange?.();
  }

  removeRow(input) {
    const row = input.closest(".row");
    if (!row) return;

    if (this.stack.children.length === 1) {
      const targetInput = row.querySelector("math-field, textarea");
      if (targetInput) {
        targetInput.value = "";
        this.updatePreview();
      }
      return;
    }

    const prev = row.previousElementSibling;
    const next = row.nextElementSibling;
    row.remove();
    this.renumber();

    setTimeout(() => {
      const targetInput = prev?.querySelector("math-field, textarea") ||
                          next?.querySelector("math-field, textarea");
      if (targetInput) targetInput.focus();
    }, 0);

    this.updatePreview();
  }

  addRowAfter(input, isText = false) {
    const row = input.closest(".row");
    return this.addRow(row, "", isText);
  }

  isEmpty(input) {
    if (!input) return true;

    if (input.tagName.toLowerCase() === "math-field") {
      const v = (input.value || "").trim();
      return v === "" || v === "\\placeholder{}" || v === "\\placeholder{}\\placeholder{}";
    }

    return (input.value || "").trim() === "";
  }

  updatePreview() {
    const lines = [...this.stack.querySelectorAll(".row")].map(row => {
      const input = row.querySelector("math-field, textarea");
      if (!input) return [];

      const isText = input.tagName.toLowerCase() === "textarea";
      const val = (input.value || "").trim();

      if (val === "") return [];

      if (isText) {
        return val.split('\n')
          .map(line => line.trim())
          .filter(line => line !== "")
          .map(line => `\\text{${line}}`);
      }

      return [val];
    }).flat().filter(v => v !== "");

    if (lines.length === 0) {
      this.preview.value = "";
      this.lastLatex = "";
      return;
    }

    const joined = "\\displaylines{\n" + lines.join(" \\\\\n") + "\n}";
    this.lastLatex = "\\[\n" + joined + "\n\\]";
    this.preview.value = this.lastLatex;
  }

  renumber() {
    [...this.stack.children].forEach((row, i) => {
      const lineNum = row.querySelector(".line-num");
      if (lineNum) lineNum.textContent = i + 1;
    });
  }

  getPlainText() {
    return [...this.stack.querySelectorAll(".row")]
      .map(row => {
        const input = row.querySelector("math-field, textarea");
        return input ? (input.value || "").trim() : "";
      })
      .filter(v => v !== "")
      .join('\n');
  }

  focusInput(input, position = "end") {
    setTimeout(() => {
      if (input.tagName.toLowerCase() === "math-field") {
        input.position = position === "end"
          ? (input.value || "").length
          : 0;
      } else {
        const len = position === "end"
          ? (input.value || "").length
          : 0;
        input.setSelectionRange(len, len);
      }
    }, 10);
  }
}
