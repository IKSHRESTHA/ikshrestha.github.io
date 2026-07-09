// Template functions that turn the data in src/data/resume.js into markup.
// All content is first-party (it comes from our own data file), but text is
// still escaped as a matter of hygiene.

import { icons } from './icons.js';

const esc = (str) =>
  String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

export function heroBio(profile) {
  return profile.bio.map((p) => `<p>${esc(p)}</p>`).join('');
}

export function interestTags(profile) {
  return profile.interests.map((tag) => `<li>${esc(tag)}</li>`).join('');
}

export function heroSocial(profile) {
  return `
    <a href="${profile.linkedin}" rel="noopener" aria-label="LinkedIn profile">${icons.linkedin}</a>
    <a href="${profile.github}" rel="noopener" aria-label="GitHub profile">${icons.github}</a>
    <a href="mailto:${profile.email}" aria-label="Send an email">${icons.mail}</a>
  `;
}

export function statsStrip(stats) {
  return stats
    .map(
      (s) => `
      <div>
        <dt>${esc(s.label)}</dt>
        <dd>${esc(s.value)}</dd>
      </div>`
    )
    .join('');
}

export function experienceTimeline(experience) {
  return experience
    .map(
      (job) => `
      <li class="timeline-item reveal">
        <div class="timeline-head">
          <h3 class="timeline-role">${esc(job.role)}</h3>
          <span class="timeline-dates">${esc(job.start)} — ${esc(job.end)}</span>
        </div>
        <p class="timeline-org">${esc(job.company)} <span>· ${esc(job.location)}</span></p>
        <ul class="timeline-bullets">
          ${job.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}
        </ul>
        <ul class="mini-tags" aria-label="Key skills">
          ${job.tags.map((t) => `<li>${esc(t)}</li>`).join('')}
        </ul>
      </li>`
    )
    .join('');
}

// Decorative motif for the project card: a stylized projection chart.
const projectMotif = `
  <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g stroke="rgba(250,247,242,0.16)" stroke-width="1">
      <line x1="30" y1="40" x2="30" y2="170" />
      <line x1="30" y1="170" x2="280" y2="170" />
      <line x1="30" y1="105" x2="280" y2="105" stroke-dasharray="4 6" />
      <line x1="30" y1="40" x2="280" y2="40" stroke-dasharray="4 6" />
    </g>
    <g fill="rgba(250,247,242,0.14)">
      <rect x="55" y="128" width="26" height="42" rx="3" />
      <rect x="105" y="112" width="26" height="58" rx="3" />
      <rect x="155" y="88" width="26" height="82" rx="3" />
      <rect x="205" y="64" width="26" height="106" rx="3" />
    </g>
    <polyline
      points="45,150 95,132 145,100 195,78 260,50"
      stroke="#e8b4b8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
    />
    <g fill="#faf7f2">
      <circle cx="45" cy="150" r="4.5" />
      <circle cx="95" cy="132" r="4.5" />
      <circle cx="145" cy="100" r="4.5" />
      <circle cx="195" cy="78" r="4.5" />
      <circle cx="260" cy="50" r="4.5" />
    </g>
  </svg>
`;

export function projectCards(projects) {
  return projects
    .map(
      (p, i) => `
      <article class="project-card reveal">
        <div class="project-visual">${projectMotif}</div>
        <div class="project-body">
          <h3 class="project-title">${esc(p.name)}</h3>
          <ul class="project-stack" aria-label="Technology stack">
            ${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}
          </ul>
          <ul class="project-bullets">
            ${p.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}
          </ul>
          <button class="btn btn-maroon js-project-open" type="button" data-project-index="${i}">
            ${esc(p.linkLabel)} ${icons.external}
          </button>
        </div>
      </article>`
    )
    .join('');
}

