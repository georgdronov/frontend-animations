import { initRippleEffect } from "./modules/rippleEffect.js";

document.addEventListener("DOMContentLoaded", async () => {
  const appContainer = document.getElementById("app-container");

  if (!appContainer) {
    console.error("Main app container #app-container not found.");
    return;
  }

  await loadModule("rippleEffect", "app-container");

  initRippleEffect("ripple-section");
});
