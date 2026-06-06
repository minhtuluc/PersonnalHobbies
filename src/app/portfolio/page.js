import Link from "next/link";

export const metadata = {
  title: "Portfolio - Minh Tú Luc",
  description: "Trưng bày các dự án, sản phẩm phần mềm và demo công nghệ cá nhân.",
};

const projects = [
  {
    id: 1,
    title: "EcoStore - Ứng dụng E-commerce",
    tagline: "Hệ thống bán hàng tối giản và hiệu suất cao.",
    description: "Xây dựng trên Next.js App Router và Prisma. Tích hợp thanh toán Stripe trực tuyến, tối ưu hóa tốc độ tải trang chỉ dưới 1.2s.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Stripe"],
    link: "https://github.com/minhtuluc/ecostore"
  },
  {
    id: 2,
    title: "SpaceExplorer - Game HTML5",
    tagline: "Trải nghiệm thám hiểm không gian trên nền web.",
    description: "Một tựa game 2D bắn phi thuyền cổ điển phát triển bằng Phaser3, tối ưu đồ họa canvas và kết nối realtime qua Socket.io.",
    tech: ["HTML5 Canvas", "Phaser3", "NodeJS", "Socket.io"],
    link: "https://github.com/minhtuluc/space-explorer"
  },
  {
    id: 3,
    title: "AssistantAI - Chatbot thông minh",
    tagline: "Trình trợ lý ảo hỗ trợ trả lời văn bản thời gian thực.",
    description: "Demo tích hợp mô hình ngôn ngữ lớn thông qua Edge Runtime của Next.js, stream dữ liệu trực tiếp từ API Gemini.",
    tech: ["Next.js", "Edge Runtime", "Gemini API", "SSE"],
    link: "https://github.com/minhtuluc/assistant-ai"
  }
];

export default function PortfolioPage() {
  return (
    <div className="main-content">
      {/* Sub-Nav */}
      <nav className="sub-nav-frosted">
        <div className="sub-nav-container">
          <span className="sub-nav-title">Portfolio</span>
          <ul className="sub-nav-links">
            <li>
              <Link href="/blog" className="caption">
                Xem Blog
              </Link>
            </li>
            <li>
              <a href="#projects" className="body-strong" style={{ color: "var(--color-primary)" }}>
                Dự án nổi bật
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="product-tile product-tile-dark">
        <div className="tile-content">
          <span className="tagline" style={{ color: "var(--color-primary-on-dark)", marginBottom: "var(--spacing-xs)" }}>
            Sản phẩm & Nghiên cứu
          </span>
          <h1 className="hero-display" style={{ color: "var(--color-body-on-dark)", marginBottom: "var(--spacing-sm)" }}>
            Ý tưởng thành sản phẩm.
          </h1>
          <p className="lead" style={{ color: "var(--color-body-muted)", maxWidth: "600px", margin: "0 auto", fontWeight: "300" }}>
            Trưng bày các dự án mã nguồn mở, sản phẩm thực tế và các demo thử nghiệm công nghệ của tôi.
          </p>
        </div>
      </section>

      {/* Grid of Projects */}
      <section id="projects" style={{ backgroundColor: "var(--color-canvas)" }}>
        <div className="grid-container">
          <h2 className="display-md" style={{ color: "var(--color-ink)", marginBottom: "var(--spacing-lg)" }}>
            Dự án đã thực hiện
          </h2>
          
          <div className="card-grid">
            {projects.map((project) => (
              <div key={project.id} className="store-card">
                <div className="card-image-box">
                  <span style={{ fontSize: "32px" }}>
                    {project.id === 1 ? "🛍️" : project.id === 2 ? "🚀" : "🤖"}
                  </span>
                </div>
                <div className="caption" style={{ color: "var(--color-primary)", fontWeight: "600", marginBottom: "var(--spacing-xxs)" }}>
                  {project.tagline}
                </div>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "var(--spacing-md)" }}>
                  {project.tech.map((t) => (
                    <span 
                      key={t} 
                      className="caption" 
                      style={{ 
                        backgroundColor: "var(--color-canvas-parchment)", 
                        color: "var(--color-ink-muted-80)", 
                        padding: "2px 8px", 
                        borderRadius: "var(--radius-xs)",
                        fontSize: "11px"
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="button-primary"
                  style={{ alignSelf: "flex-start", marginTop: "auto", width: "100%" }}
                >
                  Chi tiết dự án
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
