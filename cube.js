function initCube() {
  const cubeEl = document.getElementById('rubiks-cube');
  const steps = document.querySelectorAll('.journey-step');
  const mobileDots = document.querySelectorAll('.jmp-dot');

  if (!cubeEl || steps.length === 0) return;

  // Bright Apple-style neon colors
  const COLORS = {
    services:  '#0ea5e9', // Bright Blue
    smms:      '#22c55e', // Bright Green
    he:        '#eab308', // Bright Yellow
    talentai:  '#8b5cf6', // Bright Purple
    rota:      '#f97316', // Bright Orange
    solved:    '#ef4444'  // Bright Red
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
  
  function buildCube() {
    if (cubeEl.children.length >= 6) return; // Already rendered in HTML

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
          // Front face (Step 1) is filled right away
          if (faceName === 'front') {
            sticker.className = 'rc-sticker rc-sticker--filled';
            sticker.style.backgroundColor = COLORS.services;
            sticker.style.borderColor = COLORS.services;
          } else {
            sticker.className = 'rc-sticker rc-sticker--empty';
          }
          sticker.dataset.row = row;
          sticker.dataset.col = col;
          face.appendChild(sticker);
        }
      }

      cubeEl.appendChild(face);
    });
  }

  buildCube();

  // State
  let currentStep = 1;
  let solvedFaces = new Set(['front']);

  // Initialize at step 1 by default
  handleStep(1);

  function solveFace(faceName, color) {
    if (solvedFaces.has(faceName)) return;
    solvedFaces.add(faceName);

    const face = cubeEl.querySelector(`.rc-face--${faceName}`);
    if (!face) return;

    const stickers = Array.from(face.querySelectorAll('.rc-sticker'));
    for (let i = stickers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [stickers[i], stickers[j]] = [stickers[j], stickers[i]];
    }

    setTimeout(() => {
      stickers.forEach((s, i) => {
        setTimeout(() => {
          s.classList.remove('rc-sticker--empty');
          s.classList.add('rc-sticker--filled');
          s.style.backgroundColor = color;
          s.style.borderColor = color;
        }, i * 30);
      });
    }, 150); 
  }

  function rotateCubeTo(step) {
    cubeEl.style.transition = 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
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
        solveFace('bottom', COLORS.solved);
        cubeEl.classList.add('rc-solved');
        setTimeout(() => {
          cubeEl.style.transition = 'transform 6s cubic-bezier(0.25, 1, 0.5, 1)';
          cubeEl.style.transform = 'rotateX(-25deg) rotateY(335deg)';
        }, 1500);
        break;
    }
  }

  function handleStep(stepIndex) {
    if (stepIndex === currentStep) return;
    currentStep = stepIndex;

    const faceNames = Object.keys(FACE_MAP);
    const target = faceNames.find(f => FACE_MAP[f].step === stepIndex);

    rotateCubeTo(stepIndex);

    if (target && stepIndex <= 6) {
      solveFace(target, FACE_MAP[target].color);
    }

    mobileDots.forEach((dot, i) => {
      if (i < stepIndex) {
        dot.classList.add(`active-${i + 1}`);
      } else {
        dot.className = 'jmp-dot';
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    let maxVisibleStep = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const step = parseInt(entry.target.dataset.step, 10);
        if (step > maxVisibleStep) maxVisibleStep = step;
      }
    });

    if (maxVisibleStep > 0) {
      handleStep(maxVisibleStep);
    }
  }, {
    threshold: 0.3,
    rootMargin: '0px'
  });

  steps.forEach(s => observer.observe(s));

  // Hide the cube when scrolled out of the Journey section so it never overlaps other sections
  const journeySection = document.getElementById('journey');
  const cubeVisual = document.querySelector('.journey-visual');
  if (journeySection && cubeVisual) {
    const journeyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cubeVisual.style.opacity = '1';
          cubeVisual.style.visibility = 'visible';
        } else {
          cubeVisual.style.opacity = '0';
          cubeVisual.style.visibility = 'hidden';
        }
      });
    }, { threshold: 0.05 });
    journeyObserver.observe(journeySection);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCube);
} else {
  initCube();
}
