// Public profile and repository sources are recorded in README.md.
export const profile = {
  name: 'Anmol Sharma',
  email: 'asanmolsharma54@gmail.com',
  github: 'https://github.com/Anmol-sharma-01',
  linkedin: 'https://www.linkedin.com/in/anmol-sharma-914371271/',
  location: 'Kitchener–Waterloo, Ontario',
};

export const projects = [
  {
    id: 'apt',
    number: '01',
    category: 'MALWARE ANALYSIS × MACHINE LEARNING',
    title: 'Finding the patterns behind APTs.',
    name: 'AI-driven APT detection',
    description:
      'Using instruction-level patterns and machine learning to classify malware associated with 40 advanced persistent threat groups.',
    tags: ['Python', 'OpCode analysis', 'Machine learning'],
    overview:
      'A research project exploring how assembly instructions can help distinguish malware associated with advanced persistent threat groups. The pipeline moves from executable analysis to feature extraction and classifier evaluation.',
    details: [
      'Extracted and preprocessed OpCode features from malware payloads.',
      'Compared SVM, KNN, and Decision Tree classifiers alongside deep learning approaches.',
      'Studied tactics, techniques, and procedures across 40 APT groups.',
    ],
    url: 'https://github.com/Anmol-sharma-01/AI-driven-APT-detection-using-OpCodes-ML-classifiers-and-deep-learning-for-malware-analysis.',
    linkLabel: 'Explore repository',
  },
  {
    id: 'toolkit',
    number: '02',
    category: 'DATA PROTECTION × GOVERNANCE',
    title: 'Making data protection practical.',
    name: 'Client data protection toolkit',
    description:
      'Plain-language checklists and security guidance for small Ontario audit firms, covering the full client data lifecycle.',
    tags: ['PIPEDA', 'Risk management', 'Incident readiness'],
    overview:
      'A practical collection of templates, checklists, and guides for handling sensitive client information in small audit firms. The work translates security and privacy considerations into everyday operational steps.',
    details: [
      'Covered secure collection, storage, transmission, and disposal of client data.',
      'Created incident and ransomware readiness materials.',
      'Organized practical guidance around PIPEDA and the needs of Ontario audit firms.',
    ],
    url: 'https://github.com/Anmol-sharma-01/Safeguarding-Client-Data-in-Ontario-Small-Audit-Firms',
    linkLabel: 'Explore repository',
  },
  {
    id: 'honeypot',
    number: '03',
    category: 'DECEPTION × THREAT DETECTION',
    title: 'Learning from adversary behavior.',
    name: 'Ransomware research with honeypots',
    description:
      'Using Conpot honeypots to observe unauthorized activity and translate adversary behavior into detection insights.',
    tags: ['Conpot', 'IOC extraction', 'Snort / SIEM'],
    overview:
      'A deception-based research project using industrial control system honeypots to study adversary interactions. The focus connects observed activity with indicators and detection rules.',
    details: [
      'Deployed and hardened Conpot honeypot nodes.',
      'Logged unauthorized probes and command injection attempts.',
      'Extracted indicators of compromise and mapped behavior to Snort and SIEM detection rules.',
    ],
    url: 'https://github.com/Anmol-sharma-01/Anmol-sharma-01#-featured-research--engineering-projects',
    linkLabel: 'View research profile',
  },
  {
    id: 'osint',
    number: '04',
    category: 'THREAT INTELLIGENCE × AUTOMATION',
    title: 'Connecting the intelligence dots.',
    name: 'Automated OSINT pipeline',
    description:
      'Bringing scattered threat feeds together with Python automation to support faster, more structured analyst triage.',
    tags: ['Python', 'OSINT', 'STIX / TAXII'],
    overview:
      'An intelligence aggregation workflow bringing together OSINT search tools and threat feeds. Modular scripts turn raw data into consistent, structured intelligence for analyst review.',
    details: [
      'Automated IOC discovery, DNS enumeration, and banner collection.',
      'Worked with SpiderFoot, Shodan, and Maltego APIs.',
      'Normalized JSON feeds into structured STIX/TAXII alerts.',
    ],
    url: 'https://github.com/Anmol-sharma-01/Anmol-sharma-01#-featured-research--engineering-projects',
    linkLabel: 'View research profile',
  },
];

export const expertise = [
  {
    id: 'security',
    label: 'Cybersecurity',
    title: 'Understand the threat. Strengthen the defense.',
    description:
      'From malware behavior and attack paths to code vulnerabilities and actionable detection.',
    groups: [
      {
        label: 'ANALYSIS & DETECTION',
        tools: [
          'Wireshark',
          'Burp Suite',
          'Nmap',
          'Metasploit',
          'CodeQL',
          'Snyk',
        ],
      },
      {
        label: 'INTELLIGENCE & FRAMEWORKS',
        tools: [
          'MITRE ATT&CK',
          'OWASP Top 10',
          'CWE',
          'NIST CSF',
          'Shodan',
          'Maltego',
        ],
      },
    ],
  },
  {
    id: 'ml',
    label: 'AI & machine learning',
    title: 'Find the signal in complex data.',
    description:
      'Feature extraction, model comparison, and experimentation for malware analysis and AI code security.',
    groups: [
      {
        label: 'MODELING & RESEARCH',
        tools: [
          'PyTorch',
          'TensorFlow',
          'Scikit-learn',
          'SVM',
          'Deep learning',
          'LLM security',
        ],
      },
      {
        label: 'DATA & EXPERIMENTATION',
        tools: [
          'Python',
          'Pandas',
          'NumPy',
          'OpCode analysis',
          'Feature extraction',
          'Model evaluation',
        ],
      },
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    title: 'Build the systems that support the research.',
    description:
      'Programming, automation, and secure development practices that connect research to usable tools.',
    groups: [
      {
        label: 'LANGUAGES',
        tools: ['Python', 'Java', 'C++', 'Bash', 'JavaScript', 'SQL'],
      },
      {
        label: 'PLATFORMS & WORKFLOWS',
        tools: [
          'Linux',
          'Kali Linux',
          'Docker',
          'Git',
          'GitHub Actions',
          'Jira',
        ],
      },
    ],
  },
];

export const experience = [
  {
    date: 'NOV 2025 — MAR 2026',
    role: 'Research Associate',
    organization: 'eSentire Labs & CyberScience Lab',
    description:
      'Researched context-aware security scanning for AI-generated code. Worked with SAST and dynamic analysis pipelines, vulnerability benchmarking, and security dashboards.',
    tags: ['AI code security', 'CodeQL', 'Snyk'],
  },
  {
    date: 'JAN 2023 — JUN 2023',
    role: 'Java Engineering Intern',
    organization: 'Excellence Technology',
    description:
      'Built backend modules with role-based access control, authentication, and session security. Contributed to vulnerability testing, patch verification, and peer code reviews.',
    tags: ['Java', 'Secure development', 'RBAC'],
  },
];

export const education = [
  {
    date: '2024 — 2025',
    title: 'MSc Cybersecurity & Threat Intelligence',
    institution: 'University of Guelph',
    location: 'Ontario, Canada',
  },
  {
    date: '2019 — 2023',
    title: 'B.Eng Computer Engineering',
    institution: 'I.K. Gujral Punjab Technical University',
    location: 'India',
  },
];
