/* Skill Match - Swipe Prototype */

const deckEl = document.getElementById('deck');
const btnLeft = document.getElementById('btnLeft');
const btnRight = document.getElementById('btnRight');
const infoBtn = document.getElementById('infoBtn');
const aboutDialog = document.getElementById('aboutDialog');
const closeAbout = document.getElementById('closeAbout');

const profiles = [
  {
    name: 'Alex Rivera',
    avatarEmoji: '🎵',
    verified: true,
    compatibility: 92,
    tags: ['Evenings', 'Remote OK', 'Beginner-friendly', 'NYC'],
    gives: ['Piano', 'Music Theory', 'Ear Training'],
    wants: ['Python', 'Data Viz', 'APIs'],
  },
  {
    name: 'Priya Anand',
    avatarEmoji: '🧪',
    verified: true,
    compatibility: 84,
    tags: ['Weekends', 'In-person', 'Cambridge'],
    gives: ['Chemistry Basics', 'Lab Safety'],
    wants: ['Guitar', 'Songwriting'],
  },
  {
    name: 'Marco Li',
    avatarEmoji: '📸',
    verified: false,
    compatibility: 76,
    tags: ['Afternoons', 'Remote', 'EU time'],
    gives: ['Photography', 'Lightroom'],
    wants: ['JavaScript', 'Node.js'],
  },
  {
    name: 'Sofia Gomez',
    avatarEmoji: '🧘',
    verified: true,
    compatibility: 88,
    tags: ['Mornings', 'Park Meetups'],
    gives: ['Yoga', 'Breathwork'],
    wants: ['Spanish', 'Conversation'],
  },
];

function createCard(profile) {
  const card = document.createElement('article');
  card.className = 'card animate';

  card.innerHTML = `
    <div class="card-header">
      <div class="avatar" aria-hidden="true">${profile.avatarEmoji}</div>
      <div class="badges">
        ${profile.verified ? '<span class="badge verified">✅ Verified</span>' : ''}
        <span class="badge compat">⚡ ${profile.compatibility}% match</span>
        <span class="badge"><span class="dot"></span> Active</span>
      </div>
      <div class="hints">
        <div class="hint like" aria-hidden="true">LIKE</div>
        <div class="hint nope" aria-hidden="true">NOPE</div>
      </div>
    </div>
    <div class="card-body">
      <div class="name-line">
        <div class="name">${profile.name}</div>
      </div>
      <div class="tags">${profile.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="meta-row">
        <div class="meta-block">
          <div class="meta-title">Gives</div>
          <div class="skill-chips">${profile.gives.map(s => `<span class="skill">${s}</span>`).join('')}</div>
        </div>
        <div class="meta-block">
          <div class="meta-title">Wants</div>
          <div class="skill-chips">${profile.wants.map(s => `<span class="skill">${s}</span>`).join('')}</div>
        </div>
      </div>
    </div>
  `;

  attachInteractions(card);
  return card;
}

function renderDeck(data) {
  deckEl.innerHTML = '';
  // Top card should be last in DOM so :nth-child stacking looks right
  [...data].forEach(profile => {
    const card = createCard(profile);
    deckEl.appendChild(card);
  });
}

// Interaction logic
const DRAG = {
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0,
  activeCard: null,
  isDragging: false,
};

const SWIPE_THRESHOLD = 110; // px horizontally to trigger decision
const ROTATION_FACTOR = 16;  // lower -> more rotation per px

