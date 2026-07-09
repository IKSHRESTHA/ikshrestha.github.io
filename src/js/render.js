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

// Compact project cards laid out in a grid — the full story lives in the
// popup, so a visitor can see every project (and the rest of the page)
// without one card taking over the screen.
export function projectCards(projects) {
  return projects
    .map(
      (p, i) => `
      <article class="project-card reveal js-project-open" data-project-index="${i}">
        <span class="project-index" aria-hidden="true">0${i + 1}</span>
        <h3 class="project-title">${esc(p.name)}</h3>
        <p class="project-summary">${esc(p.summary)}</p>
        <ul class="project-stack" aria-label="Technology stack">
          ${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}
        </ul>
        <button class="project-open-btn js-project-open" type="button" data-project-index="${i}">
          View project ${icons.external}
        </button>
      </article>`
    )
    .join('');
}

export function capabilityCards(capabilities) {
  return capabilities
    .map(
      (c) => `
      <article class="capability-card reveal">
        <h3 class="capability-title">${esc(c.title)}</h3>
        <p class="capability-desc">${esc(c.desc)}</p>
        <ul class="mini-tags" aria-label="Related methods and tools">
          ${c.tags.map((t) => `<li>${esc(t)}</li>`).join('')}
        </ul>
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
            ${esc(p.ctaLabel ?? 'Yes — open the app')} ${icons.external}
          </a>
          <button class="btn btn-outline js-dialog-close" type="button">Not now</button>
        </div>
        <p class="dialog-cta-note">${esc(
          p.ctaNote ?? 'The source code lives in a private repository — the live app is public.'
        )}</p>
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
