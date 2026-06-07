import Link from "next/link";

// Mock data to simulate DB query (or fetching from API)
async function getPosts() {
  // In a real app, you could call: const res = await fetch('http://localhost:3000/api/posts');
  // For skeleton simplicity, we return local mock data directly.
  return [
    {
      id: 1,
      slug: "thiet-ke-apple-toi-gian",
      title: "Nghệ thuật tối giản trong thiết kế giao diện của Apple",
      description: "Abstract: Phân tích cơ sở lý thuyết về thiết kế lấy sản phẩm làm trung tâm (Product-centric Design). Đánh giá tác động của khoảng trắng (Whitespace), cấu trúc đồ họa chữ (Typography) và đơn sắc điều hướng (Action Blue) đến khả năng tập trung nhận thức của người dùng.",
      date: "06 Tháng 6, 2026",
      readTime: "5 phút đọc"
    },
    {
      id: 2,
      slug: "xay-dung-smart-greeter-esp32",
      title: "Lập trình đa nhiệm FreeRTOS cho ESP32-S3: Hiển thị GIF và phát âm thanh song song",
      description: "Abstract: Nghiên cứu phương pháp cấp phát tài nguyên vi điều khiển thông qua hệ điều hành thời gian thực FreeRTOS. Đề xuất kiến trúc luồng xử lý phi nghẽn (Non-blocking Architecture) nhằm đồng bộ hóa dữ liệu I2S Audio và TFT Rendering trên chip lõi kép.",
      date: "04 Tháng 6, 2026",
      readTime: "9 phút đọc"
    },
    {
      id: 3,
      slug: "tai-sao-nextjs-la-tuong-lai",
      title: "Tại sao Next.js là tương lai của ứng dụng Full-stack React?",
      description: "Abstract: Đánh giá quá trình chuyển dịch mô hình tính toán từ Client-side Rendering (CSR) sang kiến trúc Hybrid (SSR/SSG/ISR). Phân tích lợi ích cơ sở hạ tầng khi kết hợp Server Components và API Serverless.",
      date: "01 Tháng 6, 2026",
      readTime: "7 phút đọc"
    },
    {
      id: 4,
      slug: "toi-uu-ui-ux-react-framer-motion",
      title: "Tối ưu hóa UI/UX React: Từ Native Alert đến Framer Motion Toasts & Shimmer Skeletons",
      description: "Abstract: Áp dụng các nguyên lý tâm lý học nhận thức (Cognitive Psychology) để tối ưu hóa thời gian tải cảm nhận (Perceived Load Time). Phân tích hiệu năng của hệ thống phản hồi thị giác phi đồng bộ so với các cơ chế chặn luồng (Thread-blocking) truyền thống.",
      date: "28 Tháng 5, 2026",
      readTime: "6 phút đọc"
    },
    {
      id: 5,
      slug: "xay-dung-portfolio-thu-hut",
      title: "Bí quyết xây dựng một Portfolio thu hút nhà tuyển dụng",
      description: "Abstract: Phân tích quy trình đánh giá ứng viên của các kỹ sư tuyển dụng (Hiring Managers). Đề xuất mô hình trình bày thông tin định lượng kết hợp trực quan hóa dữ liệu (Data Visualization) nhằm gia tăng hiệu suất chuyển đổi (Conversion Rate) trong quá trình ứng tuyển.",
      date: "25 Tháng 5, 2026",
      readTime: "4 phút đọc"
    },
    {
      id: 6,
      slug: "triet-ly-swing-look-and-feel",
      title: "Triết lý tối giản: Khi Java Swing rũ bỏ FlatLaf quay về System Look & Feel nguyên bản",
      description: "Abstract: Luận giải quyết định kiến trúc lược bỏ thư viện tùy chỉnh giao diện người dùng. Đánh giá tác động định lượng đến không gian vùng nhớ (Memory Footprint) và chi phí kết xuất đồ họa (Rendering Overhead) trong các hệ thống Desktop Client hạng nhẹ.",
      date: "20 Tháng 5, 2026",
      readTime: "5 phút đọc"
    }
  ];
}

export const metadata = {
  title: "Blog cá nhân - Minh Tú Luc",
  description: "Nơi chia sẻ những bài viết về công nghệ, thiết kế UI/UX và hành trình lập trình.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="main-content">


      {/* Hero Section */}
      <section className="product-tile product-tile-parchment">
        <div className="tile-content">
          <h1 className="hero-display" style={{ color: "var(--color-ink)", marginBottom: "var(--spacing-sm)" }}>
            Chia sẻ & Góc nhìn.
          </h1>
          <p className="lead" style={{ color: "var(--color-ink-muted-80)", maxWidth: "600px", margin: "0 auto" }}>
            Nơi tôi lưu giữ hành trình nghiên cứu công nghệ, lập trình và những bài học thiết kế giao diện tinh tế.
          </p>
        </div>
      </section>

      {/* Articles Grid Section */}
      <section style={{ backgroundColor: "var(--color-canvas)" }}>
        <div className="grid-container">
          <h2 className="display-md" style={{ color: "var(--color-ink)", marginBottom: "var(--spacing-lg)" }}>
            Tất cả bài viết ({posts.length})
          </h2>
          
          <div className="card-grid">
            {posts.map((post) => (
              <article key={post.id} className="store-card">
                <div className="card-image-box">
                  <span className="caption">📝 {post.readTime}</span>
                </div>
                <div className="caption" style={{ color: "var(--color-ink-muted-48)", marginBottom: "var(--spacing-xxs)" }}>
                  {post.date}
                </div>
                <h3 className="card-title">{post.title}</h3>
                <p className="card-desc">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="button-primary" style={{ alignSelf: "flex-start", marginTop: "auto" }}>
                  Đọc tiếp
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
