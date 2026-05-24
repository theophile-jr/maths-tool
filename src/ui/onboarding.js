const STORAGE_KEY = "mathscript-onboarded";
const HINT_KEY = "mathscript-hint-hidden";

export class OnboardingManager {
  constructor(showStatus) {
    this.showStatus = showStatus;
    this.heroSection = document.getElementById("heroSection");
    this.shortcutsHint = document.getElementById("shortcutsHint");
  }

  init() {
    if (this.hasSeenOnboarding()) {
      this.hideHero();
    } else {
      this.showHero();
      this.setupDismiss();
    }

    if (this.isHintHidden()) {
      this.hideHint();
    }
  }

  hasSeenOnboarding() {
    return localStorage.getItem(STORAGE_KEY) === "true";
  }

  markOnboarded() {
    localStorage.setItem(STORAGE_KEY, "true");
    this.hideHero();
  }

  isHintHidden() {
    return localStorage.getItem(HINT_KEY) === "true";
  }

  toggleHint() {
    const isHidden = !this.isHintHidden();
    localStorage.setItem(HINT_KEY, isHidden ? "true" : "false");
    if (isHidden) {
      this.hideHint();
    } else {
      this.shortcutsHint?.style.removeProperty("display");
    }
  }

  hideHero() {
    if (this.heroSection) {
      this.heroSection.style.display = "none";
    }
  }

  showHero() {
    if (this.heroSection) {
      this.heroSection.style.removeProperty("display");
    }
  }

  hideHint() {
    if (this.shortcutsHint) {
      this.shortcutsHint.style.display = "none";
    }
  }

  setupDismiss() {
    if (!this.heroSection) return;

    const dismissBtn = document.createElement("button");
    dismissBtn.className = "hero-dismiss";
    dismissBtn.textContent = "Got it, start writing";
    dismissBtn.addEventListener("click", () => {
      this.markOnboarded();
      this.showStatus("Welcome! Click any line to start typing.");
    });
    this.heroSection.querySelector(".hero-content")?.appendChild(dismissBtn);
  }
}
