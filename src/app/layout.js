import { Inter } from "next/font/google";
import GlobalHeader from "./components/GlobalHeader";
import Link from "next/link";
import "./globals.css";

// next/font/google: tự-hosting, zero external request, zero CLS, preloaded tối ưu
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Trang chủ - Minh Tú Luc",
  description:
    "Trang cá nhân & Portfolio phát triển trên Next.js theo phong cách thiết kế tối giản của Apple.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`layout-container ${inter.variable}`}>
      <body>
        <div className="layout-container">
          {/* Global Navigation (Persistent at top) */}
          <GlobalHeader />

          {/* Main Content Areas */}
          {children}

          {/* Footer Classic (Apple style) */}
          <footer className="footer-classic">
            <div className="footer-container">
              {/* Footer Links Grid */}
              <div className="footer-links-grid">
                <div>
                  <h4 className="footer-col-title">Về tôi</h4>
                  <ul className="footer-links-list">
                    <li><Link href="/">Giới thiệu bản thân</Link></li>
                    <li><Link href="/cv">Hồ sơ năng lực (CV)</Link></li>
                    <li><Link href="/portfolio">Các công nghệ sử dụng</Link></li>
                    <li><Link href="/portfolio#projects">Dự án mã nguồn mở</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="footer-col-title">Khám phá</h4>
                  <ul className="footer-links-list">
                    <li><Link href="/blog">Bài viết lập trình</Link></li>
                    <li><Link href="/blog/thiet-ke-apple-toi-gian">Thiết kế Apple style</Link></li>
                    <li><Link href="/blog/tai-sao-nextjs-la-tuong-lai">Framework Next.js</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="footer-col-title">Liên hệ</h4>
                  <ul className="footer-links-list">
                    <li><a href="mailto:tuminhtuluc@example.com">Email của tôi</a></li>
                    <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="footer-col-title">Công nghệ xây dựng</h4>
                  <ul className="footer-links-list">
                    <li style={{ color: "var(--color-ink-muted-48)" }}>React v19</li>
                    <li style={{ color: "var(--color-ink-muted-48)" }}>Next.js v16</li>
                    <li style={{ color: "var(--color-ink-muted-48)" }}>Vanilla CSS</li>
                  </ul>
                </div>
              </div>

              {/* Footer Legal Row */}
              <div className="footer-legal">
                <span>Bản quyền © 2026 Minh Tú Luc. Đã đăng ký bản quyền.</span>
                <div>
                  <span style={{ marginRight: "10px" }}>Thiết kế lấy cảm hứng từ Apple Inc.</span>
                  <span>Phát triển bằng Next.js Full-stack</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
