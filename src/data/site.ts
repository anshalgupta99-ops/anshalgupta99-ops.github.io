// Content for the whole site. Everything visible lives here, so you can edit text without touching markup.
//
// Facts come from Anshal's resume. Nothing here is invented, with these assumptions to check:
//  - `url` is a guess (GitHub Pages default). Change it to the real production URL before deploying.
//  - The tooldeck.co link is live; remove the `href` line from that project if you would rather not link it.
//  - GitHub is not listed on purpose. Add it to `socials` once the repos are public.

export type Tenant = {
  name: string;
  domain: string;
  ground: string;
  ink: string;
  muted: string;
  line: string;
  accent: string;
  onAccent: string;
  radius: number; // px
};

// Four demo skins. The page is one template, and each section applies a different tenant config.
export const tenants: Tenant[] = [
  { name: 'slate',  domain: 'slate.example',  ground: '#0f1115', ink: '#ecebe6', muted: '#9aa1ad', line: '#2b303a', accent: '#ff5a1f', onAccent: '#0f1115', radius: 0 },
  { name: 'paper',  domain: 'paper.example',  ground: '#e7ebf0', ink: '#0b1b2b', muted: '#4d5d6e', line: '#c2ccd7', accent: '#0b57d0', onAccent: '#ffffff', radius: 8 },
  { name: 'forest', domain: 'forest.example', ground: '#0b2b26', ink: '#e8f3ec', muted: '#8fb8aa', line: '#1f4d44', accent: '#ffc93c', onAccent: '#0b2b26', radius: 16 },
  { name: 'signal', domain: 'signal.example', ground: '#dcdcd7', ink: '#111111', muted: '#55554f', line: '#b3b3ac', accent: '#c4001f', onAccent: '#ffffff', radius: 28 },
];

export const site = {
  name: 'Anshal Gupta',
  role: 'Full-stack software engineer',
  url: 'https://anshal18.github.io',
  description:
    'Anshal Gupta is a full-stack engineer in Delhi NCR. He builds multi-tenant web platforms with React, Elixir/Phoenix and PostgreSQL.',
  email: 'anshalgpt@gmail.com',
  location: 'Delhi NCR, India',
  resume: '/Anshal_Gupta_Resume.pdf',
  socials: [{ label: 'LinkedIn', href: 'https://linkedin.com/in/anshal-gupta99' }],
};

export const hero = {
  line: 'I build multi-tenant web platforms. React on the front, Elixir and PostgreSQL behind it.',
  skinNote: 'Same markup, four skins. Pick one.',
};

export const about = {
  heading: 'One product, many brands.',
  paragraphs: [
    'I work on a white-label platform for affiliate marketing that publishers and advertisers use across several brands. I own its React front end, its Elixir and Phoenix APIs, and the payment and data pipelines behind it.',
    'I started in 2021 as a data analyst, writing Python to automate reports. In 2022 I moved into full-stack work and have stayed on the same codebase since, so I know where its sharp edges are.',
    'I like problems where one change has to hold for every tenant: config, caching, auth, billing. Outside work I built tooldeck.co, a deals site for AI tools.',
  ],
  facts: [
    ['Based in', 'Delhi NCR, India'],
    ['Since', '2021, same company'],
    ['Looking for', 'Full-stack and React roles'],
  ],
};

export const stats = [
  { value: 80, suffix: '%', label: 'less manual operational effort', note: 'Payments and reconciliation pipeline' },
  { value: 70, suffix: '%', label: 'of recurring reporting automated', note: 'Data analyst role, Python and SQL' },
  { value: 30, suffix: '%', label: 'increase in sales commissions', note: 'Data pipelines, data analyst role' },
];

export const work = {
  heading: 'What I own',
  rows: [
    {
      area: 'Front end',
      title: 'React front end for a multi-tenant platform',
      detail: 'Redux, Tailwind CSS and Material UI. One codebase serves several brands through per-domain white-label config.',
    },
    {
      area: 'API',
      title: 'REST APIs on Elixir and Phoenix',
      detail: 'PostgreSQL, token-based authentication, role-based access, and Redis caching for tenant config.',
    },
    {
      area: 'Payments',
      title: 'Payments and reconciliation pipeline',
      detail: 'Python and PostgreSQL, with ageing and settlement reports. It cut manual operational effort by 80%.',
    },
    {
      area: 'Data',
      title: 'Ingestion from partner APIs',
      detail: 'Elixir and Ruby pipelines pull multiple third-party APIs into one schema with idempotent, event-based updates. Runbooks make each new integration repeatable.',
    },
    {
      area: 'Billing',
      title: 'Onboarding and billing flows',
      detail: 'Sign-up, per-tenant email verification, Stripe and bank-transfer payments, and resource provisioning.',
    },
    {
      area: 'Releases',
      title: 'Production releases and upgrades',
      detail: 'Optimized front-end builds on Linux behind NGINX, Elasticsearch and Kibana for monitoring, Jest and Playwright tests, and a phased React 16 to 17 upgrade.',
    },
  ],
};

export const stack = {
  heading: 'Stack',
  groups: [
    { label: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript', 'Elixir', 'Python', 'Ruby', 'SQL'] },
    { label: 'Front end', items: ['React.js', 'Next.js', 'Redux', 'Tailwind CSS', 'Material UI', 'HTML and CSS'] },
    { label: 'Back end', items: ['Phoenix', 'Ecto', 'REST APIs', 'JWT auth', 'Stripe', 'Partner API integration'] },
    { label: 'Data', items: ['PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Kibana', 'Pandas'] },
    { label: 'Testing', items: ['Jest', 'Playwright'] },
    { label: 'Infra', items: ['Linux', 'NGINX', 'AWS S3 and EC2', 'Git'] },
  ],
};

export type Project = {
  title: string;
  kind: string;
  summary: string;
  stack: string[];
  href?: string;
  hrefLabel?: string;
};

export const projects: { heading: string; items: Project[] } = {
  heading: 'Side projects',
  items: [
    {
      title: 'ToolDeck',
      kind: 'Deals site for AI tools',
      summary:
        'A deals and coupons site built on the Next.js App Router. It pulls live coupon data from a partner API and ships with a sitemap, JSON-LD and a script that drafts blog posts through the OpenAI API.',
      stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      href: 'https://tooldeck.co',
      hrefLabel: 'tooldeck.co',
    },
    {
      title: 'Restaurant recommendation engine',
      kind: 'Machine learning',
      summary: 'A Flask app that suggests restaurants from user profiles and past interactions, using collaborative filtering.',
      stack: ['Python', 'Flask', 'Collaborative filtering'],
    },
  ],
};

export const contact = {
  heading: 'Open to full-stack and React roles.',
  text: 'The quickest way to reach me is email. My resume has the full history.',
};
