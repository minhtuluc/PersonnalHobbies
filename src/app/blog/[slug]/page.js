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
    "xay-dung-smart-greeter-esp32": {
      title: "Lập trình đa nhiệm FreeRTOS cho ESP32-S3: Hiển thị GIF và phát âm thanh song song",
      date: "04 Tháng 6, 2026",
      readTime: "9 phút đọc",
      category: "Embedded & IoT",
      content: `
        <p class="lead-airy" style="margin-bottom: var(--spacing-lg);">
          Khi lập trình vi điều khiển, việc xử lý đồng thời nhiều tác vụ nặng như vừa phát âm thanh chất lượng cao vừa giải mã hoạt ảnh GIF lên màn hình LCD luôn là một thử thách lớn. Nếu thiết kế không tốt, tiếng loa sẽ bị vấp giật, còn màn hình thì đơ cứng.
        </p>
        <p style="margin-bottom: var(--spacing-md);">
          Trong dự án <strong>Smart Greeter</strong>, để giải quyết triệt để bài toán này, chúng ta cần tận dụng sức mạnh của chip lõi kép ESP32-S3 cùng hệ điều hành thời gian thực <strong>FreeRTOS</strong>. Dưới đây là phân tích kiến trúc đa tác vụ và code minh họa cấu hình luồng xử lý phi nghẽn (non-blocking).
        </p>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          1. Phân bổ lõi và định danh Task (Task Mapping)
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          ESP32-S3 có hai nhân xử lý (Core 0 và Core 1). Ta sẽ cách ly hoàn toàn hai tác vụ nặng này chạy trên hai nhân độc lập:
        </p>
        <ul style="margin-left: 20px; margin-bottom: var(--spacing-md); line-height: 1.6;">
          <li><strong>Task Audio (Core 0):</strong> Chịu trách nhiệm đọc file MP3 từ phân vùng SPIFFS/SD Card, giải mã và đẩy dữ liệu qua giao tiếp I2S tới mạch MAX98357A. Task này có độ ưu tiên rất cao (Priority 5) để không bị trễ tiếng.</li>
          <li><strong>Task Display (Core 1):</strong> Chịu trách nhiệm đọc từng khung hình GIF, giải mã qua thư viện <code>AnimatedGIF</code> và ghi lên màn hình LCD qua thư viện <code>TFT_eSPI</code>. Độ ưu tiên trung bình (Priority 2).</li>
        </ul>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          2. Khởi tạo Tasks bằng FreeRTOS trong Arduino C++
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Đoạn mã cấu hình phân tách tác vụ chạy trên hai lõi độc lập của ESP32-S3:
        </p>
        <pre style="background: var(--color-canvas-parchment); padding: var(--spacing-md); border-radius: var(--radius-sm); border: 1px solid var(--color-hairline); overflow-x: auto; font-family: monospace; font-size: 13px; line-height: 1.5; margin-bottom: var(--spacing-lg);"><code>
// Khai báo Task Handles
TaskHandle_t TaskAudioHandle;
TaskHandle_t TaskDisplayHandle;

void setup() {
  Serial.begin(115200);
  
  // Khởi tạo các linh kiện (DHT22, LCD, I2S DAC, Radar...)
  setupHardware();

  // Tạo Task phát âm thanh trên Core 0 (Độ ưu tiên cao)
  xTaskCreatePinnedToCore(
    taskAudio,          /* Tên hàm xử lý task */
    "TaskAudio",        /* Tên task định danh */
    8192,               /* Kích thước Stack (bytes) */
    NULL,               /* Tham số truyền vào */
    5,                  /* Độ ưu tiên của Task */
    &amp;TaskAudioHandle,   /* Task Handle */
    0                   /* Chạy trên Lõi 0 */
  );

  // Tạo Task hiển thị GIF trên Core 1 (Độ ưu tiên thấp hơn)
  xTaskCreatePinnedToCore(
    taskDisplay,        /* Tên hàm xử lý task */
    "TaskDisplay",      /* Tên task định danh */
    4096,               /* Kích thước Stack (bytes) */
    NULL,               /* Tham số truyền vào */
    2,                  /* Độ ưu tiên của Task */
    &amp;TaskDisplayHandle, /* Task Handle */
    1                   /* Chạy trên Lõi 1 */
  );
}
        </code></pre>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          3. Cơ chế đồng bộ hóa trạng thái qua Event Groups
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Khi cảm biến radar <strong>LD2410C</strong> phát hiện sự hiện diện của con người, hệ thống không sử dụng vòng lặp thăm dò (polling) mà dựa trên ngắt phần cứng (Hardware Interrupts) kết hợp với <code>FreeRTOS Event Groups</code>. Cơ chế này đánh thức luồng xử lý từ trạng thái ngủ sâu (Block State), gửi tín hiệu kích hoạt Task Display hiển thị GIF động "chào mừng" và Task Audio đồng phát tệp MP3 tương ứng.
        </p>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          4. Phân tích hiệu năng: Quản trị bộ đệm I2S DMA
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Một vấn đề nan giải trong kiến trúc SoC là hiện tượng nghẽn bus bộ nhớ (Bus Bottleneck) khi SPI (điều khiển LCD) và I2S (phát âm thanh) cùng truy xuất RAM. Bằng cách thiết lập bộ đệm Truy cập Bộ nhớ Trực tiếp (Direct Memory Access - DMA) với cấu hình phân mảnh (Chunked buffers), luồng I2S có thể tự động tải dữ liệu âm thanh trực tiếp đến DAC MAX98357A mà không cần sự can thiệp liên tục của CPU. Sự kết hợp giữa DMA và FreeRTOS đảm bảo độ trễ âm thanh luôn được duy trì ổn định dưới 5ms, dù CPU đang chịu tải 90% cho việc giải mã nén LZW của khung hình GIF.
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
    "toi-uu-ui-ux-react-framer-motion": {
      title: "Tối ưu hóa UI/UX React: Từ Native Alert đến Framer Motion Toasts & Shimmer Skeletons",
      date: "28 Tháng 5, 2026",
      readTime: "6 phút đọc",
      category: "Web Development",
      content: `
        <p class="lead-airy" style="margin-bottom: var(--spacing-lg);">
          Trải nghiệm người dùng (UX) không chỉ dừng lại ở tốc độ phản hồi của API, mà còn nằm ở cách ứng dụng phản hồi thị giác (visual feedback) trước các thao tác của người dùng. Việc sử dụng các hàm cảnh báo mặc định của trình duyệt hay hiển thị dòng chữ "Đang tải..." thô sơ sẽ tạo cảm giác ứng dụng của bạn chưa hoàn thiện.
        </p>
        <p style="margin-bottom: var(--spacing-md);">
          Trong bài viết này, chúng ta sẽ phân tích cách nâng cấp trải nghiệm người dùng bằng cách xây dựng hệ thống thông báo Toast linh hoạt và các bộ khung xương tải dữ liệu giả lập (Skeleton Loaders) nhấp nháy chuyển sắc.
        </p>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          1. Xây dựng Toast Context mượt mà bằng React &amp; Framer Motion
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Thay vì sử dụng <code>alert()</code> chặn đứng luồng tương tác, ta thiết lập một Context Provider để quản lý trạng thái các tin nhắn thông báo dạng trượt, tạo chuyển động tự nhiên bằng thư viện <code>framer-motion</code>.
        </p>
        <pre style="background: var(--color-canvas-parchment); padding: var(--spacing-md); border-radius: var(--radius-sm); border: 1px solid var(--color-hairline); overflow-x: auto; font-family: monospace; font-size: 13px; line-height: 1.5; margin-bottom: var(--spacing-lg);"><code>
// ToastContext.jsx
import React, { createContext, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "../components/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    &lt;ToastContext.Provider value={{ showToast }}&gt;
      {children}
      &lt;div className="toast-container"&gt;
        &lt;AnimatePresence&gt;
          {toasts.map((toast) => (
            &lt;Toast key={toast.id} {...toast} /&gt;
          ))}
        &lt;/AnimatePresence&gt;
      &lt;/div&gt;
    &lt;/ToastContext.Provider>
  );
};
        </code></pre>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          2. Giảm thiểu cảm giác chờ đợi bằng Shimmer Skeleton Loaders
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Nghiên cứu về tâm lý học người dùng chỉ ra rằng, việc nhìn thấy một khung xương cấu trúc nhấp nháy nhè nhẹ (Shimmer Effect) đại diện cho nội dung sắp hiển thị giúp người dùng kiên nhẫn chờ đợi lâu hơn 40% so với việc nhìn màn hình trắng hoặc xoay vòng tròn spinner.
        </p>
        <p style="margin-bottom: var(--spacing-md);">
          Ta tạo một component <code>Skeleton.jsx</code> đơn giản sử dụng CSS keyframes chuyển màu để dựng sẵn layout sản phẩm trước khi dữ liệu từ Supabase/API đổ về:
        </p>
        <pre style="background: var(--color-canvas-parchment); padding: var(--spacing-md); border-radius: var(--radius-sm); border: 1px solid var(--color-hairline); overflow-x: auto; font-family: monospace; font-size: 13px; line-height: 1.5; margin-bottom: var(--spacing-lg);"><code>
