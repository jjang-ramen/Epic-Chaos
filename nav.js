/* Shared disclosure navigation; page scripts retain the mobile menu toggle. */
(() => {
  const nav = document.querySelector('#siteNav');
  const toggle = document.querySelector('.nav-toggle');
  const groups = [...document.querySelectorAll('.nav-group')];
  function closeGroups(except) {
    groups.forEach(group => { if (group !== except) group.open = false; });
  }
  groups.forEach(group => {
    group.addEventListener('toggle', () => { if (group.open) closeGroups(group); });
    group.addEventListener('focusout', () => {
      requestAnimationFrame(() => { if (!group.contains(document.activeElement)) group.open = false; });
    });
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-group')) closeGroups();
    if (event.target.closest('#siteNav a')) {
      closeGroups();
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = groups.find(group => group.open);
    if (open) {
      closeGroups();
      open.querySelector('summary').focus();
    } else if (nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
})();