// The popup shown when a project is clicked: the full story of the project,
// the tools behind it, and an ask — do you want to open the live app?
export function projectDialog(p) {
  const article = p.article ?? { sections: [], tools: [] };
  const sections = article.sections
    .map(
      (s) => `
      <h4 class="dialog-heading">${esc(s.heading)}</h4>
      ${s.body.map((par) => `<p>${esc(par)}</p>`).join('')}`
    )
    .join('');
  const tools = article.tools.length
    ? `
      <h4 class="dialog-heading">Tools used</h4>
      <ul class="dialog-tools">
        ${article.tools
          .map((t) => `<li><strong>${esc(t.name)}</strong> — ${esc(t.role)}</li>`)
          .join('')}
      </ul>`
    : '';

  return `
    <article class="dialog-inner">
      <button class="dialog-close js-dialog-close" type="button" aria-label="Close">&times;</button>
      <p class="eyebrow">Project story</p>
      <h3 class="dialog-title" id="project-dialog-title">${esc(p.name)}</h3>
      <ul class="project-stack" aria-label="Technology stack">
        ${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}
      </ul>
      ${sections}
      ${tools}
      <div class="dialog-cta">
        <p class="dialog-cta-question">Want to see the live project?</p>
        <p class="dialog-cta-url">${esc(p.link)}</p>
        <div class="dialog-cta-actions">
          <a class="btn btn-maroon" href="${p.link}" target="_blank" rel="noopener">
            Yes — open the app ${icons.external}
          </a>
          <button class="btn btn-outline js-dialog-close" type="button">Not now</button>
        </div>
        <p class="dialog-cta-note">The source code lives in a private repository — the live app is public.</p>
      </div>
    </article>
  `;
}

export function educationCards(education) {
  return education
    .map(
      (e) => `
      <article class="edu-card reveal">
        <h3 class="edu-school">${esc(e.school)}</h3>
        <p class="edu-location">${esc(e.location)}</p>
        <p class="edu-degree">${esc(e.degree)}</p>
        <p class="edu-detail">${esc(e.detail)}</p>
        <ul class="edu-highlights">
          ${e.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}
        </ul>
      </article>`
    )
    .join('');
}

export function examPills(exams) {
  return exams.passed
    .map((exam) => `<li><span class="check" aria-hidden="true">✓</span>${esc(exam)}</li>`)
    .join('');
}

export function honorsList(honors) {
  return honors
    .map(
      (h) => `
      <li>
        <p class="honor-title">${esc(h.title)}</p>
        <p class="honor-detail">${esc(h.detail)}</p>
        <span class="honor-year">${esc(h.year)}</span>
      </li>`
    )
    .join('');
}

export function skillGroups(skills) {
  return skills
    .map(
      (group) => `
      <div class="skill-group reveal">
        <h3 class="subheading">${esc(group.group)}</h3>
        <ul class="skill-pills">
          ${group.items.map((item) => `<li>${esc(item)}</li>`).join('')}
        </ul>
      </div>`
    )
    .join('');
}

export function leadershipCards(leadership) {
  return leadership
    .map(
      (l) => `
      <article class="leadership-card">
        <div class="timeline-head">
          <h3 class="timeline-role">${esc(l.role)} — ${esc(l.org)}</h3>
          <span class="timeline-dates">${esc(l.start)} — ${esc(l.end)}</span>
        </div>
        <p class="timeline-org"><span>${esc(l.location)}</span></p>
        <ul class="timeline-bullets">
          ${l.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}
        </ul>
      </article>`
    )
    .join('');
}

export function contactActions(profile) {
  return `
    <a class="btn btn-maroon" href="mailto:${profile.email}">${icons.mail} ${esc(profile.email)}</a>
    <a class="btn btn-outline" href="${profile.phoneHref}">${icons.phone} ${esc(profile.phone)}</a>
  `;
}

export function contactMeta(profile) {
  return `
    <span>${icons.pin} ${esc(profile.location)}</span>
    <a href="${profile.linkedin}" rel="noopener">${icons.linkedin} LinkedIn</a>
    <a href="${profile.github}" rel="noopener">${icons.github} GitHub</a>
  `;
}