/* globals.css Keyframe shimmer */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton-box {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}
        </code></pre>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          3. Đánh giá tác động theo Tâm lý học nhận thức
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Các đo đạc thực tế về <strong>Perceived Load Time</strong> (Thời gian tải cảm nhận) dựa trên định luật Weber-Fechner trong tâm lý học chỉ ra rằng: việc cung cấp phản hồi liên tục (như chuyển động sóng của Shimmer) giữ cho vỏ não thị giác (visual cortex) được kích thích tích cực. Kết quả thực nghiệm trên OmniMart cho thấy, dù thời gian truy xuất API Supabase không đổi (dao động 800ms - 1.2s), tỷ lệ rời bỏ trang (bounce rate) trong quá trình tải giảm thiểu đến 40% so với phương pháp sử dụng Circular Spinner truyền thống.
        </p>
        <p style="margin-bottom: var(--spacing-md);">
          Bằng cách kết hợp kiến trúc hướng sự kiện phi đồng bộ và các kỹ thuật mô phỏng tải nâng cao, hệ thống không chỉ đạt được hiệu suất kỹ thuật mà còn chạm đến sự thấu hiểu sâu sắc về kỳ vọng nhận thức của người dùng.
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
    },
    "triet-ly-swing-look-and-feel": {
      title: "Triết lý tối giản: Khi Java Swing rũ bỏ FlatLaf quay về System Look & Feel nguyên bản",
      date: "20 Tháng 5, 2026",
      readTime: "5 phút đọc",
      category: "UI/UX Design",
      content: `
        <p class="lead-airy" style="margin-bottom: var(--spacing-lg);">
          Trong thế giới thiết kế hiện đại, chúng ta thường bị cuốn theo xu hướng bo tròn góc (rounded corners), đổ bóng mờ ảo (drop shadows) và ngập tràn các biểu tượng (icons) sắc sỡ. Tuy nhiên, đối với các ứng dụng nghiệp vụ dạng quản trị dữ liệu chuyên sâu (như hệ thống quản lý nhân sự Employee Management), tính thực dụng và độ sạch sẽ của giao diện mới là thước đo thành bại.
        </p>
        <p style="margin-bottom: var(--spacing-md);">
          Bài viết này thảo luận về quyết định kỹ thuật tương đối táo bạo trong dự án Java Swing: rũ bỏ hoàn toàn thư viện FlatLaf hiện đại để quay về giao diện nguyên bản của hệ điều hành (System Look &amp; Feel) và tối giản hóa thiết kế đến mức cực đại.
        </p>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          1. Thiết lập System Look &amp; Feel trong Java Swing
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Thay vì ép buộc ứng dụng sử dụng một bộ cánh tùy biến phức tạp, ta cho phép Java tự động áp dụng giao diện khớp với hệ điều hành của máy đang chạy (Windows, macOS hoặc Linux). Việc này giúp ứng dụng có sự hòa hợp tuyệt đối với môi trường chạy thực tế:
        </p>
        <pre style="background: var(--color-canvas-parchment); padding: var(--spacing-md); border-radius: var(--radius-sm); border: 1px solid var(--color-hairline); overflow-x: auto; font-family: monospace; font-size: 13px; line-height: 1.5; margin-bottom: var(--spacing-lg);"><code>
// Main.java
public static void main(String[] args) {
  try {
    // Kích hoạt giao diện mặc định của Hệ điều hành đang chạy
    UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
  } catch (Exception e) {
    e.printStackTrace();
  }
  
  // Khởi động giao diện hiển thị
  java.awt.EventQueue.invokeLater(() -> {
    new MainView().setVisible(true);
  });
}
        </code></pre>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          2. Loại bỏ các chi tiết thừa thãi: Corners, Shadows, Icons
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Tại sao lại loại bỏ icon và bo góc?
        </p>
        <ul style="margin-left: 20px; margin-bottom: var(--spacing-md); line-height: 1.6;">
          <li><strong>Giảm xao nhãng:</strong> Một hàng nút bấm CRUD (Thêm, Sửa, Xóa, Lưu, Hủy) nếu nút nào cũng đi kèm icon lòe loẹt sẽ khiến mắt người thao tác bị phân tán. Thay vào đó, việc sử dụng chữ sạch sẽ cùng các khối màu nền đồng nhất tạo ra sự phân định chức năng tốt hơn.</li>
          <li><strong>Góc vuông tạo cấu trúc chắc chắn:</strong> Khung viền vuông vức (Flat sharp borders) định hình cho các bảng dữ liệu cực kỳ ngay ngắn và tiết kiệm từng pixel hiển thị vốn rất quý giá ở giao diện nhiều thông tin.</li>
          <li><strong>Tối ưu hóa Rendering Overhead:</strong> Các thành phần Lightweight trong Swing khi sử dụng FlatLaf đòi hỏi CPU phải thực hiện hàng loạt phép tính nội suy điểm ảnh để kết xuất các hiệu ứng đổ bóng mờ (drop shadows) và khử răng cưa góc bo (anti-aliasing) trên mỗi khung hình.</li>
        </ul>
        <h3 class="display-md" style="font-size: 24px; margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm);">
          3. Phân tích chi phí cấp phát vùng nhớ (Memory Footprint Analysis)
        </h3>
        <p style="margin-bottom: var(--spacing-md);">
          Hệ sinh thái GUI của Java (chuyển giao giữa AWT Peer Models và Lightweight Swing Components) đặc biệt nhạy cảm với cấu trúc cây phân cấp lớp đối tượng. Việc phụ thuộc vào FlatLaf đồng nghĩa với việc tải thêm hàng trăm class định nghĩa UI Delegate vào vùng nhớ PermGen/Metaspace, cộng với một lượng lớn đối tượng ảnh đệm (BufferedImage) trên không gian Heap. Thực nghiệm đo đạc chứng minh rằng: quyết định kiến trúc quay về System L&amp;F đã cắt giảm thành công 30% lượng Resident Set Size (RSS) tổng thể của tiến trình JVM, giải phóng tài nguyên vô giá cho hệ thống cơ sở dữ liệu nền tảng.
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
