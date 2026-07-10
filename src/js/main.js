import '@fontsource-variable/fraunces';
import '@fontsource-variable/inter';
import '../styles/main.css';

import {
  profile,
  stats,
  exams,
  experience,
  projects,
  capabilities,
  education,
  honors,
  leadership,
  skills,
} from '../data/resume.js';
import * as tpl from './render.js';

// ------------------------------ Render content ------------------------------
const mount = (id, html) => {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
};

mount('hero-bio', tpl.heroBio(profile));
mount('interest-tags', tpl.interestTags(profile));
mount('hero-social', tpl.heroSocial(profile));
mount('stats-strip', tpl.statsStrip(stats));
mount('experience-list', tpl.experienceTimeline(experience));
mount('capability-grid', tpl.capabilityCards(capabilities));
mount('projects-list', tpl.projectCards(projects));
mount('education-list', tpl.educationCards(education));
mount('exam-pills', tpl.examPills(exams));
mount('honors-list', tpl.honorsList(honors));
mount('skills-groups', tpl.skillGroups(skills));
mount('leadership-list', tpl.leadershipCards(leadership));
mount('contact-actions', tpl.contactActions(profile));
mount('contact-meta', tpl.contactMeta(profile));

const examOrg = document.getElementById('exam-org');
if (examOrg) examOrg.textContent = exams.org;

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// ------------------------------ Project popup -------------------------------
// Clicking a project opens its story, then asks whether to open the live app.
const projectDialog = document.getElementById('project-dialog');
const projectsList = document.getElementById('projects-list');

if (projectDialog && projectsList) {
  projectsList.addEventListener('click', (event) => {
    const trigger = event.target.closest('.js-project-open');
    if (!trigger) return;
    const project = projects[Number(trigger.dataset.projectIndex)];
    if (!project) return;
    projectDialog.innerHTML = tpl.projectDialog(project);
    projectDialog.showModal();
  });

  projectDialog.addEventListener('click', (event) => {
    const openedApp = event.target.closest('a[target="_blank"]');
    const closed = event.target.closest('.js-dialog-close');
    const backdrop = event.target === projectDialog; // clicks outside .dialog-inner
    if (openedApp || closed || backdrop) projectDialog.close();
  });
}

// ------------------------------ Theme toggle --------------------------------
// Light (pale white) is the default; the choice is remembered. A tiny inline
// script in index.html applies the saved theme before first paint.
const themeToggle = document.getElementById('theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');

const syncThemeMeta = () => {
  if (!themeMeta) return;
  themeMeta.content = document.documentElement.dataset.theme === 'dark' ? '#0a1120' : '#faf7f2';
};
syncThemeMeta();

if (themeToggle) {
  const isDark = () => document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark()));
  themeToggle.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
    syncThemeMeta();
  });
}

// ------------------------------ Header state --------------------------------
const header = document.getElementById('site-header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ------------------------------ Mobile nav ----------------------------------
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

navToggle.addEventListener('click', () => {
  const open = siteNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
});

siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ------------------------------ Scroll spy ----------------------------------
const navLinks = [...siteNav.querySelectorAll('a[href^="#"]')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) =>
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`)
      );
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => spy.observe(section));