function attachInteractions(card) {
  const onPointerDown = (e) => {
    if (DRAG.activeCard) return;
    DRAG.activeCard = card;
    DRAG.isDragging = true;
    DRAG.startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    DRAG.startY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    card.classList.add('swiping');
  };

  const onPointerMove = (e) => {
    if (!DRAG.isDragging || DRAG.activeCard !== card) return;
    DRAG.currentX = (e.clientX || (e.touches && e.touches[0].clientX) || 0) - DRAG.startX;
    DRAG.currentY = (e.clientY || (e.touches && e.touches[0].clientY) || 0) - DRAG.startY;

    const rotation = DRAG.currentX / ROTATION_FACTOR;
    const opacity = Math.min(Math.abs(DRAG.currentX) / SWIPE_THRESHOLD, 1);

    const likeHint = card.querySelector('.hint.like');
    const nopeHint = card.querySelector('.hint.nope');
    if (likeHint && nopeHint) {
      likeHint.style.opacity = DRAG.currentX > 0 ? String(opacity) : '0';
      likeHint.style.transform = `scale(${DRAG.currentX > 0 ? 1 : 0.95})`;
      nopeHint.style.opacity = DRAG.currentX < 0 ? String(opacity) : '0';
      nopeHint.style.transform = `scale(${DRAG.currentX < 0 ? 1 : 0.95})`;
    }

    card.style.transform = `translate(${DRAG.currentX}px, ${DRAG.currentY}px) rotate(${rotation}deg)`;
  };

  const completeSwipe = (direction) => {
    // Fly out animation and then remove
    const endX = (direction === 'right' ? 1 : -1) * (window.innerWidth * 0.9);
    card.classList.remove('swiping');
    card.classList.add('animate');
    card.style.transform = `translate(${endX}px, ${DRAG.currentY}px) rotate(${endX / ROTATION_FACTOR}deg)`;
    card.style.opacity = '0';

    setTimeout(() => {
      card.remove();
      // Optionally: callback with decision
      // onDecision(profile, direction)
      if (deckEl.children.length === 0) {
        showEndState();
      }
    }, 260);
  };

  const resetCard = () => {
    card.classList.remove('swiping');
    card.classList.add('animate');
    card.style.transform = '';
    const likeHint = card.querySelector('.hint.like');
    const nopeHint = card.querySelector('.hint.nope');
    if (likeHint && nopeHint) {
      likeHint.style.opacity = '0';
      likeHint.style.transform = 'scale(0.95)';
      nopeHint.style.opacity = '0';
      nopeHint.style.transform = 'scale(0.95)';
    }
  };

  const onPointerUp = () => {
    if (!DRAG.isDragging || DRAG.activeCard !== card) return;

    const movedFar = Math.abs(DRAG.currentX) > SWIPE_THRESHOLD;
    if (movedFar) {
      completeSwipe(DRAG.currentX > 0 ? 'right' : 'left');
    } else {
      resetCard();
    }

    DRAG.activeCard = null;
    DRAG.isDragging = false;
    DRAG.startX = DRAG.startY = DRAG.currentX = DRAG.currentY = 0;
  };

  // Pointer and touch events
  card.addEventListener('mousedown', onPointerDown);
  card.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('mouseup', onPointerUp);
  window.addEventListener('touchend', onPointerUp);
}

function showEndState() {
  const empty = document.createElement('div');
  empty.style.cssText = 'display:grid;place-items:center;inset:0;position:absolute;';
  empty.innerHTML = '<div style="opacity:0.8;color:#cbd5e1">No more profiles · Refresh to restart</div>';
  deckEl.appendChild(empty);
}

function programmaticSwipe(direction = 'left') {
  const top = deckEl.lastElementChild;
  if (!top || !top.classList.contains('card')) return;
  const dx = (direction === 'right' ? 1 : -1) * (window.innerWidth * 0.9);
  top.classList.add('animate');
  top.style.transform = `translate(${dx}px, 0) rotate(${dx / ROTATION_FACTOR}deg)`;
  top.style.opacity = '0';
  setTimeout(() => top.remove(), 260);
}

btnLeft.addEventListener('click', () => programmaticSwipe('left'));
btnRight.addEventListener('click', () => programmaticSwipe('right'));

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') programmaticSwipe('left');
  if (e.key === 'ArrowRight') programmaticSwipe('right');
});

infoBtn.addEventListener('click', () => {
  aboutDialog.showModal();
});
closeAbout.addEventListener('click', () => aboutDialog.close());

// Initial render
renderDeck(profiles);
