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
    summary:
      'A full P&C reserving workflow in the browser — link ratios, CAS tail-factor methods, and side-by-side ultimates, IBNR, and loss ratios — running on a tested FastAPI engine on AWS.',
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
    summary:
      'End-to-end IAS 19 gratuity valuation: upload a census, set assumptions, get the DBO and the full disclosure pack — an Excel/VBA consulting engine rebuilt in Python.',
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
    name: 'Heavy-Tail Loss Modeling — Research Paper',
    stack: ['Python', 'SciPy', 'Extreme Value Theory', 'Quarto', 'LaTeX'],
    link: 'https://github.com/IKSHRESTHA/fitting_distribution',
    linkLabel: 'View this project',
    summary:
      'A reproducible research paper on 54,000 workers’ comp claims: classic severity distributions, a GPD tail from extreme value theory, and a spliced model that hits the 99.5% VaR within 1%.',
    ctaLabel: 'Yes — open on GitHub',
    ctaNote: 'The full paper — source, code, and PDF — is public on GitHub.',
    bullets: [
      'Fits Lognormal, Gamma, Weibull, and Pareto II severity models by maximum likelihood to 54,000 workers’ compensation claims and compares them on AIC, BIC, and Kolmogorov–Smirnov fit.',
      'Applies extreme value theory — mean excess plots, parameter-stability plots, and the Hill estimator — to fit a Generalized Pareto tail above a $25,000 threshold.',
      'Splices the Lognormal body with the GPD tail; the spliced model reproduces the empirical 99.5% Value-at-Risk within 1%, where single distributions miss by 15–50%.',
    ],
    article: {
      sections: [
        {
          heading: 'What it is',
          body: [
            'In casualty insurance, a handful of catastrophic claims drives most of the total cost. If the severity model misses the tail, reserves, reinsurance prices, and capital numbers are wrong exactly where it hurts most.',
            'This is a full research paper — about 6,500 words, 12 figures, and 7 tables — written in Quarto, so every number in the text is produced by code inside the document itself. It models claim severity on 54,000 workers’ compensation claims from the Kaggle Actuarial Loss Estimation dataset.',
          ],
        },
        {
          heading: 'The actuarial side',
          body: [
            'The analysis runs in three stages. First, four classic two-parameter families — Lognormal, Gamma, Weibull, and Pareto II — are fit by maximum likelihood and judged on AIC, BIC, the Kolmogorov–Smirnov statistic, and graphical diagnostics. The Lognormal wins the body of the distribution, but no single family fits everywhere.',
            'Second, extreme value theory takes over the tail. A Generalized Pareto Distribution is fit to the exceedances above candidate thresholds, with the threshold chosen from mean excess plots, parameter-stability plots, and the Hill estimator. At the selected $25,000 threshold the estimated shape parameter is 0.41 — a genuinely heavy but finite-variance tail.',
            'Third, the two are spliced together: Lognormal body, GPD tail. The spliced model reproduces the empirical 99.5% Value-at-Risk within 1% ($188K modeled against $190K empirical), where the pure Lognormal understates it at $162K and the pure Pareto II overshoots at $282K. It also gives stable Expected Shortfall estimates beyond the data range — the capability regulatory capital work under Solvency II and IFRS 17 actually needs.',
          ],
        },
      ],
      tools: [
        { name: 'Python, SciPy & NumPy', role: 'maximum-likelihood fitting, the GPD tail, and every risk measure' },
        { name: 'pandas & Matplotlib', role: 'data preparation and the 12 diagnostic figures' },
        { name: 'Quarto & LaTeX', role: 'the reproducible paper — narrative and 23 code chunks in one document' },
        { name: 'BibTeX', role: 'a 16-reference bibliography in APA style' },
      ],
    },
  },
  {
    name: 'Lee-Carter Mortality Forecasting',
    stack: ['Python', 'statsmodels', 'PyTorch', 'Optuna', 'HMD data'],
    link: 'https://github.com/IKSHRESTHA/Summer-Project',
    linkLabel: 'View this project',
    summary:
      'Stochastic mortality forecasting from first principles: Lee-Carter fit by SVD with bootstrap uncertainty, a 10-country replication of Booth et al. (2006), and an LSTM deep-learning extension.',
    ctaLabel: 'Yes — open on GitHub',
    ctaNote: 'The code and notebooks are public on GitHub.',
    bullets: [
      'Implements the Lee-Carter model from scratch on Human Mortality Database data — SVD estimation, ARIMA forecasting of the mortality index, projected death rates, and life expectancy with prediction intervals.',
      'Replicates Booth et al. (2006) across 10 countries and five Lee-Carter variants, using two-way ANOVA to test whether the variant or the country drives forecast differences.',
      'Extends the framework with an LSTM neural network (Richman & Schreck, 2019), tuned with Optuna, to ask whether deep learning beats the classical random walk with drift.',
    ],
    article: {
      sections: [
        {
          heading: 'What it is',
          body: [
            'Life insurers and pension plans live and die by their mortality assumptions. The Lee-Carter model (1992) is the industry’s workhorse for forecasting how mortality improves over time. This project builds it from scratch and pushes it to the modern edge.',
            'It starts with a complete implementation for Australia on Human Mortality Database data: the log-mortality surface, SVD estimation of the age and period parameters, ARIMA forecasting of the mortality index, projected age-specific death rates, and life expectancy — with prediction intervals throughout.',
          ],
        },
        {
          heading: 'The actuarial side',
          body: [
            'The model is validated the way an actuary would want it validated: residual heatmaps and diagnostics, out-of-sample backtesting, and a residual bootstrap that puts empirical uncertainty bands around every forecast.',
            'A second study replicates Booth et al. (2006) across ten countries and five Lee-Carter variants — LC, LM, BMS, HU, and DJT — with a two-way ANOVA to test whether the choice of variant matters more than the choice of country.',
            'Finally, an LSTM pipeline in PyTorch (following Richman & Schreck, 2019) forecasts the mortality index with a recurrent neural network, tuned with Optuna, asking the question every modern actuary faces: does deep learning actually beat the random walk with drift?',
          ],
        },
      ],
      tools: [
        { name: 'Python scientific stack', role: 'NumPy, pandas, SciPy, statsmodels, and pmdarima for the classical models' },
        { name: 'PyTorch & Optuna', role: 'the LSTM extension and its hyperparameter tuning' },
        { name: 'Matplotlib & seaborn', role: 'mortality surfaces, diagnostics, and forecast fans' },
        { name: 'Human Mortality Database', role: 'age-by-year death rates for 10 countries, stored as parquet via pyarrow' },
      ],
    },
  },
  {
    name: 'Automated Post-Employment Benefit Valuation App',
    stack: ['R', 'Shiny', 'Quarto'],
    link: 'https://ikshrestha.shinyapps.io/Shiny-Report/',
    linkLabel: 'View this project',
    summary:
      'A deployed R Shiny tool that runs Projected Unit Credit benefit valuations in parallel and hands back a finished Quarto report.',
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

// "Why hire me" — the capability summary a recruiter should see first.
export const capabilities = [
  {
    title: 'Reserving & Valuation',
    desc: 'IBNR and unpaid-claim estimation from chain ladder to Cape Cod, tail factors, and IAS 19 defined-benefit valuations — not just studied, but built and shipped as working software.',
    tags: ['Chain Ladder', 'Tail Factors', 'IAS 19 · PUC'],
  },
  {
    title: 'Statistical Modeling',
    desc: 'Loss distributions with heavy-tail splicing, extreme value theory, and mortality forecasting from Lee-Carter to LSTM neural networks — validated with backtests and bootstraps.',
    tags: ['EVT · GPD', 'Lee-Carter', 'Machine Learning'],
  },
  {
    title: 'From Excel to Production',
    desc: 'Consulting models born in Excel/VBA rebuilt as tested Python engines, then deployed — FastAPI services and R Shiny apps running on AWS behind Docker.',
    tags: ['Python', 'R · Shiny', 'FastAPI · Docker · AWS'],
  },
  {
    title: 'Communication',
    desc: 'Numbers turned into decisions: SHAP and LIME explanations for non-technical management, automated Quarto reports, and print-ready valuation exhibits.',
    tags: ['SHAP / LIME', 'Quarto', 'Stakeholder reporting'],
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
