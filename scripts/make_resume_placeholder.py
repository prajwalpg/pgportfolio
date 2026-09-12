# Generates a simple placeholder resume PDF so the View/Download buttons work out of the box.
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.enums import TA_LEFT

out = "/home/z/my-project/public/resume.pdf"
styles = getSampleStyleSheet()

name_style = ParagraphStyle('Name', parent=styles['Title'], fontName='Helvetica-Bold',
                            fontSize=26, textColor=HexColor('#1a1a2e'), spaceAfter=4)
role_style = ParagraphStyle('Role', parent=styles['Normal'], fontName='Helvetica',
                            fontSize=12, textColor=HexColor('#6b7280'), spaceAfter=8)
contact_style = ParagraphStyle('Contact', parent=styles['Normal'], fontName='Helvetica',
                               fontSize=10, textColor=HexColor('#4b5563'), spaceAfter=2)
h2_style = ParagraphStyle('H2', parent=styles['Heading2'], fontName='Helvetica-Bold',
                          fontSize=13, textColor=HexColor('#1a1a2e'),
                          spaceBefore=12, spaceAfter=4)
body_style = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica',
                            fontSize=10.5, textColor=HexColor('#374151'),
                            leading=15, spaceAfter=4, alignment=TA_LEFT)
bullet_style = ParagraphStyle('Bullet', parent=body_style, leftIndent=12, bulletIndent=2,
                              spaceAfter=2)

doc = SimpleDocTemplate(out, pagesize=A4,
                        leftMargin=20*mm, rightMargin=20*mm,
                        topMargin=18*mm, bottomMargin=18*mm)

story = []
story.append(Paragraph("Prajwal PG", name_style))
story.append(Paragraph("AI/ML Engineer  ·  GenAI  ·  RAG  ·  Computer Vision", role_style))
story.append(Paragraph("Bengaluru, India  ·  prajwal.pg@example.com", contact_style))
story.append(Paragraph("github.com/prajwalpg  ·  linkedin.com/in/prajwalpg", contact_style))
story.append(Spacer(1, 4))
story.append(HRFlowable(width="100%", thickness=0.7, color=HexColor('#d1d5db')))
story.append(Paragraph("About", h2_style))
story.append(Paragraph(
    "CSE-AIML student and AI/ML engineer specializing in production-grade GenAI, RAG, and "
    "computer-vision systems. I build end-to-end — model training, backend APIs, and "
    "React/Next.js front-ends — and care about evaluation, latency, and UX as much as accuracy.",
    body_style))

story.append(Paragraph("Skills", h2_style))
story.append(Paragraph(
    "<b>Languages:</b> Python, TypeScript, JavaScript, SQL, C++<br/>"
    "<b>ML:</b> TensorFlow, PyTorch, scikit-learn, Hugging Face, LLMs<br/>"
    "<b>GenAI / RAG:</b> LangChain, RAG, Vector DBs, Prompt Engineering, Embeddings<br/>"
    "<b>Computer Vision:</b> OpenCV, OCR, Tesseract, EasyOCR, Face Detection<br/>"
    "<b>Backend:</b> FastAPI, Flask, REST APIs, PostgreSQL, Prisma<br/>"
    "<b>Frontend:</b> Next.js, React, Tailwind CSS, Git/GitHub, Docker",
    body_style))

story.append(Paragraph("Featured Projects", h2_style))
story.append(Paragraph("<b>AI Resume Screening &amp; Candidate Ranking Agent</b>", bullet_style))
story.append(Paragraph(
    "PDF/DOCX/TXT resume processing, JD matching, hybrid rule-based + semantic scoring, "
    "skill-gap analysis, explainable recommendations.", body_style))
story.append(Paragraph("<b>SAHAYAK — Multi-Agent RAG Educational Assistant</b>", bullet_style))
story.append(Paragraph(
    "Multi-agent RAG (retriever, summarizer, fact-checker, quiz-master), Next.js + PostgreSQL + "
    "Prisma, streaming chat UI with cited answers.", body_style))
story.append(Paragraph("<b>AI-Assisted Online Proctoring</b>", bullet_style))
story.append(Paragraph(
    "Real-time face detection, gaze estimation, multiple-face alerts, browser behavior "
    "monitoring, frame-level cheating analysis.", body_style))
story.append(Paragraph("<b>OCR &amp; Computer Vision Pipeline</b>", bullet_style))
story.append(Paragraph(
    "OpenCV preprocessing, TensorFlow text localization, dual OCR engines (Tesseract + EasyOCR) "
    "with fallback, Flask REST API with confidence scoring.", body_style))

story.append(Paragraph("Experience", h2_style))
story.append(Paragraph("<b>Frontend Developer — AI-assisted Proctoring Intern</b>", bullet_style))
story.append(Paragraph("HirePro Technologies  ·  2024 — 2025", contact_style))
story.append(Paragraph(
    "Built reviewer dashboard components for live face detection, gaze tracking, and multi-face "
    "alerts. Integrated browser behavior monitoring events. Collaborated with CV team to surface "
    "model confidence and cheating analysis. Shipped responsive, accessible components.",
    body_style))

story.append(Paragraph("Certifications", h2_style))
story.append(Paragraph(
    "Deep Learning Specialization (DeepLearning.AI) · TensorFlow Developer Certificate (Google) · "
    "NLP Specialization · Computer Vision with OpenCV &amp; TensorFlow · LangChain for LLM App "
    "Development · PostgreSQL for Developers.", body_style))

story.append(Spacer(1, 8))
story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor('#d1d5db')))
story.append(Paragraph(
    "<i>This is a placeholder resume generated with the portfolio template. Replace "
    "/public/resume.pdf with your own PDF.</i>",
    ParagraphStyle('Note', parent=body_style, fontSize=9, textColor=HexColor('#9ca3af'))))

doc.build(story)
print(f"Created {out}")
