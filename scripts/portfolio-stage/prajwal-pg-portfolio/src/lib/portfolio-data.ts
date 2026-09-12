// Central portfolio data — edit here to update the site.

export const profile = {
  name: "Prajwal PG",
  role: "AI/ML Engineer",
  tagline: "GenAI · RAG · Computer Vision",
  location: "Bengaluru, India",
  email: "prajwal.pg@example.com",
  resumeUrl: "/resume.pdf", // place the PDF in /public to enable download
  github: "https://github.com/prajwalpg",
  linkedin: "https://www.linkedin.com/in/prajwalpg",
  intro:
    "I design and ship production-grade AI systems — from multi-agent RAG platforms to real-time computer-vision pipelines. Currently focused on making GenAI useful in real products: explainable, measurable, and fast.",
  about: [
    "I'm a Computer Science & Engineering student specializing in Artificial Intelligence & Machine Learning (CSE-AIML). Over the last few years I've moved from coursework into building real, deployed AI products — proctoring systems used in production, RAG assistants that help students learn faster, and resume-ranking agents that recruiters can actually trust.",
    "My core interest is the intersection of GenAI and Computer Vision: how LLMs can reason about structured documents, how retrieval can be made explainable, and how vision models can run in real time inside browsers. I enjoy the full stack — model training, backend APIs, and the React/Next.js frontends that make AI feel tangible to end users.",
    "Career goal: become an AI/ML engineer who ships. I want to work on systems where evaluation, latency, and user experience matter as much as model accuracy — and where the work I ship is measurable in the metrics a business cares about.",
  ],
};

