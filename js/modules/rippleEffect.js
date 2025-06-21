const activeRipples = [];

const RIPPLE_DURATION = 800;
const MAX_RIPPLE_SCALE = 3;
const RIPPLE_COLOR = "rgba(0,123,255,0.4)";

function easeOutQuad(t) {
  return t * (2 - t);
}

function animateRipples(currentTime) {
  for (let i = activeRipples.length - 1; i >= 0; i--) {
    const ripple = activeRipples[i];
    const elapsedTime = currentTime - ripple.startTime;
    let progress = elapsedTime / RIPPLE_DURATION;

    if (progress < 1) {
      const easedProgress = easeOutQuad(progress);
      const currentScalse = 0.1 + (MAX_RIPPLE_SCALE - 0.1) * easedProgress;
      const currentOpacity = 1 - easedProgress;

      ripple.element.style.transform = `scale(${currentScalse})`;
      ripple.element.style.opacity = currentOpacity;
    } else {
      ripple.element.remove();
      activeRipples.splice(i, 1);
    }
  }

  if (activeRipples.length > 0) {
    requestAnimationFrame(animateRipples);
  }
}

function createRipple(e, targetElement) {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  ripple.style.backgroundColor = RIPPLE_COLOR;

  const rect = targetElement.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const size = Math.max(rect.width, rect.height);

  const initialSize = size / MAX_RIPPLE_SCALE;
  ripple.style.width = `${initialSize}px`;
  ripple.style.height = `${initialSize}px`;

  ripple.style.left = `${x - initialSize / 2}px`;
  ripple.style.top = `${y - initialSize / 2}px`;

  targetElement.appendChild(ripple);

  activeRipples.push({
    element: ripple,
    startTime: performance.now(),
  });

  if (activeRipples.length === 1) {
    requestAnimationFrame(animateRipples);
  }
}

export function initRippleEffect(sectionId) {
  const rippleSection = document.getElementById(sectionId);

  if (!rippleSection) {
    console.error(`Ripple section with ID '${sectionId}' not found.`);
    return;
  }

  rippleSection.addEventListener("click", (e) => {
    createRipple(e, rippleSection);
  });
  console.log("Ripple effect initialized.");
}
