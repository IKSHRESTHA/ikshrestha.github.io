import '@fontsource-variable/fraunces';
import '@fontsource-variable/inter';
import '../styles/main.css';

import {
  profile,
  stats,
  exams,
  experience,
  projects,
  education,
  honors,
  leadership,
  skills,
} from '../data/resume.js';
import * as tpl from './render.js';

document.documentElement.classList.add('js');

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

// ------------------------------ Reveal on scroll -----------------------------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
