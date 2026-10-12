/* Show the affiliation notice once per visit, including direct page arrivals. */
(() => {
  const notice = document.querySelector('#entryNotice');
  if (!notice) return;
  const storageKey = 'epicChaosAffiliationNoticeV1';
  let acknowledged = false;
  try {
    acknowledged = sessionStorage.getItem(storageKey) === 'seen';
  } catch {
    // The notice still works when browser storage is unavailable.
  }
  notice.removeAttribute('open');
  if (acknowledged) return;

  notice.addEventListener('close', () => {
    document.documentElement.classList.remove('notice-open');
    try {
      sessionStorage.setItem(storageKey, 'seen');
    } catch {
      // In this case a new page will show the notice again.
    }
  });
  document.documentElement.classList.add('notice-open');
  notice.showModal();
})();
