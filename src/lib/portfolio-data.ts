// Central portfolio data — strictly sourced from Prajwal PG's resume.

export const profile = {
  name: "Prajwal PG",
  role: "AI Engineer",
  headline: "AI Engineer building intelligent, practical AI applications.",
  tagline: "Generative AI · RAG · Multi-Agent Systems · Computer Vision · OCR",
  location: "Mysore, Karnataka, India",
  phone: "+91-6362105484",
  email: "prajwal02pg@gmail.com",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/prajwalpg",
  linkedin: "https://www.linkedin.com/in/prajwal-pg-6ba947253",
  intro:
    "AI Engineer with experience in Generative AI, RAG, Multi-Agent Systems, Computer Vision, and OCR. Built AI-powered applications using Gemini APIs, Next.js, PostgreSQL, and TensorFlow through internships and academic projects.",
  about: [
    "I am an AI Engineer specializing in Generative AI, Retrieval-Augmented Generation (RAG), Multi-Agent Systems, and Computer Vision. I hold a Bachelor of Engineering in Computer Science & Engineering (Artificial Intelligence & Machine Learning) from PES College of Engineering, Mandya, and a Diploma in CSE from Govt. CPC Polytechnic, Mysuru.",
    "Through internships at HirePro Technologies and Runshaw Technologies, as well as hands-on engineering projects like SAHAYAK, I have built practical AI applications combining document intelligence, automated assessment monitoring, facial recognition workflows, and Gemini-powered multi-agent educational systems.",
    "I focus on developing clean, practical AI solutions that combine modern machine learning models with robust full-stack web architectures.",
  ],
};

export type SkillGroup = {
  title: string;
  icon: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Generative AI",
    icon: "sparkles",
    skills: [
      "Large Language Models (LLMs)",
      "Retrieval-Augmented Generation (RAG)",
      "Multi-Agent Systems",
      "Prompt Engineering",
      "Gemini API",
      "AI Agents",
      "NLP",
    ],
  },
  {
    title: "Machine Learning & Computer Vision",
    icon: "eye",
    skills: [
      "TensorFlow",
      "CNNs",
      "Transfer Learning",
      "OpenCV",
      "OCR",
      "Tesseract OCR",
      "EasyOCR",
    ],
  },
  {
    title: "Programming Languages",
    icon: "code",
    skills: ["Python", "SQL", "JavaScript"],
  },
  {
    title: "Web Technologies",
    icon: "layout",
    skills: [
      "Next.js",
      "Node.js",
      "Flask",
      "REST APIs",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "NextAuth.js",
    ],
  },
  {
    title: "Database & Tools",
    icon: "server",
    skills: ["PostgreSQL", "Prisma ORM", "Git", "GitHub", "VS Code"],
  },
  {
    title: "Concepts",
    icon: "brain",
    skills: [
      "Deep Learning",
      "AI Proctoring",
      "Document Intelligence",
      "Authentication Systems",
      "Cloud-Based Architecture",
    ],
  },
];

export type EducationItem = {
  degree: string;
  field: string;
  institution: string;
  score: string;
  period: string;
};

