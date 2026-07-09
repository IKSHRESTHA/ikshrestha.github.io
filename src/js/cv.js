import '@fontsource-variable/fraunces';
import '@fontsource-variable/inter';
import '../styles/main.css';

import {
  profile,
  exams,
  experience,
  projects,
  education,
  leadership,
  skills,
} from '../data/resume.js';

const esc = (str) =>
  String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const mount = (id, html) => {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
};

const entry = ({ title, dates, org, bullets = [] }) => `
  <div class="cv-entry">
    <div class="cv-entry-head">
      <span class="cv-entry-title">${title}</span>
      <span class="cv-entry-dates">${dates}</span>
    </div>
    <p class="cv-entry-org">${org}</p>
    ${
      bullets.length
        ? `<ul class="cv-bullets">${bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`
        : ''
    }
  </div>
`;

document.getElementById('cv-name').textContent = profile.name;

mount(
  'cv-contact',
  [
    esc(profile.location),
    esc(profile.phone),
    `<a href="mailto:${profile.email}">${esc(profile.email)}</a>`,
    `<a href="${profile.linkedin}" rel="noopener">linkedin.com/in/ikshrestha</a>`,
    `<a href="${profile.github}" rel="noopener">github.com/ikshrestha</a>`,
  ].join(' &nbsp;·&nbsp; ')
);

mount('cv-exams', `<strong>${esc(exams.org)}:</strong> ${esc(exams.passed.join(', '))}`);

mount(
  'cv-education',
  education
    .map((e) =>
      entry({
        title: esc(e.school),
        dates: esc(e.location),
        org: `${esc(e.degree)} · ${esc(e.detail)}`,
        bullets: e.highlights,
      })
    )
    .join('')
);

mount(
  'cv-experience',
  experience
    .map((job) =>
      entry({
        title: esc(job.role),
        dates: `${esc(job.start)} — ${esc(job.end)}`,
        org: `${esc(job.company)} — ${esc(job.location)}`,
        bullets: job.bullets,
      })
    )
    .join('')
);

mount(
  'cv-projects',
  projects
    .map((p) =>
      entry({
        title: esc(p.name),
        dates: esc(p.stack.join(', ')),
        org: `<a href="${p.link}" rel="noopener">${esc(p.link.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</a>`,
        bullets: p.bullets,
      })
    )
    .join('')
);

mount(
  'cv-leadership',
  leadership
    .map((l) =>
      entry({
        title: `${esc(l.role)}`,
        dates: `${esc(l.start)} — ${esc(l.end)}`,
        org: `${esc(l.org)} — ${esc(l.location)}`,
        bullets: l.bullets,
      })
    )
    .join('')
);

mount(
  'cv-skills',
  skills
    .map(
      (group) =>
        `<p class="cv-skill-line"><strong>${esc(group.group)}:</strong> ${esc(
          group.items.join(', ')
        )}</p>`
    )
    .join('')
);

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

document.getElementById('print-btn').addEventListener('click', () => window.print());
