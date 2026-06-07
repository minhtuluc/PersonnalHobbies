"use client";

import { useState } from "react";
import Link from "next/link";

// ====================================================================
// DỮ LIỆU CV — Chỉnh sửa tại đây để cập nhật thông tin thực tế
// ====================================================================
const CV_DATA = {
  vi: {
    name: "Minh Tú Luc",
    role: "Kỹ sư phần mềm Full-stack",
    summary:
      "Kỹ sư phần mềm với hơn 3 năm kinh nghiệm xây dựng sản phẩm web hiệu suất cao. Đam mê thiết kế giao diện tối giản, kiến trúc sạch và tối ưu trải nghiệm người dùng theo phong cách Apple.",
    stats: [
      { number: "3+", label: "Năm kinh nghiệm" },
      { number: "10+", label: "Dự án thực tế" },
      { number: "5", label: "Công nghệ chủ lực" },
    ],
    experience: [
      {
        title: "Senior Frontend Engineer",
        company: "TechStartup Vietnam · Toàn thời gian",
        period: "2024 – Hiện tại",
        bullets: [
          "Dẫn dắt team 4 người xây dựng lại toàn bộ dashboard sản phẩm bằng Next.js App Router, giảm TTI xuống còn 1.1s.",
          "Thiết kế hệ thống design token và component library nội bộ, tăng tốc độ phát triển UI lên 40%.",
          "Tích hợp Gemini API cho tính năng AI tóm tắt dữ liệu realtime qua Server-Sent Events.",
        ],
      },
      {
        title: "Full-stack Developer",
        company: "Freelance · Tự doanh",
        period: "2022 – 2024",
        bullets: [
          "Xây dựng và triển khai 6+ dự án e-commerce và SaaS cho khách hàng trong nước và quốc tế.",
          "Thiết kế REST API và GraphQL với Node.js + PostgreSQL, đảm bảo uptime 99.9%.",
          "Tối ưu Core Web Vitals đạt điểm Lighthouse 95+ cho toàn bộ dự án.",
        ],
      },
      {
        title: "Web Developer Intern",
        company: "FPT Software · Thực tập",
        period: "2021 – 2022",
        bullets: [
          "Tham gia phát triển module quản lý nhân sự nội bộ bằng React và Spring Boot.",
          "Viết unit test bằng Jest và tích hợp CI/CD pipeline với GitHub Actions.",
        ],
      },
    ],
    education: [
      {
        title: "Kỹ sư Công nghệ Thông tin",
        company: "Đại học Bách Khoa TP.HCM",
        period: "2018 – 2022",
        desc: "Chuyên ngành Hệ thống Thông tin. Tốt nghiệp Giỏi — GPA 3.4/4.0.",
      },
    ],
    skills: [
      {
        category: "Frontend",
        type: "frontend",
        items: ["Next.js", "React", "TypeScript", "Vanilla CSS", "GSAP", "HTML5 Canvas", "Figma to Code"],
      },
      {
        category: "Backend",
        type: "backend",
        items: ["Node.js", "Express", "PostgreSQL", "Prisma", "GraphQL", "REST API", "Edge Runtime"],
      },
      {
        category: "DevOps & Tools",
        type: "devops",
        items: ["Git", "GitHub Actions", "Vercel", "Docker", "Linux", "Nginx"],
      },
      {
        category: "Thiết kế",
        type: "design",
        items: ["Figma", "UI/UX Principles", "Design Systems", "Responsive Design"],
      },
    ],
    languages: [
      { name: "Tiếng Việt", level: "Tiếng mẹ đẻ", pct: 100 },
      { name: "Tiếng Anh", level: "B2 – Thành thạo", pct: 75 },
      { name: "Tiếng Nhật", level: "N4 – Cơ bản", pct: 30 },
    ],
    certs: [
      { icon: "🏆", title: "AWS Solutions Architect – Associate", issuer: "Amazon Web Services · 2023" },
      { icon: "📜", title: "Google UX Design Certificate", issuer: "Google / Coursera · 2022" },
      { icon: "⭐", title: "Meta Front-End Developer Certificate", issuer: "Meta / Coursera · 2021" },
    ],
    contact: [
      { icon: "✉️", label: "Email", value: "tuminhtuluc@example.com", href: "mailto:tuminhtuluc@example.com" },
      { icon: "💻", label: "GitHub", value: "github.com/minhtuluc", href: "https://github.com/minhtuluc" },
      { icon: "🔗", label: "LinkedIn", value: "linkedin.com/in/minhtuluc", href: "https://linkedin.com" },
      { icon: "📍", label: "Địa điểm", value: "TP. Hồ Chí Minh, Việt Nam", href: null },
    ],
  },

  en: {
    name: "Minh Tú Luc",
    role: "Full-stack Software Engineer",
    summary:
      "Software engineer with 3+ years of experience building high-performance web products. Passionate about minimalist UI design, clean architecture and crafting premium user experiences inspired by Apple's design philosophy.",
    stats: [
      { number: "3+", label: "Years of experience" },
      { number: "10+", label: "Shipped projects" },
      { number: "5", label: "Core technologies" },
    ],
    experience: [
      {
        title: "Senior Frontend Engineer",
        company: "TechStartup Vietnam · Full-time",
        period: "2024 – Present",
        bullets: [
          "Led a 4-person team to rebuild the core product dashboard using Next.js App Router, reducing TTI to 1.1s.",
          "Designed an internal design token system and component library, accelerating UI development by 40%.",
          "Integrated Gemini API for real-time AI-powered data summarization via Server-Sent Events.",
        ],
      },
      {
        title: "Full-stack Developer",
        company: "Freelance · Self-employed",
        period: "2022 – 2024",
        bullets: [
          "Built and deployed 6+ e-commerce and SaaS projects for local and international clients.",
          "Architected REST and GraphQL APIs with Node.js and PostgreSQL, maintaining 99.9% uptime.",
          "Optimized Core Web Vitals to achieve Lighthouse scores of 95+ across all projects.",
        ],
      },
      {
        title: "Web Developer Intern",
        company: "FPT Software · Internship",
        period: "2021 – 2022",
        bullets: [
          "Contributed to an internal HR management module using React and Spring Boot.",
          "Wrote unit tests with Jest and integrated CI/CD pipelines using GitHub Actions.",
        ],
      },
    ],
    education: [
      {
        title: "B.Eng. Information Technology",
        company: "Ho Chi Minh City University of Technology (HCMUT)",
        period: "2018 – 2022",
        desc: "Major: Information Systems. Graduated with Distinction — GPA 3.4/4.0.",
      },
    ],
    skills: [
      {
        category: "Frontend",
        type: "frontend",
        items: ["Next.js", "React", "TypeScript", "Vanilla CSS", "GSAP", "HTML5 Canvas", "Figma to Code"],
      },
      {
        category: "Backend",
        type: "backend",
        items: ["Node.js", "Express", "PostgreSQL", "Prisma", "GraphQL", "REST API", "Edge Runtime"],
      },
      {
        category: "DevOps & Tools",
        type: "devops",
        items: ["Git", "GitHub Actions", "Vercel", "Docker", "Linux", "Nginx"],
      },
      {
        category: "Design",
        type: "design",
        items: ["Figma", "UI/UX Principles", "Design Systems", "Responsive Design"],
      },
    ],
    languages: [
      { name: "Vietnamese", level: "Native speaker", pct: 100 },
      { name: "English", level: "B2 – Professional", pct: 75 },
      { name: "Japanese", level: "N4 – Basic", pct: 30 },
    ],
    certs: [
      { icon: "🏆", title: "AWS Solutions Architect – Associate", issuer: "Amazon Web Services · 2023" },
      { icon: "📜", title: "Google UX Design Certificate", issuer: "Google / Coursera · 2022" },
      { icon: "⭐", title: "Meta Front-End Developer Certificate", issuer: "Meta / Coursera · 2021" },
    ],
    contact: [
      { icon: "✉️", label: "Email", value: "tuminhtuluc@example.com", href: "mailto:tuminhtuluc@example.com" },
      { icon: "💻", label: "GitHub", value: "github.com/minhtuluc", href: "https://github.com/minhtuluc" },
      { icon: "🔗", label: "LinkedIn", value: "linkedin.com/in/minhtuluc", href: "https://linkedin.com" },
      { icon: "📍", label: "Location", value: "Ho Chi Minh City, Vietnam", href: null },
    ],
  },
};