export const educationList: EducationItem[] = [
  {
    degree: "Bachelor of Engineering (B.E.)",
    field: "Computer Science & Engineering (Artificial Intelligence & Machine Learning)",
    institution: "PES College of Engineering, Mandya",
    score: "CGPA: 7.18 / 10",
    period: "2023 – 2026",
  },
  {
    degree: "Diploma",
    field: "Computer Science & Engineering",
    institution: "Govt. CPC Polytechnic, Mysuru",
    score: "CGPA: 8.83 / 10",
    period: "2020 – 2023",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  bullets: string[];
  tech: string[];
};

export const experiences: Experience[] = [
  {
    company: "HirePro Technologies",
    role: "Frontend & AI Research Intern",
    period: "Jan 2026 – Apr 2026",
    description:
      "Developed proof-of-concept modules for AI-assisted online assessment monitoring.",
    bullets: [
      "Implemented browser activity tracking, fullscreen violation detection, and copy-paste monitoring systems.",
      "Built gaze estimation and multi-face detection modules for assessment integrity monitoring.",
      "Collaborated on AI-driven cheating detection workflows combining behavioral analytics and Computer Vision techniques.",
      "Contributed to research and evaluation of assessment integrity monitoring systems.",
    ],
    tech: ["JavaScript", "Browser APIs", "Gaze Tracking", "Computer Vision"],
  },
  {
    company: "Runshaw Technologies",
    role: "Deep Learning Intern",
    period: "Jan 2026 – May 2026",
    description:
      "Developed an end-to-end document intelligence pipeline for extracting structured product information from packaging images.",
    bullets: [
      "Built OCR workflows using OpenCV, Tesseract OCR, EasyOCR, and deep learning models.",
      "Applied transfer learning using ResNet, VGG, and EfficientNet architectures for image classification tasks.",
      "Integrated extraction services through REST APIs for automated downstream processing.",
    ],
    tech: [
      "Python",
      "TensorFlow",
      "OpenCV",
      "Tesseract OCR",
      "EasyOCR",
      "Flask",
      "ResNet",
      "VGG",
      "EfficientNet",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem?: string;
  solution?: string;
  highlights: string[];
  stack: string[];
  github?: string;
  demo?: string;
  accent: string;
  featured?: boolean;
  isInternshipPoc?: boolean;
};

export const projects: Project[] = [
  {
    slug: "sahayak",
    title: "SAHAYAK – Multi-Agent AI Educational Platform",
    tagline: "Multi-Agent AI educational platform with RAG, proctoring, and facial attendance.",
    description:
      "Developed a Multi-Agent AI educational platform using RAG, Gemini APIs, Next.js, PostgreSQL, and Prisma ORM.",
    problem:
      "Traditional classrooms lack context-aware AI tutoring, automated evaluation tools, and integrated attendance/proctoring management.",
    solution:
      "Engineered SAHAYAK—a multi-agent AI system combining RAG context retrieval, Gemini-powered tutoring, multilingual assistance, classroom memory, AI proctoring, and facial-recognition attendance.",
    highlights: [
      "AI-powered tutoring & automated worksheet generation",
      "Multilingual learning assistance with classroom memory systems",
      "Context-aware retrieval pipelines (RAG)",
      "Role-based authentication & facial-recognition attendance",
      "AI-powered proctoring workflows",
    ],
    stack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Prisma ORM",
      "Gemini API",
      "Tailwind CSS",
      "RAG",
      "Multi-Agent AI",
    ],
    github: "https://github.com/prajwalpg",
    accent: "from-violet-500/30 via-fuchsia-500/20 to-blue-500/30",
    featured: true,
  },
  {
    slug: "smart-attendance-system",
    title: "Smart Attendance System",
    tagline: "Real-time facial recognition attendance automation.",
    description:
      "Developed an AI-powered attendance automation system using OpenCV, SSD face detection, and MobileNetV2 embeddings. Implemented real-time facial recognition workflows for automated attendance tracking.",
    highlights: [
      "Real-time facial recognition workflows for automated attendance tracking",
      "SSD face detection for precise bounding-box localization",
      "MobileNetV2 feature embeddings for high-accuracy face matching",
      "Automated log generation and record management",
    ],
    stack: ["Python", "OpenCV", "TensorFlow", "SSD Face Detection", "MobileNetV2"],
    github: "https://github.com/prajwalpg",
    accent: "from-cyan-500/30 via-blue-500/20 to-violet-500/30",
    featured: true,
  },
  {
    slug: "ai-assessment-monitoring",
    title: "AI-Assisted Online Assessment Monitoring",
    tagline: "HirePro Internship POC — Browser & Vision integrity monitoring.",
    description:
      "Developed proof-of-concept modules for AI-assisted online assessment monitoring during internship at HirePro Technologies.",
    highlights: [
      "Browser activity tracking & fullscreen violation detection",
      "Copy-paste event monitoring & behavioral analysis",
      "Gaze estimation & multi-face detection alerts",
      "AI-driven cheating detection workflows combining behavioral analytics & vision",
    ],
    stack: ["JavaScript", "Browser APIs", "Gaze Tracking", "Computer Vision"],
    github: "https://github.com/prajwalpg",
    accent: "from-emerald-500/30 via-teal-500/20 to-cyan-500/30",
    featured: true,
    isInternshipPoc: true,
  },
  {
    slug: "document-intelligence-ocr",
    title: "Document Intelligence & OCR Pipeline",
    tagline: "Runshaw Internship Project — Deep learning package info extraction.",
    description:
      "Developed an end-to-end document intelligence pipeline for extracting structured product information from packaging images during internship at Runshaw Technologies.",
    highlights: [
      "Image preprocessing & perspective correction using OpenCV",
      "Dual OCR engine workflows with Tesseract OCR and EasyOCR",
      "Transfer learning with ResNet, VGG, and EfficientNet architectures for classification",
      "REST API integration for automated downstream processing",
    ],
    stack: [
      "Python",
      "TensorFlow",
      "OpenCV",
      "Tesseract OCR",
      "EasyOCR",
      "Flask",
      "ResNet",
      "VGG",
      "EfficientNet",
    ],
    github: "https://github.com/prajwalpg",
    accent: "from-amber-500/30 via-orange-500/20 to-rose-500/30",
    featured: true,
    isInternshipPoc: true,
  },
];

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  skills: string[];
};

export const certifications: Certification[] = [
  {
    title: "Generative AI",
    issuer: "Microsoft & LinkedIn",
    year: "2024",
    skills: ["Generative AI", "LLMs", "AI Concepts"],
  },
  {
    title: "XPro Project: Azure DevOps",
    issuer: "Microsoft / XPro",
    year: "2024",
    skills: ["Azure DevOps", "CI/CD", "Cloud Tools"],
  },
  {
    title: "CCNA 200-301 Network",
    issuer: "Cisco",
    year: "2024",
    skills: ["Networking", "IP Routing", "Network Fundamentals"],
  },
  {
    title: 'National Cadet Corps (NCC) "C" Certificate',
    issuer: "National Cadet Corps (India)",
    year: "2023",
    skills: ["Leadership", "Discipline", "Team Management"],
  },
];

export type Achievement = {
  title: string;
  issuer: string;
  focus: string;
  description: string;
};

export const achievements: Achievement[] = [
  {
    title: "Secured 2nd Place in Innovate-A-Thon",
    issuer: "PES College of Engineering, Mandya",
    focus: "Agri-Tech and Rural Development",
    description:
      "Awarded 2nd rank for innovative technical solutions in agriculture and rural development.",
  },
  {
    title: 'NCC "C" Certificate',
    issuer: "National Cadet Corps (India)",
    focus: "Leadership & Discipline",
    description:
      "Achieved the prestigious 'C' Certificate, demonstrating high-level leadership and physical discipline.",
  },
];
