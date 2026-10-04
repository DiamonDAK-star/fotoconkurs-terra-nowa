(function () {
  const script = document.currentScript;
  const authorId = script.dataset.author;
  const photoId = script.dataset.photo;

  const userId = localStorage.getItem('participant_id');
  const votes = JSON.parse(localStorage.getItem('votes') || '{}');

  const btn = document.querySelector('.vote-btn');
  if (!btn) return;

  if (!userId) {
    btn.disabled = true;
    btn.textContent = 'Najpierw rejestracja';
    return;
  }

  if (userId === authorId) {
    btn.disabled = true;
    btn.textContent = 'To Twoje zdjęcie';
    return;
  }

  if (votes[photoId]) {
    btn.disabled = true;
    btn.textContent = 'Już głosowałeś';
    return;
  }

  btn.addEventListener('click', () => {
    votes[photoId] = Date.now();
    localStorage.setItem('votes', JSON.stringify(votes));

    // 🔽 ОТПРАВКА В GOOGLE FORM
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSe9WnLHKk_CP2WOUg__8cyVANdI2XTqiqjS7GliCjb3H5kPXw/formResponse', {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams({
        'entry.1560729913': photoId,
        'entry.258283210': userId,
        'entry.1606042': new Date().toISOString()
      })
    });

    btn.disabled = true;
    btn.textContent = 'Głos przyjęty';
  });
})();