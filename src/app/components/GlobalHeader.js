"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function GlobalHeader() {
  const [activeDropdown, setActiveDropdown] = useState(null); // null, 'blog', 'portfolio', 'cv'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = (menu) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // Trì hoãn 200ms để tránh việc menu đóng ngay khi người dùng di chuột giữa header và panel
  };

  const handleClose = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveDropdown(null);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="global-header-wrapper"
      onMouseLeave={handleMouseLeave}
      style={{ position: "sticky", top: 0, zIndex: 1000, width: "100%" }}
    >
      {/* 1. Header Navigation gốc */}
      <header className="global-nav">
        <div className="global-nav-container">
          <Link href="/" className="global-nav-logo" onClick={handleClose}>
            <span style={{ letterSpacing: "-0.5px", fontWeight: 600 }}>MTL Studio</span>
          </Link>
          <nav>
            <ul className="global-nav-links">
              <li>
                <Link
                  href="/"
                  onMouseEnter={() => handleMouseEnter(null)}
                  onClick={handleClose}
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  onMouseEnter={() => handleMouseEnter("blog")}
                  onClick={handleClose}
                  style={{
                    color: activeDropdown === "blog" ? "var(--color-on-dark)" : "var(--color-body-muted)",
                  }}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  onMouseEnter={() => handleMouseEnter("portfolio")}
                  onClick={handleClose}
                  style={{
                    color: activeDropdown === "portfolio" ? "var(--color-on-dark)" : "var(--color-body-muted)",
                  }}
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/cv"
                  onMouseEnter={() => handleMouseEnter("cv")}
                  onClick={handleClose}
                  style={{
                    color: activeDropdown === "cv" ? "var(--color-on-dark)" : "var(--color-body-muted)",
                  }}
                >
                  CV
                </Link>
              </li>
            </ul>
          </nav>
          {/* Nút Call to Action bên phải */}
          <Link
            href="/portfolio#projects"
            className="button-primary global-nav-cta"
            style={{ padding: "4px 12px", fontSize: "12px" }}
            onClick={handleClose}
            onMouseEnter={() => handleMouseEnter(null)}
          >
            Dự án
          </Link>
          <button 
            className="mobile-menu-toggle"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setActiveDropdown(null);
            }}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-nav-menu ${isMobileMenuOpen ? "is-open" : ""}`}>
        <ul>
          <li><Link href="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Trang chủ</Link></li>
          <li><Link href="/blog" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link></li>
          <li><Link href="/portfolio" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link></li>
          <li><Link href="/cv" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>CV / Hồ sơ</Link></li>
          <li style={{ borderBottom: "none", marginTop: "32px" }}>
            <Link href="/portfolio#projects" className="button-primary" style={{ display: "flex", width: "100%", padding: "14px", fontSize: "18px", justifyContent: "center" }} onClick={() => setIsMobileMenuOpen(false)}>
              Xem Dự án
            </Link>
          </li>
        </ul>
      </div>

      {/* 2. Mega Dropdown Panel */}
      <div 
        className={`mega-dropdown-panel ${activeDropdown ? "is-active" : ""}`}
        onMouseEnter={() => {
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
          }
        }}
      >
        <div className="mega-dropdown-container">
          {activeDropdown === "blog" && (
            <>
              {/* Cột 1: Chủ đề bài viết */}
              <div className="mega-dropdown-col">
                <span className="mega-dropdown-col-title">Chủ đề bài viết</span>
                <Link href="/blog/thiet-ke-apple-toi-gian" className="mega-dropdown-link-primary" onClick={handleClose}>
                  Nghệ thuật Tối giản
                </Link>
                <Link href="/blog/tai-sao-nextjs-la-tuong-lai" className="mega-dropdown-link-primary" onClick={handleClose}>
                  Next.js Fullstack
                </Link>
                <Link href="/blog/xay-dung-portfolio-thu-hut" className="mega-dropdown-link-primary" onClick={handleClose}>
                  Portfolio Ấn tượng
                </Link>
              </div>

              {/* Cột 2: Bài viết nổi bật */}
              <div className="mega-dropdown-col">
                <span className="mega-dropdown-col-title">Bài viết tiêu biểu</span>
                <Link href="/blog/thiet-ke-apple-toi-gian" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  Phân tích phong cách giao diện Apple
                </Link>
                <Link href="/blog/tai-sao-nextjs-la-tuong-lai" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  Ứng dụng Server Components & Actions
                </Link>
                <Link href="/blog/xay-dung-portfolio-thu-hut" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  Bí quyết thu hút nhà tuyển dụng
                </Link>
              </div>

              {/* Cột 3: Liên kết nhanh */}
              <div className="mega-dropdown-col">
                <span className="mega-dropdown-col-title">Liên kết nhanh</span>
                <Link href="/blog" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  Tất cả bài viết
                </Link>
                <Link href="/blog" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  Kho lưu trữ (Archives)
                </Link>
                <a href="mailto:contact@example.com" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  Gửi yêu cầu bài viết
                </a>
              </div>
            </>
          )}

          {activeDropdown === "portfolio" && (
            <>
              {/* Cột 1: Khám phá dự án */}
              <div className="mega-dropdown-col">
                <span className="mega-dropdown-col-title">Dự án của tôi</span>
                <Link href="/portfolio/solar-system" className="mega-dropdown-link-primary" onClick={handleClose}>
                  Hệ Mặt Trời 2D
                </Link>
                <Link href="/portfolio#projects" className="mega-dropdown-link-primary" onClick={handleClose}>
                  EcoStore E-commerce
                </Link>
                <Link href="/portfolio#projects" className="mega-dropdown-link-primary" onClick={handleClose}>
                  SpaceExplorer HTML5 Game
                </Link>
                <Link href="/portfolio#projects" className="mega-dropdown-link-primary" onClick={handleClose}>
                  AssistantAI Chatbot
                </Link>
              </div>

              {/* Cột 2: Kỹ năng nổi bật */}
              <div className="mega-dropdown-col">
                <span className="mega-dropdown-col-title">Kỹ năng chuyên môn</span>
                <Link href="/portfolio" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  Next.js App Router & Edge API
                </Link>
                <Link href="/portfolio" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  Database (PostgreSQL & Prisma)
                </Link>
                <Link href="/portfolio/solar-system" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  HTML5 Canvas & Vector Math
                </Link>
                <Link href="/" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  GSAP Timeline & ScrollTrigger
                </Link>
              </div>

              {/* Cột 3: Kết nối & Tài nguyên */}
              <div className="mega-dropdown-col">
                <span className="mega-dropdown-col-title">Kết nối & Tài nguyên</span>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  Trang cá nhân GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  Hồ sơ LinkedIn
                </a>
                <a href="mailto:contact@example.com" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  Gửi thư hợp tác (Email)
                </a>
              </div>
            </>
          )}
          {activeDropdown === "cv" && (
            <>
              {/* Cột 1: Nội dung CV */}
              <div className="mega-dropdown-col">
                <span className="mega-dropdown-col-title">Hồ sơ năng lực</span>
                <Link href="/cv" className="mega-dropdown-link-primary" onClick={handleClose}>
                  Xem CV đầy đủ
                </Link>
                <Link href="/cv#experience" className="mega-dropdown-link-primary" onClick={handleClose}>
                  Kinh nghiệm làm việc
                </Link>
                <Link href="/cv#skills" className="mega-dropdown-link-primary" onClick={handleClose}>
                  Kỹ năng kỹ thuật
                </Link>
              </div>

              {/* Cột 2: Thông tin nhanh */}
              <div className="mega-dropdown-col">
                <span className="mega-dropdown-col-title">Thông tin nhanh</span>
                <Link href="/cv" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  🇻🇳 Phiên bản Tiếng Việt
                </Link>
                <Link href="/cv" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  🇬🇧 English Version
                </Link>
                <Link href="/cv" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  🖨 In / Xuất PDF
                </Link>
              </div>

              {/* Cột 3: Liên kết */}
              <div className="mega-dropdown-col">
                <span className="mega-dropdown-col-title">Kết nối</span>
                <a href="https://github.com/minhtuluc" target="_blank" rel="noopener noreferrer" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  GitHub Profile
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  LinkedIn Profile
                </a>
                <a href="mailto:tuminhluc@gmail.com" className="mega-dropdown-link-secondary" onClick={handleClose}>
                  Gửi Email liên hệ
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 3. Nền tối mờ phía dưới (Backdrop overlay) */}
      <div 
        className={`mega-dropdown-overlay ${activeDropdown ? "is-active" : ""}`}
        onClick={handleClose}
      />
    </div>
  );
}
