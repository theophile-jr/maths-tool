export class HistoryManager {
  constructor(maxSize = 50) {
    this.history = [];
    this.index = -1;
    this.maxSize = maxSize;
  }

  save(state) {
    const stateString = JSON.stringify(state);

    if (this.history[this.index] === stateString) return false;

    this.history = this.history.slice(0, this.index + 1);
    this.history.push(stateString);
    this.index = this.history.length - 1;

    if (this.history.length > this.maxSize) {
      this.history.shift();
      this.index--;
    }

    return true;
  }

  undo() {
    if (this.index > 0) {
      this.index--;
      return JSON.parse(this.history[this.index]);
    }
    return null;
  }

  canUndo() {
    return this.index > 0;
  }
}
