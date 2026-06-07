"use client";

import { useState } from "react";
import Link from "next/link";

// ====================================================================
// DỮ LIỆU CV — Chỉnh sửa tại đây để cập nhật thông tin thực tế
// ====================================================================
const CV_DATA = {
  vi: {
    name: "Minh Tú Luc",
    role: "Kỹ sư Phần mềm Full-stack",
    summary:
      "Kỹ sư Phần mềm với hơn 3 năm kinh nghiệm thực tiễn trong việc kiến trúc và triển khai các hệ thống web hiệu năng cao, phần mềm desktop quản trị và thiết bị nhúng IoT. Đam mê theo đuổi triết lý thiết kế tối giản của Apple, tập trung tối ưu hóa kiến trúc hệ thống, giảm thiểu độ trễ (latency reduction), và tối đa hóa trải nghiệm người dùng thông qua việc làm chủ toàn diện vòng đời phát triển sản phẩm từ phần cứng đến phần mềm.",
    stats: [
      { number: "3+", label: "Năm kinh nghiệm" },
      { number: "10+", label: "Dự án triển khai" },
      { number: "6", label: "Công nghệ cốt lõi" },
    ],
    experience: [
      {
        title: "Kỹ sư Full-stack Web & Mobile",
        company: "Nền tảng E-commerce OmniMart · Đội ngũ phát triển lõi",
        period: "2024 – Hiện tại",
        bullets: [
          "Tái cấu trúc (Architected) toàn bộ giao diện WebClient và WebAdmin, chuyển đổi mô hình CSS nội tuyến sang hệ thống Vanilla CSS có kiểm soát với Media Queries, đảm bảo khả năng tương thích 100% trên các thiết bị di động.",
          "Thiết kế và triển khai hệ thống Toast Notification phi đồng bộ sử dụng Framer Motion, loại bỏ hoàn toàn các luồng cảnh báo chặn (thread-blocking alerts) của trình duyệt gốc, tăng cường tính mượt mà trong tương tác.",
          "Cài đặt cơ chế Skeleton Shimmer Loaders nhằm mô phỏng trực quan luồng tải dữ liệu, giúp cải thiện 40% thời gian tải trang cảm nhận (Perceived Load Time).",
          "Phát triển kiến trúc phân quyền người dùng (Guest/VIP), logic áp dụng mã giảm giá và quy trình thanh toán động đa tùy chọn.",
          "Kỹ nghệ hóa (Engineered) các API bảo mật thời gian thực phục vụ cập nhật trạng thái đơn hàng cho nhân viên giao hàng và chăm sóc khách hàng, đồng bộ hóa thông qua Supabase."
        ],
      },
      {
        title: "Kỹ sư Hệ thống Nhúng & IoT",
        company: "Dự án Smart Greeter · Nghiên cứu & Phát triển",
        period: "2023 – 2024",
        bullets: [
          "Thiết kế kiến trúc phần cứng và vi chương trình cho thiết bị trợ lý đón khách độc lập vận hành trên hệ thống trên chip (SoC) ESP32-S3.",
          "Ứng dụng hệ điều hành thời gian thực FreeRTOS để thiết lập cơ chế xử lý đa luồng (Multi-threading), cô lập tiến trình giải mã hình ảnh Animated GIF (TFT_eSPI) và tiến trình phát luồng âm thanh MP3 (I2S MAX98357A), loại bỏ hoàn toàn hiện tượng nghẽn cổ chai (bottleneck) và giật hình.",
          "Tích hợp module radar sóng milimet (LD2410C) và cảm biến môi trường (DHT22) để cấu trúc nên cơ chế quản lý trạng thái hiển thị tự động, giảm thiểu mức tiêu thụ điện năng tĩnh dựa trên thuật toán phát hiện hiện diện con người thời gian thực."
        ],
      },
      {
        title: "Kỹ sư Phát triển Phần mềm Desktop",
        company: "Hệ thống Quản trị Nhân sự · Java Desktop Application",
        period: "2022 – 2023",
        bullets: [
          "Phát triển nền tảng ứng dụng máy tính an toàn phục vụ quản trị nhân sự bằng kiến trúc Java Swing, giao tiếp dữ liệu trực tiếp với MySQL thông qua JDBC.",
          "Thực hiện quyết định kiến trúc: loại bỏ thư viện tùy biến giao diện FlatLaf để quay về giao diện nguyên bản của hệ điều hành (Native System Look & Feel). Thao tác này giúp lược bỏ các bộ lọc đổ bóng và bo góc đồ họa thừa thãi, hệ quả là giảm thiểu 30% mức tiêu thụ vùng nhớ Heap (memory footprint) và tăng tốc độ phản hồi giao diện.",
          "Thiết kế cơ chế CRUD quản trị và thuật toán lọc dữ liệu nâng cao thời gian thực tuân thủ nghiêm ngặt mẫu thiết kế MVC."
        ],
      },
    ],
    projects: [
      {
        title: "Dự án Nguồn mở / Cá nhân",
        company: "Low Budget Snake · C++ Console Game",
        period: "2026",
        bullets: [
          "Kỹ nghệ hóa tựa game Rắn săn mồi trên giao diện dòng lệnh (Console) bằng C++ thuần.",
          "Thiết kế kiến trúc vòng lặp game phi đồng bộ (Non-blocking I/O) kết hợp cấu trúc dữ liệu hàng đợi (Queue) để giải quyết triệt để vấn đề phân mảnh vùng nhớ (Memory Fragmentation)."
        ],
      }
    ],
    education: [
      {
        title: "Kỹ sư Công nghệ Thông tin",
        company: "Đại học Bách Khoa TP.HCM (HCMUT)",
        period: "2018 – 2022",
        desc: "Chuyên ngành Hệ thống Thông tin. Tốt nghiệp loại Giỏi — GPA 3.4/4.0.",
      },
    ],
    skills: [
      {
        category: "Frontend",
        type: "frontend",
        items: ["Next.js", "React", "TypeScript", "Vanilla CSS", "GSAP", "HTML5 Canvas", "Figma to Code"],
      },
      {
        category: "Backend & DB",
        type: "backend",
        items: ["Node.js", "Express", "PostgreSQL", "Prisma", "Supabase", "MySQL", "JDBC", "GraphQL", "REST API"],
      },
      {
        category: "Nhúng & IoT",
        type: "embedded",
        items: ["ESP32-S3", "FreeRTOS", "TFT_eSPI", "AnimatedGIF", "MAX98357A (I2S)", "LD2410C (Radar)", "C/C++"],
      },
      {
        category: "DevOps & Tools",
        type: "devops",
        items: ["Git", "GitHub Actions", "Vercel", "Docker", "Linux", "Nginx"],
      },
      {
        category: "Thiết kế & Khác",
        type: "design",
        items: ["Figma", "UI/UX Principles", "Design Systems", "Responsive Design", "Apple Design Philosophy"],
      },
    ],
    languages: [
      { name: "Tiếng Việt", level: "Tiếng mẹ đẻ", pct: 100 },
      { name: "Tiếng Anh", level: "B2 – Thành thạo chuyên ngành", pct: 75 },
      { name: "Tiếng Nhật", level: "N4 – Giao tiếp cơ bản", pct: 30 },
    ],
    certs: [
      { icon: "🏆", title: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services · 2023" },
      { icon: "📜", title: "Google UX Design Professional Certificate", issuer: "Google / Coursera · 2022" },
      { icon: "⭐", title: "Meta Front-End Developer Professional Certificate", issuer: "Meta / Coursera · 2021" },
    ],
    contact: [
      { icon: "✉️", label: "Email", value: "tuminhluc@gmail.com", href: "mailto:tuminhluc@gmail.com" },
      { icon: "💻", label: "GitHub", value: "github.com/minhtuluc", href: "https://github.com/minhtuluc" },
      { icon: "🔗", label: "LinkedIn", value: "linkedin.com/in/minhtuluc", href: "https://linkedin.com" },
      { icon: "📍", label: "Địa điểm", value: "TP. Hà Nội, Việt Nam", href: null },
    ],
  },

  en: {
    name: "Minh Tú Luc",
    role: "Full-stack Software Engineer",
    summary:
      "A software engineer with over 3 years of hands-on experience in architecting and implementing high-performance web systems, administrative desktop software, and embedded IoT devices. Profoundly inspired by Apple's minimalist design philosophy, I focus on optimizing system architectures, reducing latency, and maximizing user experience through comprehensive mastery of the product development lifecycle from hardware to software.",
    stats: [
      { number: "3+", label: "Years of experience" },
      { number: "10+", label: "Deployed projects" },
      { number: "6", label: "Core technologies" },
    ],
    experience: [
      {
        title: "Full-stack Web & Mobile Engineer",
        company: "OmniMart E-commerce Platform · Core Dev Team",
        period: "2024 – Present",
        bullets: [
          "Architected and refactored the WebClient and WebAdmin UI layouts, migrating from inline styles to a centralized Vanilla CSS system with media queries, ensuring 100% mobile-responsive compatibility.",
          "Designed and implemented an asynchronous Toast Notification system utilizing Framer Motion, completely eliminating native thread-blocking browser alerts to significantly improve interaction fluidity.",
          "Engineered Shimmer Skeleton loaders for visual representation during asynchronous data fetching, yielding a 40% improvement in Perceived Load Time.",
          "Developed a scalable user classification architecture (Guest/VIP membership), voucher-applying business logic, and dynamic multi-option checkout workflows.",
          "Architected secure, real-time status update endpoints for delivery personnel and customer support staff, synchronized via Supabase integrations."
        ],
      },
      {
        title: "Embedded Systems & IoT Engineer",
        company: "Smart Greeter Project · R&D",
        period: "2023 – 2024",
        bullets: [
          "Designed PCB architectures and programmed firmware for a standalone Smart Greeter device operating on the ESP32-S3 System on a Chip (SoC).",
          "Leveraged the FreeRTOS real-time operating system to establish a multi-threading mechanism, effectively isolating the Animated GIF decoding process (TFT_eSPI) from the MP3 audio streaming process (I2S MAX98357A), entirely eliminating bottlenecking and visual stuttering.",
          "Integrated a millimetre-wave radar module (LD2410C) and environmental sensor (DHT22) to architect an automated backlight state management system, minimizing idle power consumption based on a real-time human presence detection algorithm."
        ],
      },
      {
        title: "Desktop Software Engineer",
        company: "Employee Management System · Java Desktop Application",
        period: "2022 – 2023",
        bullets: [
          "Developed a secure human resources management desktop platform using the Java Swing architecture, facilitating direct data communication with MySQL via JDBC.",
          "Executed a critical architectural decision: deprecating the custom FlatLaf UI library in favor of the Native System Look & Feel. This eliminated redundant drop-shadow filters and rounded corners, resulting in a 30% reduction in heap memory footprint and enhanced UI responsiveness.",
          "Architected administrative CRUD mechanisms and real-time advanced data filtering algorithms in strict adherence to the MVC design pattern."
        ],
      },
    ],
    projects: [
      {
        title: "Open Source / Personal Project",
        company: "Low Budget Snake · C++ Console Game",
        period: "2026",
        bullets: [
          "Engineered a classic Snake game on the command-line interface (Console) using pure C++.",
          "Designed an asynchronous Game Loop architecture (Non-blocking I/O) combined with Queue data structures to completely resolve memory fragmentation issues."
        ],
      }
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
        category: "Backend & DB",
        type: "backend",
        items: ["Node.js", "Express", "PostgreSQL", "Prisma", "Supabase", "MySQL", "JDBC", "GraphQL", "REST API"],
      },
      {
        category: "Embedded & IoT",
        type: "embedded",
        items: ["ESP32-S3", "FreeRTOS", "TFT_eSPI", "AnimatedGIF", "MAX98357A (I2S)", "LD2410C (Radar)", "C/C++"],
      },
      {
        category: "DevOps & Tools",
        type: "devops",
        items: ["Git", "GitHub Actions", "Vercel", "Docker", "Linux", "Nginx"],
      },
      {
        category: "Design & Other",
        type: "design",
        items: ["Figma", "UI/UX Principles", "Design Systems", "Responsive Design", "Apple Design Philosophy"],
      },
    ],
    languages: [
      { name: "Vietnamese", level: "Native speaker", pct: 100 },
      { name: "English", level: "B2 – Professional proficiency", pct: 75 },
      { name: "Japanese", level: "N4 – Basic conversational", pct: 30 },
    ],
    certs: [
      { icon: "🏆", title: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services · 2023" },
      { icon: "📜", title: "Google UX Design Professional Certificate", issuer: "Google / Coursera · 2022" },
      { icon: "⭐", title: "Meta Front-End Developer Professional Certificate", issuer: "Meta / Coursera · 2021" },
    ],
    contact: [
      { icon: "✉️", label: "Email", value: "tuminhluc@gmail.com", href: "mailto:tuminhluc@gmail.com" },
      { icon: "💻", label: "GitHub", value: "github.com/minhtuluc", href: "https://github.com/minhtuluc" },
      { icon: "🔗", label: "LinkedIn", value: "linkedin.com/in/minhtuluc", href: "https://linkedin.com" },
      { icon: "📍", label: "Location", value: "Hanoi, Vietnam", href: null },
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
          <div className="cv-avatar" style={{ fontSize: 0 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white"/>
            </svg>
          </div>
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

        {/* ── Dự án Cá nhân ── */}
        {cv.projects && (
          <section className="cv-section">
            <p className="cv-section-label">
              {lang === "vi" ? "Dự án Nguồn mở" : "Open Source"}
            </p>
            <h2 className="cv-section-title">
              {lang === "vi" ? "Dự án Cá nhân tiêu biểu" : "Notable Personal Projects"}
            </h2>
            <div className="cv-timeline">
              {cv.projects.map((item, i) => (
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
                </div>
              ))}
            </div>
          </section>
        )}

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
