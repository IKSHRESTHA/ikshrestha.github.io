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

// Each project can carry an `article` — a longer write-up shown in a popup
// when the visitor clicks the project. The popup also asks whether they want
// to open the live app. Source repositories are private; only the live app
// links are public.
export const projects = [
  {
    name: 'Chain-Ladder Reserving & Tail Factor Platform',
    stack: ['Python', 'FastAPI', 'NumPy · SciPy', 'React', 'TypeScript', 'Docker', 'AWS'],
    link: 'https://dmanthan.duckdns.org',
    linkLabel: 'View this project',
    bullets: [
      'A full chain-ladder workflow in the browser: load a paid loss triangle, select link-ratio averages, extrapolate the tail, and compare ultimates, IBNR, and loss ratios across methods.',
      'Implements the tail-factor methods from the CAS Tail Factor Working Party report — the Bondy family, Sherman-Boor, exponential decay, inverse power, and Pipia.',
      'Backed by a tested FastAPI calculation engine on AWS EC2, behind Caddy with automatic HTTPS.',
    ],
    article: {
      sections: [
        {
          heading: 'What it is',
          body: [
            'A loss triangle only shows the years you have. Claims keep developing after the triangle ends, and the tail factor has to cover that missing piece. Choosing it is one of the most judgment-heavy steps in loss reserving.',
            'This app turns that step into a guided workflow. You load a cumulative paid triangle — the bundled research one, or your own through a guided builder. The app calculates the age-to-age factors and their averages, and you lock in one averaging rule. Then it fits the tail with several methods at once and shows the results side by side: CDFs, ultimate losses, IBNR, and ultimate loss ratios under each tail. Instead of defending a single number, you can see how much the answer moves when the method changes.',
          ],
        },
        {
          heading: 'The actuarial side',
          body: [
            'The methods follow the CAS Tail Factor Working Party’s summary report (CAS E-Forum, Fall 2013). I worked through the paper in a Jupyter notebook first, then ported the methods into a tested service layer. The engine covers the Bondy family — original, modified, generalized, and fully generalized — plus the Sherman-Boor algebraic method and three curve fits: exponential decay, inverse power, and the Pipia Weibull fit.',
            'The API also builds a complete unpaid-claim exhibit from paid and reported triangles: ultimates, loss ratios, IBNR, and total unpaid on both bases. It compares the classic reserving methods from Friedland side by side — development, expected claims, Bornhuetter-Ferguson, and Cape Cod. The reported tail is never curve-fit directly; by default it is derived from the paid tail using the Sherman-Boor consistency condition.',
          ],
        },
      ],
      tools: [
        { name: 'Python, NumPy & SciPy', role: 'the calculation engine and the optimization behind the curve-fit methods' },
        { name: 'FastAPI & Pydantic', role: 'the API layer, with schemas that validate every triangle before it reaches the math' },
        { name: 'Jupyter', role: 'where the CAS paper methods were prototyped and checked' },
        { name: 'pytest', role: 'tests over the actuarial math and the endpoints' },
        { name: 'React 18, TypeScript & Vite', role: 'the front-end wizard, with Recharts for charts and Vitest for tests' },
        { name: 'Docker, Caddy & AWS EC2', role: 'one public entry point with automatic HTTPS on a small cloud server' },
      ],
    },
  },
  {
    name: 'IAS 19 Defined-Benefit Valuation Platform',
    stack: ['Python', 'FastAPI', 'NumPy', 'Pydantic', 'Chart.js', 'Docker', 'AWS'],
    link: 'http://13.58.244.135:8000/',
    linkLabel: 'View this project',
    bullets: [
      'Values defined-benefit gratuity plans under IAS 19 with the Projected Unit Credit method — employee by employee, with mortality and attrition decrements.',
      'Returns the full disclosure pack: DBO reconciliation, P&L expense, sensitivity tests, and expected benefit cashflows with duration.',
      'An Excel/VBA valuation engine from consulting work, rebuilt in Python and vectorized with NumPy.',
    ],
    article: {
      sections: [
        {
          heading: 'What it is',
          body: [
            'When a company promises staff a gratuity or a pension, it carries a liability that must be measured every year. IAS 19 requires the Projected Unit Credit method for that measurement, and the calculation is detailed enough that most firms hand it to a consulting actuary.',
            'This platform does the valuation end to end. You upload the employee census, set the assumptions — discount rate, salary growth, attrition, mortality — and it returns the defined benefit obligation together with the disclosures the standard asks for.',
          ],
        },
        {
          heading: 'The actuarial side',
          body: [
            'The engine values one employee at a time, the way the method intends. It projects the benefit year by year, applies mortality and withdrawal decrements to get the chance the benefit is ever paid, discounts it back, and attributes the value to the service the employee has already worked. The portfolio run is vectorized with NumPy, so a full census is valued in one pass rather than record by record.',
            'The output is a disclosure pack, not just one number: the DBO reconciliation, the P&L expense split into service cost and interest cost, sensitivity tests on the key assumptions, and expected benefit payments bucketed by year — which also gives the duration and the current versus non-current split. It supports all three IAS 19 treatments of actuarial gains and losses: immediate recognition in P&L, the corridor approach, and recognition through OCI.',
            'The engine started life as an Excel/VBA model from my consulting work in Nepal. Rebuilding it in Python made every assumption explicit, testable, and fast.',
          ],
        },
      ],
      tools: [
        { name: 'Python & NumPy', role: 'the Projected Unit Credit engine, vectorized across the whole census' },
        { name: 'FastAPI & Pydantic', role: 'typed schemas for employees, assumptions, and every result the API returns' },
        { name: 'Jupyter', role: 'an IAS 19 disclosure report walkthrough on a Nepal gratuity case' },
        { name: 'pytest', role: 'tests over the valuation math, decrements, and attrition bands' },
        { name: 'HTML, JavaScript & Chart.js', role: 'a light single-page front-end served by the API' },
        { name: 'Docker & AWS EC2', role: 'packaging and deployment' },
      ],
    },
  },
  {
    name: 'Automated Post-Employment Benefit Valuation App',
    stack: ['R', 'Shiny', 'Quarto'],
    link: 'https://ikshrestha.shinyapps.io/Shiny-Report/',
    linkLabel: 'View this project',
    bullets: [
      'Built and deployed a Shiny pricing tool that runs post-employment benefit valuations under the Projected Unit Credit method, projecting each plan’s benefit cash flows from user-entered demographic and financial assumptions.',
      'Values each employee on a separate process in parallel, cutting run time on large census files that would otherwise be calculated one record at a time.',
      'Generates the finished valuation report through Quarto, replacing a manual report-writing step.',
    ],
    article: {
      sections: [
        {
          heading: 'What it is',
          body: [
            'My first take on automating post-employment benefit valuations, built in R. You enter the demographic and financial assumptions, and the app projects each plan’s benefit cash flows under the Projected Unit Credit method.',
            'Each employee is valued on a separate process in parallel, which matters on large census files that would otherwise run one record at a time. When the numbers are done, Quarto renders the finished valuation report — a step that used to be written by hand.',
          ],
        },
      ],
      tools: [
        { name: 'R & Shiny', role: 'the valuation logic and the interactive app' },
        { name: 'Parallel R processes', role: 'one employee per worker on large census files' },
        { name: 'Quarto', role: 'automated generation of the final valuation report' },
      ],
    },
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
