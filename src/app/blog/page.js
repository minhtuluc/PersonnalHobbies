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
      description: "Phân tích cách Apple sử dụng khoảng trắng, typography và màu Action Blue để tôn vinh hình ảnh sản phẩm.",
      date: "06 Tháng 6, 2026",
      readTime: "5 phút đọc"
    },
    {
      id: 2,
      slug: "tai-sao-nextjs-la-tuong-lai",
      title: "Tại sao Next.js là tương lai của ứng dụng Full-stack React?",
      description: "Sự kết hợp hoàn hảo giữa Server Components, Server Actions và khả năng SEO vượt trội giúp Next.js dẫn đầu xu hướng.",
      date: "01 Tháng 6, 2026",
      readTime: "7 phút đọc"
    },
    {
      id: 3,
      slug: "xay-dung-portfolio-thu-hut",
      title: "Bí quyết xây dựng một Portfolio thu hút nhà tuyển dụng",
      description: "Cách trình bày dự án, kinh nghiệm và demo công nghệ trực quan giúp bạn nổi bật trong mắt các nhà tuyển dụng công nghệ.",
      date: "25 Tháng 5, 2026",
      readTime: "4 phút đọc"
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
      {/* Sub Navigation (Sticky under Global Nav) */}
      <nav className="sub-nav-frosted">
        <div className="sub-nav-container">
          <span className="sub-nav-title">Blog của tôi</span>
          <ul className="sub-nav-links">
            <li>
              <Link href="/blog" className="body-strong" style={{ color: "var(--color-primary)" }}>
                Bài viết mới nhất
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="caption">
                Portfolio
              </Link>
            </li>
          </ul>
        </div>
      </nav>

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
