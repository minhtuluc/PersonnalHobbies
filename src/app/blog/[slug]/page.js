import Link from "next/link";
import { notFound } from "next/navigation";

// Mock database query for a single post
async function getPostBySlug(slug) {
  const posts = {
    "thiet-ke-apple-toi-gian": {
      title: "Nghệ thuật tối giản trong thiết kế giao diện của Apple",
      date: "06 Tháng 6, 2026",
      readTime: "5 phút đọc",
      category: "UI/UX Design",
      content: `
        <p class="lead-airy" style="margin-bottom: var(--spacing-lg);">
          Tại sao giao diện của Apple lại tạo cảm giác sang trọng và đẳng cấp? Câu trả lời không nằm ở những chi tiết trang trí cầu kỳ, mà nằm ở triết lý thiết kế tối giản: UI recedes so the product can speak (Giao diện mờ nhạt để sản phẩm lên tiếng).
        </p>
        <p style="margin-bottom: var(--spacing-md);">
          Khi bạn truy cập vào website của Apple, điều đập vào mắt bạn đầu tiên là những tấm hình sản phẩm cực kỳ sắc nét, chiếm trọn vẹn khung hình (edge-to-edge product tiles). Giao diện web như biến mất, biến trang web thành một phòng triển lãm nghệ thuật nơi sản phẩm là các tác phẩm trưng bày duy nhất.
        </p>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          1. Một tông màu nhấn duy nhất: Action Blue (#0066cc)
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Apple không dùng nhiều màu thương hiệu trên các nút bấm. Họ chỉ sử dụng duy nhất một màu xanh Action Blue (#0066cc). Màu sắc này mang thông điệp rõ ràng và duy nhất: "Hãy click vào tôi". Tất cả liên kết, nút bấm chính đều mang màu sắc này, giúp người dùng không bao giờ bị rối mắt.
        </p>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          2. Khoảng trắng (Whitespace) là pedestal của sản phẩm
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Mỗi khu vực thông tin trên trang web của Apple đều có một khoảng thở rất lớn. Khoảng trắng xung quanh tiêu đề và hình ảnh giúp tâm trí người dùng tập trung hoàn toàn vào nội dung quan trọng mà không có bất kỳ yếu tố nhiễu nào. Họ tôn trọng sự chú ý của người xem.
        </p>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          3. Đồ họa chữ (Typography) chặt chẽ
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Bằng việc sử dụng phông chữ SF Pro Display với tracking (khoảng cách chữ) hơi âm ở kích thước hiển thị lớn, tiêu đề của Apple trông cực kỳ gọn gàng và có lực. Họ cũng thiết lập line-height rộng rãi cho phần văn bản đọc để người xem cảm nhận được nhịp điệu đọc chậm rãi, thư thái.
        </p>
      `
    },
    "tai-sao-nextjs-la-tuong-lai": {
      title: "Tại sao Next.js là tương lai của ứng dụng Full-stack React?",
      date: "01 Tháng 6, 2026",
      readTime: "7 phút đọc",
      category: "Web Development",
      content: `
        <p class="lead-airy" style="margin-bottom: var(--spacing-lg);">
          Từ một framework hỗ trợ Server-Side Rendering (SSR) ban đầu, Next.js đã chuyển mình mạnh mẽ để trở thành một hệ sinh thái Full-stack thực thụ nhờ sự ra đời của App Router và Server Components.
        </p>
        <p style="margin-bottom: var(--spacing-md);">
          Trước đây, lập trình viên React thường phải xây dựng hai ứng dụng độc lập: một SPA (Single Page Application) ở frontend bằng React/Vite, và một API Server ở backend bằng Express/NodeJS. Việc này dẫn đến việc nhân đôi cấu hình, phức tạp hóa khâu triển khai (deployment) và gặp nhiều vấn đề liên quan đến tối ưu hóa SEO.
        </p>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          1. Server-Side Rendering (SSR) & Static Site Generation (SSG) mặc định
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Blog hay Portfolio rất cần SEO để thu hút lượng truy cập tự nhiên từ Google. Nhờ Next.js render HTML hoàn chỉnh ngay trên máy chủ trước khi gửi về client, các bot tìm kiếm dễ dàng đọc nội dung bài viết hơn rất nhiều so với React SPA truyền thống.
        </p>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          2. API Routes và Server Actions
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Bạn không cần chạy một server Node riêng chỉ để làm một vài API gửi mail liên hệ hay lưu giỏ hàng. Next.js cung cấp API Routes ngay trong thư mục app. Ngoài ra, Server Actions còn cho phép bạn viết các hàm backend chạy trực tiếp trên server được kích hoạt từ các event của client React (như onSubmit form).
        </p>
      `
    },
    "xay-dung-portfolio-thu-hut": {
      title: "Bí quyết xây dựng một Portfolio thu hút nhà tuyển dụng",
      date: "25 Tháng 5, 2026",
      readTime: "4 phút đọc",
      category: "Career",
      content: `
        <p class="lead-airy" style="margin-bottom: var(--spacing-lg);">
          Portfolio không chỉ là nơi liệt kê danh sách dự án bạn từng làm. Nó là một sản phẩm thể hiện tư duy thiết kế, kỹ năng lập trình và khả năng giải quyết vấn đề của bạn.
        </p>
        <p style="margin-bottom: var(--spacing-md);">
          Một nhà tuyển dụng chỉ dành trung bình 30 giây đến 1 phút để lướt qua Portfolio của một ứng viên. Làm sao để giữ chân họ trong thời gian ngắn ngủi đó?
        </p>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          1. Trực quan hóa dự án với demo sống động
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Thay vì chỉ ghi đường link github, hãy cung cấp link deploy thật chạy trực tiếp, đính kèm ảnh chụp màn hình đẹp mắt hoặc video ngắn ghi lại quá trình vận hành của ứng dụng. Nhà tuyển dụng thích nhìn thấy sản phẩm thực tế hơn là code thô.
        </p>
      `
    }
  };

  return posts[slug] || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Không tìm thấy bài viết",
    };
  }

  return {
    title: `${post.title} - Blog cá nhân`,
    description: post.title,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="main-content" style={{ backgroundColor: "var(--color-canvas)" }}>


      {/* Article Container */}
      <article style={{ maxWidth: "680px", margin: "0 auto", padding: "var(--spacing-section) var(--spacing-lg)" }}>
        <header style={{ marginBottom: "var(--spacing-xxl)", textAlign: "center" }}>
          <div className="caption" style={{ color: "var(--color-ink-muted-48)", marginBottom: "var(--spacing-xs)" }}>
            Đăng ngày {post.date} • {post.readTime}
          </div>
          <h1 className="display-lg" style={{ color: "var(--color-ink)", marginBottom: "var(--spacing-md)", fontSize: "40px" }}>
            {post.title}
          </h1>
          <div style={{ height: "1px", backgroundColor: "var(--color-hairline)", width: "100px", margin: "var(--spacing-lg) auto 0" }}></div>
        </header>

        {/* Content Body */}
        <div 
          className="body-text" 
          style={{ color: "var(--color-ink)" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer style={{ marginTop: "var(--spacing-xxl)", paddingTop: "var(--spacing-lg)", borderTop: "1px solid var(--color-hairline)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/blog" className="button-secondary" style={{ fontSize: "14px", padding: "8px 16px" }}>
              Xem các bài viết khác
            </Link>
            <Link href="/portfolio" className="button-primary">
              Xem Portfolio của tôi
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
