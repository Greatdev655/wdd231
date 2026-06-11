// ======= home.js =======

import { openModal } from './modal.js';

const featuredGrid = document.querySelector('#featured-grid');

async function loadFeaturedStartups() {
  try {
    const response = await fetch('./data/startup.json');

    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.status}`);
    }

    const startups = await response.json();

    // array method 1 — filter for featured only
    const featured = startups.filter(startup => startup.featured === true);
    // array method 2 — map to create HTML for each startup
    const cardsHTML = featured.map(startup => `
      <div class="startup-card" data-id="${startup.id}">
        <div class="card-top">
          <img 
            src="${startup.logo}" 
            alt="${startup.name} logo" 
            class="card-logo"
            loading="lazy"
            onerror="this.src='images/logos/placeholder.webp'"
          >
          <div class="card-title">
            <h3>${startup.name}</h3>
            <span class="sector-badge">${startup.sector}</span>
          </div>
        </div>

        <div class="card-meta">
          <span><i class="fa-solid fa-location-dot"></i>${startup.city}</span>
          <span><i class="fa-solid fa-calendar"></i>Est. ${startup.founded}</span>
          <span><i class="fa-solid fa-chart-line"></i>${startup.funding}</span>
        </div>

        <p class="card-description">${startup.description}</p>
      </div>
    `).join('');

    featuredGrid.innerHTML = cardsHTML;

    // attach click listeners for modal
    document.querySelectorAll('.startup-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = Number(card.dataset.id);
        const startup = startups.find(s => s.id === id);
        openModal(startup);
      });
    });

    // localStorage — save last visit timestamp
    localStorage.setItem('lastVisit', Date.now());

  } catch (error) {
    console.error('Error loading startups:', error);
    featuredGrid.innerHTML = `
      <p style="color: var(--primary-accent); text-align: center; font-family: var(--body-font);">
        Unable to load startups. Please try again later.
      </p>
    `;
  }
}

loadFeaturedStartups();