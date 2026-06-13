// ======= directory.js =======

import { openModal } from './modal.js';

const directoryGrid = document.querySelector('#directory-grid');
const searchInput = document.querySelector('#search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const resultsCount = document.querySelector('#results-count');

let allStartups = [];
let activeSector = 'All';

// ---- read URLSearchParams on page load ----
const params = new URLSearchParams(window.location.search);
const sectorParam = params.get('sector');
if (sectorParam) {
  activeSector = sectorParam;
}

// ---- restore last filter from localStorage ----
const savedSector = localStorage.getItem('activeSector');
if (savedSector && !sectorParam) {
  activeSector = savedSector;
}

// ---- fetch all startups ----
async function loadStartups() {
  try {
    const response = await fetch('./data/startup.json');

    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.status}`);
    }

    allStartups = await response.json();
    setActiveFilter(activeSector);
    renderStartups(allStartups);

  } catch (error) {
    console.error('Error loading startups:', error);
    directoryGrid.innerHTML = `
      <div class="no-results">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <p>Unable to load startups. Please try again later.</p>
      </div>
    `;
  }
}

// ---- render cards ----
function renderStartups(startups) {
  if (startups.length === 0) {
    directoryGrid.innerHTML = `
      <div class="no-results">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>No startups found. Try a different search or filter.</p>
      </div>
    `;
    resultsCount.textContent = 'Showing 0 startups';
    return;
  }

  directoryGrid.innerHTML = startups.map(startup => `
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

  // update results count
  resultsCount.textContent = `Showing ${startups.length} startup${startups.length !== 1 ? 's' : ''}`;

  // attach modal click listeners
  document.querySelectorAll('.startup-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = Number(card.dataset.id);
      const startup = allStartups.find(s => s.id === id);
      openModal(startup);
    });
  });
}

// ---- filter logic ----
function filterAndRender() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filtered = allStartups.filter(startup => {
    const matchesSector = activeSector === 'All' || startup.sector === activeSector;
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm) ||
                          startup.description.toLowerCase().includes(searchTerm);
    return matchesSector && matchesSearch;
  });

  renderStartups(filtered);
}

// ---- set active filter button ----
function setActiveFilter(sector) {
  activeSector = sector;
  localStorage.setItem('activeSector', sector);

  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.sector === sector);
  });

  filterAndRender();
}

// ---- event listeners ----

// sector buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setActiveFilter(btn.dataset.sector);
  });
});

// search input
searchInput.addEventListener('input', filterAndRender);

// ---- init ----
loadStartups();