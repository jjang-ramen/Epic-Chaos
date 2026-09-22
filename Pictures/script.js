(() => {
  const gallery = document.querySelector('.gallery');
  const viewport = document.querySelector('#photoWall');
  const board = document.querySelector('.photo-board');
  const photos = [...document.querySelectorAll('.photo')];
  const wallButton = document.querySelector('#wallView');
  const gridButton = document.querySelector('#gridView');
  const resetButton = document.querySelector('#resetWall');
  const help = document.querySelector('#galleryHelp');
  const dialog = document.querySelector('#photoDialog');
  const fullPhoto = document.querySelector('#fullPhoto');
  let wall = false;
  let scale = 1;
  let pan = { x: 0, y: 0 };
  let drag = null;
  let suppressClick = false;
  let layer = 1;
  let current = 0;
  let opener = null;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  function paintBoard() {
    const minX = Math.min(0, viewport.clientWidth - 1580 * scale);
    const minY = Math.min(0, viewport.clientHeight - 1090 * scale);
    pan.x = clamp(pan.x, minX, 0);
    pan.y = clamp(pan.y, minY, 0);
    board.style.transform = wall ? `translate(${pan.x}px, ${pan.y}px) scale(${scale})` : '';
  }

  function fitBoard() {
    scale = Math.max(0.55, Math.min(1, viewport.clientWidth / 1580));
    paintBoard();
  }

  function setView(useWall) {
    wall = useWall;
    gallery.classList.toggle('is-wall', wall);
    wallButton.setAttribute('aria-pressed', String(wall));
    gridButton.setAttribute('aria-pressed', String(!wall));
    resetButton.hidden = !wall;
    help.textContent = wall
      ? 'Drag a photo to move it. Drag the background to explore. Click to open.'
      : 'Tap a picture for the full view. Use the arrows to browse.';
    viewport.setAttribute('aria-label', wall ? 'Photo wall. Arrow keys pan; focus a photo and use arrow keys to move it. Enter opens it.' : 'Picture grid');
    fitBoard();
  }

  function movePhoto(photo, x, y) {
    const nextX = clamp(x, 24, 1580 - photo.offsetWidth - 24);
    const nextY = clamp(y, 24, 1090 - photo.offsetHeight - 24);
    photo.style.setProperty('--x', `${nextX}px`);
    photo.style.setProperty('--y', `${nextY}px`);
  }

  function resetWall() {
    photos.forEach(photo => {
      photo.style.setProperty('--x', `${photo.dataset.x}px`);
      photo.style.setProperty('--y', `${photo.dataset.y}px`);
      photo.style.zIndex = '';
    });
    layer = 1;
    pan = { x: 0, y: 0 };
    fitBoard();
  }

  function showPhoto(index) {
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    fullPhoto.src = photo.href;
    fullPhoto.alt = photo.querySelector('img').alt;
    document.querySelector('#photoTitle').textContent = photo.dataset.title;
    document.querySelector('#photoCaption').textContent = photo.dataset.caption;
    document.querySelector('#photoCount').textContent = `${String(current + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
    document.querySelector('#originalPhoto').href = photo.href;
  }

  photos.forEach((photo, index) => {
    photo.addEventListener('dragstart', event => event.preventDefault());
    photo.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (suppressClick && event.detail !== 0) { suppressClick = false; return; }
      opener = photo;
      showPhoto(index);
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  });

  viewport.addEventListener('pointerdown', event => {
    if (!wall || event.button !== 0 || !event.isPrimary) return;
    const photo = event.target.closest('.photo');
    suppressClick = false;
    drag = {
      id: event.pointerId, photo, x: event.clientX, y: event.clientY,
      startX: photo ? parseFloat(photo.style.getPropertyValue('--x')) : pan.x,
      startY: photo ? parseFloat(photo.style.getPropertyValue('--y')) : pan.y,
      moved: false
    };
    if (photo) photo.style.zIndex = String(++layer);
  });

  viewport.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      viewport.setPointerCapture(event.pointerId);
      (drag.photo || viewport).classList.add('is-dragging');
    }
    if (drag.photo) movePhoto(drag.photo, drag.startX + dx / scale, drag.startY + dy / scale);
    else { pan = { x: drag.startX + dx, y: drag.startY + dy }; paintBoard(); }
  });

  function endDrag(event) {
    if (!drag || event.pointerId !== drag.id) return;
    suppressClick = drag.moved;
    (drag.photo || viewport).classList.remove('is-dragging');
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    drag = null;
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('lostpointercapture', endDrag);

  viewport.addEventListener('keydown', event => {
    if (!wall || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const step = event.shiftKey ? 60 : 20;
    const dx = event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0;
    const dy = event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0;
    const photo = event.target.closest('.photo');
    if (photo) {
      photo.style.zIndex = String(++layer);
      movePhoto(photo, parseFloat(photo.style.getPropertyValue('--x')) + dx, parseFloat(photo.style.getPropertyValue('--y')) + dy);
    } else { pan.x -= dx; pan.y -= dy; paintBoard(); }
  });

  document.querySelector('#closePhoto').addEventListener('click', () => dialog.close());
  document.querySelector('#previousPhoto').addEventListener('click', () => showPhoto(current - 1));
  document.querySelector('#nextPhoto').addEventListener('click', () => showPhoto(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus({ preventScroll: true }); });
  wallButton.addEventListener('click', () => setView(true));
  gridButton.addEventListener('click', () => setView(false));
  resetButton.addEventListener('click', resetWall);
  new ResizeObserver(fitBoard).observe(viewport);
  document.querySelector('.gallery-controls').hidden = false;
  setView(!window.matchMedia('(max-width: 700px)').matches);

  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('#siteNav');
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  window.lucide?.createIcons();
})();
