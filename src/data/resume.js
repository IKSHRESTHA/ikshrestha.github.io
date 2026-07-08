// ---------------------------------------------------------------------------
// Single source of truth for all site content.
// Update this file when your resume changes — both the home page and the
// CV page render from it.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Krishna Kumar Shrestha',
  shortName: 'Krishna Shrestha',
  title: 'Actuarial Science · Data & Risk Analytics',
  tagline: 'Turning risk into insight, one model at a time.',
  bio: [
    'I am a graduate research assistant at Middle Tennessee State University and a former actuarial analyst with four years of experience across reserving, pricing, and analytics — in both consulting and life insurance settings.',
    'Five Society of Actuaries exams down (P, FM, FAM, ALTAM, SRM), and building toward the ASA designation.',
  ],
  interests: ['Reserving & Valuation', 'Machine Learning', 'R & Shiny', 'Predictive Modeling'],
  location: 'Murfreesboro, TN',
  phone: '(615) 713-8605',
  phoneHref: 'tel:+16157138605',
  email: 'krishnakumarshrestha00@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ikshrestha',
  github: 'https://github.com/ikshrestha',
  website: 'https://ikshrestha.github.io',
};

export const stats = [
  { value: '5', label: 'SOA exams passed' },
  { value: '4+', label: 'Years of experience' },
  { value: '2', label: 'Competition wins' },
  { value: '3.85', label: 'Graduate GPA' },
];

export const exams = {
  org: 'Society of Actuaries (SOA)',
  passed: ['Exam P', 'Exam FM', 'Exam FAM', 'Exam ALTAM', 'Exam SRM'],
};

export const experience = [
  {
    role: 'Graduate Research Assistant',
    company: 'Middle Tennessee State University',
    location: 'Murfreesboro, TN',
    start: 'Jan 2025',
    end: 'Present',
    bullets: [
      'Perform regular and ad-hoc analysis on large claims datasets to evaluate assumptions and identify opportunities to improve efficiency and affordability.',
      'Use statistical and machine learning methods to analyze cost and experience drivers, and develop actionable recommendations communicated (via SHAP and LIME) to non-technical management.',
    ],
    tags: ['Claims analytics', 'Machine learning', 'SHAP / LIME'],
  },
  {
    role: 'Actuarial Analyst',
    company: 'Principal Risk Consulting',
    location: 'Kathmandu, Nepal',
    start: 'Dec 2022',
    end: 'Dec 2024',
    bullets: [
      'Prepared monthly reserve calculations (including IBNR-style incurred-but-unpaid liabilities) and the reserving methodologies and assumptions behind them.',
      'Produced profitability reports on business segments and ran ad-hoc studies to evaluate assumptions, presenting actionable recommendations to management.',
      'Built models in large Excel workbooks before migrating them to Python, documenting assumptions and validating calculation logic for accuracy.',
    ],
    tags: ['Reserving', 'IBNR', 'Excel → Python'],
  },
  {
    role: 'Senior Assistant',
    company: 'IGI Prudential Insurance',
    location: 'Kathmandu, Nepal',
    start: 'Aug 2021',
    end: 'Dec 2022',
    bullets: [
      'Participated in cross-functional teams on pricing and product research, supporting initiatives to improve operating results.',
      'Built a KPI dashboard in R and produced monthly and ad-hoc reports for business leads, drawing on portfolio databases.',
    ],
    tags: ['Pricing', 'KPI dashboards', 'R'],
  },
  {
    role: 'Data Analyst Intern',
    company: 'Numeric Mind',
    location: 'Kathmandu, Nepal',
    start: 'Jul 2020',
    end: 'Dec 2020',
    bullets: [
      'Retrieved and transformed large datasets with SQL and R, producing regulatory-compliant Tables, Listings, and Figures (TLFs) and Report Automation Packages (RAPs).',
    ],
    tags: ['SQL', 'R', 'Report automation'],
  },
];

export const projects = [
  {
    name: 'Automated Post-Employment Benefit Valuation App',
    stack: ['R', 'Shiny', 'Quarto'],
    link: 'https://ikshrestha.shinyapps.io/Shiny-Report/',
    linkLabel: 'Launch the app',
    bullets: [
      'Built and deployed a Shiny pricing tool that runs post-employment benefit valuations under the Projected Unit Credit method, projecting each plan’s benefit cash flows from user-entered demographic and financial assumptions.',
      'Values each employee on a separate process in parallel, cutting run time on large census files that would otherwise be calculated one record at a time.',
      'Generates the finished valuation report through Quarto, replacing a manual report-writing step.',
    ],
  },
];

export const education = [
  {
    school: 'Middle Tennessee State University',
    location: 'Murfreesboro, TN',
    degree: 'M.S. Professional Science — Actuarial Science',
    detail: 'GPA 3.85 / 4.0 · Expected Aug 2026',
    highlights: [
      'SOA Student Ambassador',
      'Winner — CAS Student Central Case Study Competition (2026)',
    ],
  },
  {
    school: 'Tribhuvan University',
    location: 'Kathmandu, Nepal',
    degree: 'B.S. Mathematical Sciences — Actuarial Science',
    detail: 'Graduated Aug 2021',
    highlights: [
      'Winner — Institute and Faculty of Actuaries (UK) Hackathon “R NUMBER” (2021)',
    ],
  },
];

export const honors = [
  {
    title: 'Winner, CAS Student Central Case Study Competition',
    year: '2026',
    detail: 'Casualty Actuarial Society',
  },
  {
    title: 'Winner, “R NUMBER” Hackathon',
    year: '2021',
    detail: 'Institute and Faculty of Actuaries (UK)',
  },
  {
    title: 'SOA Student Ambassador',
    year: 'Current',
    detail: 'Society of Actuaries, MTSU',
  },
];

export const leadership = [
  {
    role: 'Secretary',
    org: 'Actuarial Society of Nepal',
    location: 'Kathmandu, Nepal',
    start: 'Jul 2022',
    end: 'Jan 2025',
    bullets: [
      'Ran 10+ national actuarial training sessions and networking events and built working relationships with regulators and international actuarial bodies on Nepal’s actuarial regulatory framework.',
    ],
  },
];

export const skills = [
  {
    group: 'Technical',
    items: ['Excel (Advanced)', 'R (Advanced)', 'Python', 'SQL', 'VBA', 'Shiny', 'Quarto'],
  },
  {
    group: 'Certifications',
    items: ['Certified Data Analyst Professional (DataCamp)'],
  },
];
