export const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Target Grants', href: '/target-grants' },
  { name: 'Pilot Trial', href: '/pilot-program' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'About', href: '/about' },
];

export const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'FAQs', href: '/faqs' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Target Grants', href: '/target-grants' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { name: 'Business Grants', href: '/target-grants' },
      { name: 'Enterprise Development Grant', href: '/target-grants#edg' },
      { name: 'Productivity Solutions Grant', href: '/target-grants#psg' },
      { name: 'Market Readiness Assistance', href: '/target-grants#mra' },
    ],
  },
];

export const features = [
  {
    title: 'Funding Barrier',
    description: 'Capital Hard to Access',
    longDescription:
      'Fragmented, slow grant processes make it difficult for SMEs to secure essential funding when they need it most.',
    icon: 'clock',
  },
  {
    title: 'Growth Barrier',
    description: 'Stagnant Expansion',
    longDescription:
      'SMEs lack clear insight into new opportunities, markets, and customer demand — stalling growth in competitive environments.',
    icon: 'bar-chart-3',
  },
  {
    title: 'Operational Barrier',
    description: 'Low Productivity',
    longDescription:
      'Manual workflows, siloed tools, and unclear processes drain time and prevent teams from focusing on high-value work.',
    icon: 'settings',
  },
];

export const howItWorks = [
  {
    title: 'Onboard',
    description: 'Complete a 5-minute business profile questionnaire to help our AI understand your business needs.',
    icon: 'user-plus',
  },
  {
    title: 'Match',
    description: 'Our AI algorithm instantly analyzes your profile against all available government grants.',
    icon: 'search',
  },
  {
    title: 'Generate',
    description: 'Aivira creates customized grant applications tailored to your specific business context.',
    icon: 'file-text',
  },
  {
    title: 'Track',
    description: 'Monitor your application status and receive real-time updates on compliance requirements.',
    icon: 'activity',
  },
];

export const targetGrants = [
  {
    id: 'psg',
    name: 'Productivity Solutions Grant (PSG)',
    description: 'Supports companies in the adoption of pre-scoped IT solutions and equipment to enhance business processes.',
    maxFunding: 'Up to 70% of costs',
    eligibility: [
      'Registered and operating in Singapore',
      'Purchase/lease/subscription of the IT solutions or equipment must be used in Singapore',
      'Have at least 30% local shareholding',
    ],
  },
  {
    id: 'edg',
    name: 'Enterprise Development Grant (EDG)',
    description: 'Helps Singapore companies grow and transform, supporting projects in innovation, productivity, and internationalization.',
    maxFunding: 'Up to 70% of costs',
    eligibility: [
      'Registered and operating in Singapore',
      'Have at least 30% local shareholding',
      'Be financially viable and have a clear growth strategy',
    ],
  },
  {
    id: 'mra',
    name: 'Market Readiness Assistance (MRA)',
    description: 'Supports businesses in their overseas expansion by helping to defray costs of internationalization.',
    maxFunding: 'Up to 70% of eligible costs, capped at S$100,000 per company per fiscal year',
    eligibility: [
      'Business entity registered/incorporated in Singapore',
      'Have at least 30% local shareholding',
      'Group annual sales turnover ≤ S$100 million or group employment ≤ 200 employees',
    ],
  },
];

export const pricingPlans = [
  {
    name: 'Starter',
    price: 99,
    description: 'Perfect for small businesses applying for their first grant',
    features: [
      'Access to 5+ grant programs',
      'AI-powered eligibility checker',
      'Basic proposal templates',
      'Email support',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Growth',
    price: 199,
    description: 'Ideal for growing businesses seeking multiple grants',
    features: [
      'Access to 15+ grant programs',
      'AI-powered proposal generation',
      'Compliance dashboard',
      'Priority email & chat support',
      'Quarterly strategy sessions',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 299,
    description: 'Comprehensive solution for established businesses',
    features: [
      'Access to all grant programs',
      'Custom AI-powered proposal generation',
      'Advanced compliance tracking',
      'Dedicated account manager',
      'Monthly strategy sessions',
      'Post-approval support',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export const faqs = [
  {
    question: 'How does Aivira compare to traditional grant consultants?',
    answer: 'Aivira delivers the same quality service as traditional consultants at 90% less cost through AI automation. Unlike consultants who may take weeks, our platform matches you with eligible grants in minutes and generates proposals in hours.'
  },
  {
    question: 'What types of grants does Aivira cover?',
    answer: 'We currently cover all major Singapore business grants including the Productivity Solutions Grant (PSG), Enterprise Development Grant (EDG), and Market Readiness Assistance (MRA). We continuously add new grants to our platform.'
  },
  {
    question: 'How accurate is the AI in matching my business to grants?',
    answer: 'Our AI has been trained on thousands of successful grant applications and government criteria. It achieves a 95% accuracy rate in matching businesses to grants they qualify for, significantly higher than manual research methods.'
  },
  {
    question: 'Do I need to be tech-savvy to use Aivira?',
    answer: 'Not at all! We\'ve designed Aivira to be intuitive and user-friendly. If you can use email, you can use Aivira. Our step-by-step process guides you through everything you need to do.'
  },
  {
    question: 'What happens after I submit my grant application?',
    answer: 'Aivira continues to work for you after submission. Our platform tracks your application status, notifies you of any government requests for additional information, and helps you maintain compliance with post-approval requirements.'
  },
  {
    question: 'Is my business data secure on Aivira?',
    answer: 'Absolutely. We use enterprise-grade encryption and comply with all Singapore data protection regulations including PDPA. Your business data is never shared with third parties without your explicit permission.'
  },
  {
    question: 'Does Aivira guarantee grant approval?',
    answer: 'No. Aivira provides tools and guidance to help you prepare stronger applications, but final approval decisions rest with the relevant government agencies.'
  },
  {
    question: 'Do you have customer success stories yet?',
    answer: 'We are currently in an early pilot phase and working with prospective users. We will share case studies as soon as we have validated results to report.'
  },
  {
    question: 'Can Aivira help with grant compliance after approval?',
    answer: 'Yes! Our compliance tracking feature helps you stay on top of all post-approval requirements, including documentation, milestone reporting, and financial reconciliation. This ensures you maintain compliance and receive your full grant disbursement.'
  }
];


export const teamMembers = [
  {
    name: 'Romil Jain',
    title: 'Co-Founder',
    bio: 'Technology transformation leader with extensive experience in banking and financial services. Expert in digital innovation and regulatory systems.',
    image: 'https://media.licdn.com/dms/image/v2/C4D03AQGkhuVjJdfwRQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517056267459?e=1753315200&v=beta&t=ptmYoc0CB7NPgsMNE1rXuQ2ecGZdKQIH2NfffvPtqHA',
  },
  {
    name: 'Medha Jain',
    title: 'Co-Founder',
    bio: 'Financial services expert with deep experience in client operations and compliance at leading banks in Singapore.',
    image: 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  }
];

export const companyInfo = {
  name: 'Aivira PTE. LTD.',
  uen: '202520884E',
  founded: 'May 14, 2025',
  address: '6 Shenton Way, #12-11B OUE Downtown, Singapore 068809',
  email: 'romil.j@aivira.com.sg',
  phone: '+65 91090567',
};

export const techStack = [
  { name: 'Azure OpenAI Service', description: 'Powers our grant matching and proposal generation' },
  { name: 'Microsoft Azure', description: 'Cloud infrastructure ensuring enterprise-grade security' },
  { name: 'React & Next.js', description: 'For a responsive, modern web application experience' },
  { name: 'Node.js', description: 'Backend services handling data processing and API interactions' },
];
