// ======= modal.js =======

export function openModal(startup) {
  // remove any existing modal first
  const existing = document.querySelector('.modal-overlay');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.classList.add('modal-overlay');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', `${startup.name} details`);

  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Close modal">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="modal-top">
        <img 
          src="${startup.logo}" 
          alt="${startup.name} logo" 
          class="modal-logo"
          onerror="this.src='images/logos/placeholder.webp'"
        >
        <div>
          <h2>${startup.name}</h2>
          <span class="sector-badge">${startup.sector}</span>
        </div>
      </div>

      <div class="modal-details">
        <div class="modal-stat">
          <span class="modal-stat-label">City</span>
          <span class="modal-stat-value">${startup.city}</span>
        </div>
        <div class="modal-stat">
          <span class="modal-stat-label">Founded</span>
          <span class="modal-stat-value">${startup.founded}</span>
        </div>
        <div class="modal-stat">
          <span class="modal-stat-label">Funding</span>
          <span class="modal-stat-value">${startup.funding}</span>
        </div>
        <div class="modal-stat">
          <span class="modal-stat-label">Employees</span>
          <span class="modal-stat-value">${startup.employees}</span>
        </div>
      </div>

      <p class="modal-description">${startup.description}</p>

      <a href="${startup.website}" target="_blank" rel="noopener noreferrer" class="modal-link">
        Visit Website <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </div>
  `;

  // close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });

  // close on X button
  modal.querySelector('.modal-close').addEventListener('click', () => {
    closeModal(modal);
  });

  // close on Escape key
  document.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape') {
      closeModal(modal);
      document.removeEventListener('keydown', handler);
    }
  });

  document.body.appendChild(modal);
}

function closeModal(modal) {
  modal.remove();
}