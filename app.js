(function(){
  const deckEl = document.getElementById('deck');
  const emptyEl = document.getElementById('empty-state');
  const likeBtn = document.getElementById('likeBtn');
  const passBtn = document.getElementById('passBtn');

  const sampleProfiles = [
    {
      id: 'p1',
      name: 'Aster',
      verified: true,
      compatibility: 86,
      gives: ['Piano', 'Music Theory', 'Ear Training'],
      wants: ['Python', 'Automation'],
      tags: ['Evenings', 'Remote-friendly', 'Beginner-friendly'],
      avatar: { emoji: '🎵', gradA: '#f59e0b', gradB: '#ef4444' }
    },
    {
      id: 'p2',
      name: 'Nova',
      verified: true,
      compatibility: 72,
      gives: ['Python', 'Data Viz', 'Git'],
      wants: ['Jazz Piano', 'Synth'],
      tags: ['Weekend', 'Local', 'Project-based'],
      avatar: { emoji: '🧠', gradA: '#6366f1', gradB: '#a78bfa' }
    },
    {
      id: 'p3',
      name: 'Kai',
      verified: false,
      compatibility: 64,
      gives: ['Public Speaking', 'Debate'],
      wants: ['SQL', 'Data Modeling'],
      tags: ['Mornings', 'Coffee chat'],
      avatar: { emoji: '🎤', gradA: '#10b981', gradB: '#06b6d4' }
    },
    {
      id: 'p4',
      name: 'Iris',
      verified: true,
      compatibility: 91,
      gives: ['Illustration', 'Procreate'],
      wants: ['JavaScript', 'React'],
      tags: ['Evenings', 'Pairing'],
      avatar: { emoji: '🎨', gradA: '#ec4899', gradB: '#8b5cf6' }
    },
    {
      id: 'p5',
      name: 'River',
      verified: false,
      compatibility: 58,
      gives: ['Yoga', 'Breathwork'],
      wants: ['R', 'Statistics'],
      tags: ['Beginner-friendly', 'Outdoor'],
      avatar: { emoji: '🌿', gradA: '#22c55e', gradB: '#84cc16' }
    }
  ];

  let stack = [];

  function renderDeck(profiles){
    deckEl.innerHTML = '';
    stack = profiles.slice();
    if(stack.length === 0){
      emptyEl.classList.remove('hidden');
      return;
    }
    emptyEl.classList.add('hidden');

    // Render bottom-to-top so last appended is on top
    stack.forEach((profile, idx) => {
      const card = createCard(profile, stack.length - idx - 1); // i = 0 top
      deckEl.appendChild(card);
    });

    wireTopCard();
  }

  function createCard(profile, i){
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = profile.id;
    card.dataset.index = String(i);
    card.style.setProperty('--i', String(i));

    const inner = document.createElement('div');
    inner.className = 'inner';

    const passOverlay = document.createElement('div');
    passOverlay.className = 'decision pass';
    passOverlay.textContent = 'PASS';

    const likeOverlay = document.createElement('div');
    likeOverlay.className = 'decision like';
    likeOverlay.textContent = 'LIKE';

    const topbar = document.createElement('div');
    topbar.className = 'topbar';

    const namewrap = document.createElement('div');
    namewrap.className = 'namewrap';

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = profile.name;

    namewrap.appendChild(name);

    if(profile.verified){
      const v = document.createElement('div');
      v.className = 'badge-verified';
      v.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.25l2.4 2.34 3.3-.48 1.5 3.09 3.09 1.5-.48 3.3 2.34 2.4-2.34 2.4.48 3.3-3.09 1.5-1.5 3.09-3.3-.48L12 21.75l-2.4 2.34-3.3-.48-1.5-3.09-3.09-1.5.48-3.3L.66 12l2.34-2.4-.48-3.3 3.09-1.5 1.5-3.09 3.3.48L12 2.25zM10.2 14.7l6-6-1.4-1.4-4.6 4.59-2.0-2.0-1.4 1.41 3.4 3.4z"/>
        </svg>
        Verified`;
      namewrap.appendChild(v);
    }

    const compat = document.createElement('div');
    compat.className = 'compat';
    const ring = document.createElement('div');
    ring.className = 'compat-ring';
    ring.style.setProperty('--compat', String(profile.compatibility));
    ring.textContent = `${profile.compatibility}%`;
    compat.appendChild(ring);

    topbar.appendChild(namewrap);
    topbar.appendChild(compat);

    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'avatar-wrap';

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.style.setProperty('--gradA', profile.avatar.gradA);
    avatar.style.setProperty('--gradB', profile.avatar.gradB);
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = profile.avatar.emoji;
    avatar.appendChild(emoji);
    avatarWrap.appendChild(avatar);

    const tags = document.createElement('div');
    tags.className = 'tags';
    profile.tags.forEach(t => {
      const chip = document.createElement('div');
      chip.className = 'chip';
      chip.innerHTML = `<span class="dot"></span>${t}`;
      tags.appendChild(chip);
    });

    const bottom = document.createElement('div');
    bottom.className = 'bottom';

    const gives = document.createElement('div');
    gives.className = 'section gives';
    gives.innerHTML = `<div class="label">Gives</div>`;
    const givesWrap = document.createElement('div');
    givesWrap.className = 'skills';
    profile.gives.forEach(s => {
      const sk = document.createElement('div');
      sk.className = 'skill';
      sk.textContent = s;
      givesWrap.appendChild(sk);
    });
    gives.appendChild(givesWrap);

    const wants = document.createElement('div');
    wants.className = 'section wants';
    wants.innerHTML = `<div class="label">Wants</div>`;
    const wantsWrap = document.createElement('div');
    wantsWrap.className = 'skills';
    profile.wants.forEach(s => {
      const sk = document.createElement('div');
      sk.className = 'skill';
      sk.textContent = s;
      wantsWrap.appendChild(sk);
    });
    wants.appendChild(wantsWrap);

    bottom.appendChild(gives);
    bottom.appendChild(wants);

    inner.appendChild(passOverlay);
    inner.appendChild(likeOverlay);
    inner.appendChild(topbar);
    inner.appendChild(avatarWrap);
    inner.appendChild(tags);
    inner.appendChild(bottom);
    card.appendChild(inner);

    return card;
  }

  function wireTopCard(){
    const cards = Array.from(deckEl.querySelectorAll('.card'));
    if(cards.length === 0){
      emptyEl.classList.remove('hidden');
      return;
    }
    emptyEl.classList.add('hidden');

    // Only the last card in DOM order is on top
    const top = cards[cards.length - 1];
    enableDrag(top);
  }

  function enableDrag(card){
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;
    let dragging = false;

    const onPointerDown = (e) => {
      dragging = true;
      card.classList.add('dragging');
      card.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startY = e.clientY;
    };

    const onPointerMove = (e) => {
      if(!dragging) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      const rot = currentX * 0.06; // degrees
      card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rot}deg)`;

      // Decision hint
      const like = currentX > 24;
      const pass = currentX < -24;
      card.dataset.like = like ? '1' : '0';
      card.dataset.pass = pass ? '1' : '0';
    };

    const onPointerUp = (e) => {
      if(!dragging) return;
      dragging = false;
      card.classList.remove('dragging');
      card.releasePointerCapture(e.pointerId);

      const threshold = 120; // px
      if(Math.abs(currentX) > threshold){
        const toX = currentX > 0 ? window.innerWidth + 200 : -window.innerWidth - 200;
        const toY = currentY * 1.2;
        fling(card, toX, toY, currentX > 0 ? 'like' : 'pass');
      } else {
        // snap back
        card.style.transition = 'transform .18s ease';
        card.style.transform = '';
        card.addEventListener('transitionend', () => {
          card.style.transition = '';
          delete card.dataset.like;
          delete card.dataset.pass;
        }, { once: true });
      }
      currentX = currentY = 0;
    };

    card.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Store listeners so we can remove when card is gone
    card._listeners = { onPointerDown, onPointerMove, onPointerUp };
  }

  function disableDrag(card){
    if(!card || !card._listeners) return;
    card.removeEventListener('pointerdown', card._listeners.onPointerDown);
    window.removeEventListener('pointermove', card._listeners.onPointerMove);
    window.removeEventListener('pointerup', card._listeners.onPointerUp);
    delete card._listeners;
  }

  function fling(card, toX, toY, decision){
    disableDrag(card);
    card.style.transition = 'transform .28s ease-out, opacity .28s ease-out';
    card.style.transform = `translate(${toX}px, ${toY}px) rotate(${toX * 0.03}deg)`;
    card.style.opacity = '0';

    // Notify (prototype: console only)
    const name = card.querySelector('.name')?.textContent || 'Unknown';
    console.log(decision === 'like' ? 'Liked' : 'Passed', name);

    card.addEventListener('transitionend', () => {
      card.remove();
      // Re-wire the next top card
      requestAnimationFrame(wireTopCard);
      if(deckEl.querySelectorAll('.card').length === 0){
        emptyEl.classList.remove('hidden');
      }
    }, { once: true });
  }

  function programmaticSwipe(direction){
    const top = Array.from(deckEl.querySelectorAll('.card')).pop();
    if(!top) return;
    const toX = direction === 'like' ? window.innerWidth + 200 : -window.innerWidth - 200;
    const toY = 0;
    top.dataset[direction] = '1';
    fling(top, toX, toY, direction);
  }

  likeBtn.addEventListener('click', () => programmaticSwipe('like'));
  passBtn.addEventListener('click', () => programmaticSwipe('pass'));

  // Keyboard support (left/right)
  window.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') programmaticSwipe('pass');
    if(e.key === 'ArrowRight') programmaticSwipe('like');
  });

  renderDeck(sampleProfiles);
})();
