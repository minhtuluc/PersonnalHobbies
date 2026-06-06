export async function GET() {
  const posts = [
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

  return Response.json(posts, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
