const box = document.getElementById("move-box");
const container = document.getElementById("image-container");

// --- SPRITE ANIMATION ---
const frameWidth = 16 * 5;   // 16px original * 5x scale
const frameCountPerDir = 6;

const DIRECTIONS = {
  right: 0,
  up: 6,
  left: 12,
  down: 18
};

let currentDir = "down";
let currentFrame = 0;
const animationSpeed = 1000 / 8;

function animateSprite() {
  const startFrame = DIRECTIONS[currentDir];
  const frame = startFrame + (currentFrame % frameCountPerDir);
  const offsetX = -(frame * frameWidth / 5); // divide by 5 because we scaled box with background-size
  box.style.backgroundPosition = `${offsetX}px 0px`;
  currentFrame++;
}

setInterval(animateSprite, animationSpeed);

// --- SPAWN CENTERED ---
function centerCharacter() {
  const centerX = (container.offsetWidth - box.offsetWidth) / 2;
  const centerY = (container.offsetHeight - box.offsetHeight) / 2;
  box.style.left = centerX + "px";
  box.style.top = centerY + "px";
}

window.onload = centerCharacter;

// --- MOVEMENT WITH COLLISION ---
const speed = 16; // optional: keep same step size

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  let top = parseInt(box.style.top || 0);
  let left = parseInt(box.style.left || 0);

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const boxWidth = box.offsetWidth;
  const boxHeight = box.offsetHeight;

  if (key === "arrowup" || key === "w") {
    currentDir = "up";
    top -= speed;
  }
  if (key === "arrowdown" || key === "s") {
    currentDir = "down";
    top += speed;
  }
  if (key === "arrowleft" || key === "a") {
    currentDir = "left";
    left -= speed;
  }
  if (key === "arrowright" || key === "d") {
    currentDir = "right";
    left += speed;
  }

  // --- CLAMP TO BORDERS ---
  if (left < 0) left = 0;
  if (top < 0) top = 0;
  if (left > containerWidth - boxWidth) left = containerWidth - boxWidth;
  if (top > containerHeight - boxHeight) top = containerHeight - boxHeight;

  box.style.left = left + "px";
  box.style.top = top + "px";
});