// ====================================================================
// COMPONENT
// ====================================================================
export default function CVPage() {
  const [lang, setLang] = useState("vi");
  const cv = CV_DATA[lang];

  const handlePrint = () => window.print();

  return (
    <div className="main-content">

      {/* ── Hero ── */}
      <section className="cv-hero">
        <div className="cv-hero-inner">
          <div className="cv-avatar">👤</div>
          <h1 className="cv-hero-name">{cv.name}</h1>
          <p className="cv-hero-role">{cv.role}</p>
          <p className="cv-hero-summary">{cv.summary}</p>
          <div className="cv-hero-actions">
            <button
              onClick={handlePrint}
              className="button-primary button-large"
              style={{ cursor: "pointer", border: "none" }}
            >
              🖨 {lang === "vi" ? "In / Xuất PDF" : "Print / Export PDF"}
            </button>
            <Link href="/portfolio" className="button-secondary button-large">
              {lang === "vi" ? "Xem Portfolio" : "View Portfolio"}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Language Toggle ── */}
      <div className="cv-lang-bar no-print">
        <button
          className={`cv-lang-tab ${lang === "vi" ? "active" : ""}`}
          onClick={() => setLang("vi")}
        >
          🇻🇳 Tiếng Việt
        </button>
        <button
          className={`cv-lang-tab ${lang === "en" ? "active" : ""}`}
          onClick={() => setLang("en")}
        >
          🇬🇧 English
        </button>
      </div>

      {/* ── Main Content ── */}
      <div className="cv-content">

        {/* Stat Cards */}
        <div className="cv-stats-row">
          {cv.stats.map((s) => (
            <div key={s.label} className="cv-stat-card">
              <div className="cv-stat-number">{s.number}</div>
              <div className="cv-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Kinh nghiệm làm việc ── */}
        <section className="cv-section">
          <p className="cv-section-label">
            {lang === "vi" ? "Sự nghiệp" : "Career"}
          </p>
          <h2 className="cv-section-title">
            {lang === "vi" ? "Kinh nghiệm làm việc" : "Work Experience"}
          </h2>
          <div className="cv-timeline">
            {cv.experience.map((item, i) => (
              <div key={i} className="cv-timeline-item">
                <div className="cv-timeline-dot" />
                <div className="cv-timeline-header">
                  <span className="cv-timeline-title">{item.title}</span>
                  <span className="cv-timeline-period">{item.period}</span>
                </div>
                <p className="cv-timeline-company">{item.company}</p>
                {item.bullets && (
                  <ul className="cv-timeline-bullets">
                    {item.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
                {item.desc && (
                  <p className="cv-timeline-desc">{item.desc}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Học vấn ── */}
        <section className="cv-section">
          <p className="cv-section-label">
            {lang === "vi" ? "Nền tảng" : "Background"}
          </p>
          <h2 className="cv-section-title">
            {lang === "vi" ? "Học vấn" : "Education"}
          </h2>
          <div className="cv-timeline">
            {cv.education.map((item, i) => (
              <div key={i} className="cv-timeline-item">
                <div className="cv-timeline-dot" />
                <div className="cv-timeline-header">
                  <span className="cv-timeline-title">{item.title}</span>
                  <span className="cv-timeline-period">{item.period}</span>
                </div>
                <p className="cv-timeline-company">{item.company}</p>
                <p className="cv-timeline-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Kỹ năng ── */}
        <section className="cv-section">
          <p className="cv-section-label">
            {lang === "vi" ? "Chuyên môn" : "Expertise"}
          </p>
          <h2 className="cv-section-title">
            {lang === "vi" ? "Kỹ năng kỹ thuật" : "Technical Skills"}
          </h2>
          <div className="cv-skills-categories">
            {cv.skills.map((cat) => (
              <div key={cat.category}>
                <p className={`cv-skill-category-title ${cat.type}`}>
                  {cat.category}
                </p>
                <div className="cv-chips-wrap">
                  {cat.items.map((skill) => (
                    <span key={skill} className={`cv-skill-chip ${cat.type}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Ngôn ngữ ── */}
        <section className="cv-section">
          <p className="cv-section-label">
            {lang === "vi" ? "Giao tiếp" : "Communication"}
          </p>
          <h2 className="cv-section-title">
            {lang === "vi" ? "Ngôn ngữ" : "Languages"}
          </h2>
          <div className="cv-languages">
            {cv.languages.map((l) => (
              <div key={l.name} className="cv-lang-item">
                <span className="cv-lang-name">{l.name}</span>
                <div className="cv-lang-bar-track">
                  <div
                    className="cv-lang-bar-fill"
                    style={{ width: `${l.pct}%` }}
                  />
                </div>
                <span className="cv-lang-level">{l.level}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Chứng chỉ ── */}
        <section className="cv-section">
          <p className="cv-section-label">
            {lang === "vi" ? "Thành tích" : "Achievements"}
          </p>
          <h2 className="cv-section-title">
            {lang === "vi" ? "Chứng chỉ & Giải thưởng" : "Certifications & Awards"}
          </h2>
          <div className="cv-cert-list">
            {cv.certs.map((cert, i) => (
              <div key={i} className="cv-cert-item">
                <span className="cv-cert-icon">{cert.icon}</span>
                <div>
                  <p className="cv-cert-title">{cert.title}</p>
                  <p className="cv-cert-issuer">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Liên hệ ── */}
        <section className="cv-section" style={{ marginBottom: 0 }}>
          <p className="cv-section-label">
            {lang === "vi" ? "Kết nối" : "Connect"}
          </p>
          <h2 className="cv-section-title">
            {lang === "vi" ? "Thông tin liên hệ" : "Contact"}
          </h2>
          <div className="cv-contact-grid">
            {cv.contact.map((c) =>
              c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  className="cv-contact-card"
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className="cv-contact-icon">{c.icon}</span>
                  <div>
                    <p className="cv-contact-label">{c.label}</p>
                    <p className="cv-contact-value">{c.value}</p>
                  </div>
                </a>
              ) : (
                <div key={c.label} className="cv-contact-card">
                  <span className="cv-contact-icon">{c.icon}</span>
                  <div>
                    <p className="cv-contact-label">{c.label}</p>
                    <p className="cv-contact-value">{c.value}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