export type SkillGroup = {
  title: string;
  icon: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Core",
    icon: "code",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "C++"],
  },
  {
    title: "Machine Learning",
    icon: "brain",
    skills: ["TensorFlow", "PyTorch", "scikit-learn", "Hugging Face", "LLMs"],
  },
  {
    title: "GenAI & RAG",
    icon: "sparkles",
    skills: ["LangChain", "RAG", "Vector DBs", "Prompt Engineering", "Embeddings"],
  },
  {
    title: "Computer Vision",
    icon: "eye",
    skills: ["OpenCV", "OCR", "Tesseract", "EasyOCR", "Face Detection"],
  },
  {
    title: "Backend & Data",
    icon: "server",
    skills: ["FastAPI", "Flask", "REST APIs", "PostgreSQL", "Prisma"],
  },
  {
    title: "Frontend & Tools",
    icon: "layout",
    skills: ["Next.js", "React", "Tailwind CSS", "Git/GitHub", "Docker"],
  },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  github?: string;
  demo?: string;
  accent: string; // tailwind gradient classes
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "ai-resume-screening",
    title: "AI Resume Screening & Candidate Ranking Agent",
    tagline: "Agentic resume ranking with explainable, hybrid scoring.",
    description:
      "An end-to-end agent that ingests PDF / DOCX / TXT resumes, parses them with OCR + layout-aware extraction, and ranks candidates against a job description using a hybrid rule-based + semantic scoring engine. Every score is explainable — recruiters see exactly which skills matched, which were missing, and why a candidate landed where they did.",
    highlights: [
      "PDF / DOCX / TXT resume parsing with OCR fallback",
      "Job-description matching with hybrid rule-based + semantic scoring",
      "AI candidate ranking with confidence calibration",
      "Skill-gap analysis between candidate and JD",
      "Explainable, per-candidate recommendations",
    ],
    stack: ["Python", "LangChain", "Hugging Face", "FastAPI", "PyMuPDF", "Tesseract"],
    github: "https://github.com/prajwalpg/ai-resume-screening",
    accent: "from-violet-500/30 via-fuchsia-500/20 to-blue-500/30",
    featured: true,
  },
  {
    slug: "sahayak",
    title: "SAHAYAK — Multi-Agent RAG Educational Assistant",
    tagline: "A multi-agent tutor that retrieves, explains, and verifies.",
    description:
      "SAHAYAK is an educational assistant built on a multi-agent RAG architecture. Each agent owns a responsibility — retrieval, summarization, fact-checking, or quiz generation — and they collaborate to answer student questions with citations and source-grounded explanations. Built on Next.js + PostgreSQL + Prisma with a streaming chat UI.",
    highlights: [
      "Multi-agent architecture: retriever, summarizer, fact-checker, quiz-master",
      "RAG with vector retrieval + reranking for grounded answers",
      "Next.js + PostgreSQL + Prisma backend with streaming responses",
      "Cited, source-grounded answers students can trust",
    ],
    stack: ["Next.js", "PostgreSQL", "Prisma", "LangChain", "OpenAI", "Vector DB"],
    github: "https://github.com/prajwalpg/sahayak",
    demo: "https://sahayak.example.com",
    accent: "from-cyan-500/30 via-blue-500/20 to-violet-500/30",
    featured: true,
  },
  {
    slug: "ai-proctoring",
    title: "AI-Assisted Online Proctoring",
    tagline: "Real-time, browser-native exam integrity monitoring.",
    description:
      "A production proctoring system that runs vision models in the browser to detect faces, track gaze, and flag suspicious browser behavior — all while preserving a smooth exam experience. Powers real online assessments with frame-level cheating analysis and reviewer-friendly reports.",
    highlights: [
      "Real-time face detection + multi-face presence alerts",
      "Gaze estimation for off-screen attention tracking",
      "Multiple-face detection to flag impersonation",
      "Browser behavior monitoring (tab switches, blur, fullscreen exit)",
      "Frame-level cheating analysis with reviewer reports",
    ],
    stack: ["TensorFlow.js", "MediaPipe", "OpenCV", "React", "Node.js", "WebSocket"],
    github: "https://github.com/prajwalpg/ai-proctoring",
    accent: "from-emerald-500/30 via-teal-500/20 to-cyan-500/30",
    featured: true,
  },
  {
    slug: "ocr-cv-pipeline",
    title: "OCR & Computer Vision Pipeline",
    tagline: "Modular OCR pipeline with model fallback and REST APIs.",
    description:
      "A modular OCR pipeline that combines classical OpenCV preprocessing, TensorFlow-based text localization, and dual OCR engines (Tesseract + EasyOCR) with automatic fallback. Exposed through clean Flask REST APIs so any service can drop in document OCR with confidence scores.",
    highlights: [
      "OpenCV preprocessing pipeline (denoise, deskew, binarize)",
      "TensorFlow text localization for region proposals",
      "Dual OCR engines (Tesseract + EasyOCR) with fallback",
      "Flask REST API with confidence scoring per region",
    ],
    stack: ["OpenCV", "TensorFlow", "Tesseract", "EasyOCR", "Flask", "REST APIs"],
    github: "https://github.com/prajwalpg/ocr-cv-pipeline",
    accent: "from-amber-500/30 via-orange-500/20 to-rose-500/30",
    featured: true,
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    company: "HirePro Technologies",
    role: "Frontend Developer — AI-assisted Proctoring Intern",
    period: "2024 — 2025",
    description:
      "Worked on the front-end of HirePro's AI-assisted online proctoring product, integrating real-time vision-model outputs into the reviewer dashboard and candidate exam interface.",
    bullets: [
      "Built reviewer dashboard components for live face detection, gaze tracking, and multi-face alerts",
      "Integrated browser behavior monitoring events into the candidate UI without degrading exam performance",
      "Collaborated with the CV team to surface model confidence + cheating analysis in a reviewer-friendly format",
      "Shipped responsive, accessible components used across internal QA and pilot assessments",
    ],
  },
];

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  url?: string;
  skills: string[];
};

export const certifications: Certification[] = [
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    year: "2024",
    skills: ["Neural Networks", "CNNs", "Sequence Models"],
  },
  {
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    year: "2024",
    skills: ["TensorFlow", "Keras", "Model Deployment"],
  },
  {
    title: "Natural Language Processing Specialization",
    issuer: "DeepLearning.AI",
    year: "2023",
    skills: ["NLP", "Transformers", "Attention"],
  },
  {
    title: "Computer Vision with OpenCV & TensorFlow",
    issuer: "Coursera",
    year: "2023",
    skills: ["OpenCV", "Object Detection", "OCR"],
  },
  {
    title: "LangChain for LLM Application Development",
    issuer: "DeepLearning.AI",
    year: "2024",
    skills: ["LangChain", "RAG", "Agents"],
  },
  {
    title: "PostgreSQL for Developers",
    issuer: "pgadmin",
    year: "2023",
    skills: ["PostgreSQL", "SQL", "Indexing"],
  },
];
