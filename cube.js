/**
 * HumanCentric Labs — 3x3 Rubik's Cube
 * Starts as wireframe boundaries. Each stage fills one face with color.
 * At HAO, the entire cube is colorful.
 */
document.addEventListener('DOMContentLoaded', () => {
  const cubeEl = document.getElementById('rubiks-cube');
  const steps = document.querySelectorAll('.journey-step');
  const mobileDots = document.querySelectorAll('.jmp-dot');
  if (!cubeEl || steps.length === 0) return;
  // Framework colors
  const COLORS = {
    services:  '#1a4a5a',
    smms:      '#5a6b5e',
    he:        '#8a7968',
    talentai:  '#4a5078',
    rota:      '#9a6a4a',
    solved:    '#2a5a4a'
  };
  const FACE_MAP = {
    front:  { step: 1, color: COLORS.services },
    right:  { step: 2, color: COLORS.smms },
    top:    { step: 3, color: COLORS.he },
    left:   { step: 4, color: COLORS.talentai },
    back:   { step: 5, color: COLORS.rota },
    bottom: { step: 6, color: COLORS.solved }
  };
  const SIZE = 180;
  const GAP = 4;
  const CELL = (SIZE - GAP * 4) / 3;
  const HALF = SIZE / 2;
  buildCube();
  function buildCube() {
    cubeEl.innerHTML = '';
    cubeEl.style.width = SIZE + 'px';
    cubeEl.style.height = SIZE + 'px';
    const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    faces.forEach(faceName => {
      const face = document.createElement('div');
      face.className = `rc-face rc-face--${faceName}`;
      face.dataset.face = faceName;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const sticker = document.createElement('div');
          sticker.className = 'rc-sticker rc-sticker--empty';
          sticker.dataset.row = row;
          sticker.dataset.col = col;
          face.appendChild(sticker);
        }
      }
      cubeEl.appendChild(face);
    });
  }
  // State
  let currentStep = 0;
  let solvedFaces = new Set();
  function solveFace(faceName, color) {
    if (solvedFaces.has(faceName)) return;
    solvedFaces.add(faceName);
    const face = cubeEl.querySelector(`.rc-face--${faceName}`);
    if (!face) return;
    const stickers = face.querySelectorAll('.rc-sticker');
    stickers.forEach((s, i) => {
      setTimeout(() => {
        s.classList.remove('rc-sticker--empty');
        s.classList.add('rc-sticker--filled');
        s.style.backgroundColor = color;
        s.style.borderColor = color;
        // Small pop animation
        s.style.transform = 'scale(1.1)';
        setTimeout(() => { s.style.transform = 'scale(1)'; }, 200);
      }, i * 70);
    });
  }
  function rotateCubeTo(step) {
    switch(step) {
      case 1:
        cubeEl.style.transform = 'rotateX(-15deg) rotateY(-25deg)';
        break;
      case 2:
        cubeEl.style.transform = 'rotateX(-15deg) rotateY(-70deg)';
        break;
      case 3:
        cubeEl.style.transform = 'rotateX(-55deg) rotateY(-25deg)';
        break;
      case 4:
        cubeEl.style.transform = 'rotateX(-15deg) rotateY(25deg)';
        break;
      case 5:
        cubeEl.style.transform = 'rotateX(-15deg) rotateY(155deg)';
        break;
      case 6:
        // Solve the last face
        solveFace('bottom', COLORS.solved);
        cubeEl.classList.add('rc-solved');
        // Celebration: slow majestic spin
        setTimeout(() => {
          cubeEl.style.transition = 'transform 4s cubic-bezier(0.25, 1, 0.5, 1)';
          cubeEl.style.transform = 'rotateX(-25deg) rotateY(335deg)';
        }, 600);
        break;
    }
  }
  function handleStep(stepIndex) {
    if (stepIndex === currentStep) return;
    currentStep = stepIndex;
    const faceNames = Object.keys(FACE_MAP);
    const target = faceNames.find(f => FACE_MAP[f].step === stepIndex);
    if (target && stepIndex < 6) {
      solveFace(target, FACE_MAP[target].color);
    }
    rotateCubeTo(stepIndex);
    // Mobile dots
    mobileDots.forEach((dot, i) => {
      if (i < stepIndex) {
        dot.classList.add(`active-${i + 1}`);
      } else {
        dot.className = 'jmp-dot';
      }
    });
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
 const step = parseInt(entry.target.dataset.step, 10);
        handleStep(step);
      }
    });
 }, {
    threshold: 0.4,
    rootMargin: '-10% 0px -10% 0px'
  });
  steps.forEach(s => observer.observe(s));
});

