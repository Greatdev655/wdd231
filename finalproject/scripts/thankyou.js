// ======= thankyou.js =======

// read all form data from the URL
const params = new URLSearchParams(window.location.search);
const card = document.querySelector('#submission-card');

// map each field to a readable label
const fields = [
  { key: 'name',        label: 'Your Name',      icon: 'fa-user' },
  { key: 'email',       label: 'Your Email',     icon: 'fa-envelope' },
  { key: 'startup',     label: 'Startup Name',   icon: 'fa-rocket' },
  { key: 'sector',      label: 'Sector',         icon: 'fa-layer-group' },
  { key: 'website',     label: 'Website',        icon: 'fa-globe' },
  { key: 'description', label: 'Description',    icon: 'fa-align-left' },
];

// build the card HTML
const rows = fields.map(field => {
  const value = params.get(field.key) || 'Not provided';
  return `
    <div class="submission-row">
      <span class="submission-label">
        <i class="fa-solid ${field.icon}"></i> ${field.label}
      </span>
      <span class="submission-value">${value}</span>
    </div>
  `;
}).join('');

card.innerHTML = rows;

// auto year
const yearEl = document.querySelector('#current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();