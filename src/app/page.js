import Link from "next/link";
import EarthHero from "./components/EarthHero";

export default function Home() {
  return (
    <div className="main-content">
      {/* 1. Màn chào đầu Fullscreen Earth Zoom */}
      <EarthHero />



      {/* Hero Section: Product Tile Light */}
      <section className="product-tile product-tile-light">
        <div className="tile-content">
          <h1 className="hero-display" style={{ color: "var(--color-ink)", marginBottom: "var(--spacing-sm)" }}>
            Minh Tú Luc.
          </h1>
          <p className="lead" style={{ color: "var(--color-ink-muted-80)", marginBottom: "var(--spacing-md)", fontWeight: "300" }}>
            Kỹ sư phần mềm Full-stack & Người đam mê thiết kế tối giản.
          </p>
          <p className="caption" style={{ color: "var(--color-ink-muted-48)", maxWidth: "500px", margin: "0 auto var(--spacing-lg)" }}>
            Tôi xây dựng các sản phẩm web tinh tế, tối ưu hiệu suất và mang lại trải nghiệm người dùng cao cấp.
          </p>
          <div className="tile-actions">
            <Link href="/portfolio" className="button-primary button-large">
              Khám phá Portfolio
            </Link>
            <Link href="/blog" className="button-secondary button-large">
              Đọc Blog của tôi
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section: Product Tile Dark */}
      <section className="product-tile product-tile-dark">
        <div className="tile-content">
          <span className="tagline" style={{ color: "var(--color-primary-on-dark)", marginBottom: "var(--spacing-xs)" }}>
            Triết lý Phát triển
          </span>
          <h2 className="display-lg" style={{ color: "var(--color-body-on-dark)", marginBottom: "var(--spacing-sm)" }}>
            Tối giản. Chính xác. Hiệu quả.
          </h2>
          <p className="lead" style={{ color: "var(--color-body-muted)", maxWidth: "650px", margin: "0 auto var(--spacing-xl)", fontWeight: "300" }}>
            "Không có chi tiết nào là thừa thãi. Mọi dòng code, mọi khoảng cách và pixel đều phải phục vụ một mục đích duy nhất: Mang lại giá trị tốt nhất cho sản phẩm."
          </p>
          
          {/* Một khối mô phỏng thiết bị hoặc code demo có bóng đổ chuẩn Apple */}
          <div 
            className="product-image-container product-image-shadow" 
            style={{ 
              backgroundColor: "var(--color-surface-tile-2)",
              width: "100%",
              maxWidth: "600px",
              padding: "var(--spacing-xl)",
              borderRadius: "var(--radius-lg)",
              textAlign: "left",
              fontFamily: "Courier New, monospace",
              fontSize: "13px",
              color: "#a9b1d6",
              border: "1px solid rgba(255,255,255,0.05)"
            }}
          >
            <div style={{ display: "flex", gap: "6px", marginBottom: "var(--spacing-md)" }}>
              <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff5f56" }}></span>
              <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ffbd2e" }}></span>
              <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27c93f" }}></span>
            </div>
            <p style={{ color: "#7aa2f7" }}>{"const"} <span style={{ color: "#e0af68" }}>developer</span> = {"{"}</p>
            <p style={{ paddingLeft: "20px" }}>name: <span style={{ color: "#9ece6a" }}>"Minh Tu Luc"</span>,</p>
            <p style={{ paddingLeft: "20px" }}>role: <span style={{ color: "#9ece6a" }}>"Fullstack Engineer"</span>,</p>
            <p style={{ paddingLeft: "20px" }}>stack: [<span style={{ color: "#9ece6a" }}>"Next.js"</span>, <span style={{ color: "#9ece6a" }}>"React"</span>, <span style={{ color: "#9ece6a" }}>"Node.js"</span>],</p>
            <p style={{ paddingLeft: "20px" }}>philosophy: <span style={{ color: "#9ece6a" }}>"UI recedes so the product can speak"</span></p>
            <p>{"};"}</p>
          </div>
        </div>
      </section>

      {/* Featured Callout: Product Tile Parchment */}
      <section className="product-tile product-tile-parchment">
        <div className="tile-content">
          <h2 className="display-lg" style={{ color: "var(--color-ink)", marginBottom: "var(--spacing-sm)" }}>
            Bắt đầu khám phá.
          </h2>
          <p className="lead" style={{ color: "var(--color-ink-muted-80)", marginBottom: "var(--spacing-xl)", maxWidth: "550px", margin: "0 auto var(--spacing-xl)" }}>
            Tìm hiểu thêm về kỹ năng của tôi qua Portfolio hoặc cập nhật các bài viết mới tại Blog cá nhân.
          </p>
          
          <div style={{ display: "flex", gap: "var(--spacing-xl)", flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: "800px", marginTop: "var(--spacing-lg)" }}>
            <div className="store-card" style={{ flex: "1 1 300px", textAlign: "left", backgroundColor: "var(--color-canvas)" }}>
              <span style={{ fontSize: "28px", marginBottom: "var(--spacing-xs)", display: "block" }}>📝</span>
              <h3 className="card-title">Xem các Bài viết</h3>
              <p className="card-desc">Những phân tích chuyên sâu về lập trình Frontend, backend và thiết kế UI/UX theo phong cách hiện đại.</p>
              <Link href="/blog" className="button-primary" style={{ alignSelf: "flex-start" }}>
                Đến Blog
              </Link>
            </div>
            
            <div className="store-card" style={{ flex: "1 1 300px", textAlign: "left", backgroundColor: "var(--color-canvas)" }}>
              <span style={{ fontSize: "28px", marginBottom: "var(--spacing-xs)", display: "block" }}>💻</span>
              <h3 className="card-title">Xem các Dự án</h3>
              <p className="card-desc">Các sản phẩm demo công nghệ, mã nguồn mở và những dự án e-commerce hay game tôi đã phát triển.</p>
              <Link href="/portfolio" className="button-primary" style={{ alignSelf: "flex-start" }}>
                Đến Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
