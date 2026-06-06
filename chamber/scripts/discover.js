import { places } from '../data/places.mjs';

document.addEventListener('DOMContentLoaded', () => {

  renderCards();
  handleVisitMessage();
  setFooterYear();
  initNavToggle();

});

function renderCards() {
  const grid = document.getElementById('places-grid');
  if (!grid) return;

  grid.innerHTML = places.map(place => `
    <article class="place-card" id="${place.id}">
      <figure>
        <img src="${place.image}" alt="${place.alt}" width="300" height="200" loading="lazy" />
      </figure>
      <div class="place-card-body">
        <h2>${place.name}</h2>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="learn-more-btn" type="button"
          onclick="alert('More about ${place.name} coming soon!')">
          Learn More
        </button>
      </div>
    </article>
  `).join('');
}

function handleVisitMessage() {
  const banner = document.getElementById('visit-banner');
  if (!banner) return;

  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();
  let message = '';

  if (!lastVisit) {
    message = '👋 Welcome! Let us know if you have any questions.';
  } else {
    const msPerDay = 86400000;
    const daysSince = Math.floor((now - Number(lastVisit)) / msPerDay);
    if (daysSince < 1) {
      message = '😊 Back so soon! Awesome!';
    } else {
      const dayWord = daysSince === 1 ? 'day' : 'days';
      message = `🗓️ You last visited ${daysSince} ${dayWord} ago.`;
    }
  }

  banner.textContent = message;
  localStorage.setItem('lastVisit', now);
}

function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ✅ Moved inside a safe function — only runs if elements exist
  const currentYear = document.getElementById('currentyear');
  const modifiedDate = document.getElementById('lastModified');

  if (currentYear) currentYear.innerHTML = new Date().getFullYear();
  if (modifiedDate) modifiedDate.innerHTML = new Date(document.lastModified).toDateString();
}

function initNavToggle() {
  // ✅ ONE hamburger handler only — handles both class toggle and icon swap
  const navToggle = document.querySelector('.nav-toggle') || document.getElementById('menu-btn');
  const navList = document.getElementById('nav-list') || document.querySelector('nav ul');

  if (!navToggle || !navList) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);

    // Handle Font Awesome icon swap if it exists
    const icon = navToggle.querySelector('i');
    if (icon) {
      icon.classList.contains('fa-bars')
        ? icon.classList.replace('fa-bars', 'fa-xmark')
        : icon.classList.replace('fa-xmark', 'fa-bars');
    }
  });
}