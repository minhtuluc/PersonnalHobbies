/**
 * Tối ưu hóa chuỗi frame ảnh từ public/frames/footage sang định dạng WebP.
 * Chuyển đổi từng JPEG dung lượng lớn (>400MB) sang WebP riêng lẻ, 
 * scale về độ phân giải phù hợp cho web (1280px hoặc 1920px).
 * 
 * Chạy: node scripts/optimize-footage.js
 */
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

const inputDir = path.join(__dirname, '..', 'public', 'frames', 'footage');
const outputDir = path.join(__dirname, '..', 'public', 'frames', 'footage-webp');

// Tạo thư mục output nếu chưa có
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Xóa file cũ nếu có để tránh sai số liệu dung lượng
fs.readdirSync(outputDir).forEach(f => {
  if (f.endsWith('.webp')) {
    fs.unlinkSync(path.join(outputDir, f));
  }
});

console.log('🎬 Đang tối ưu hóa frames từ thư mục:', inputDir);
console.log('📁 Thư mục lưu kết quả WebP:', outputDir);

// Đọc và kiểm tra các file đầu vào, sắp xếp theo thứ tự số
const files = fs.readdirSync(inputDir)
  .filter(f => f.startsWith('hanoizoomin_') && f.endsWith('.jpeg'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0], 10);
    const numB = parseInt(b.match(/\d+/)[0], 10);
    return numA - numB;
  });

if (files.length === 0) {
  console.error('❌ Không tìm thấy file hanoizoomin_*.jpeg nào trong thư mục đầu vào!');
  process.exit(1);
}

console.log(`📊 Tìm thấy ${files.length} frames JPEG.`);

// Tính tổng dung lượng file gốc
const originalSize = files.reduce((sum, f) => sum + fs.statSync(path.join(inputDir, f)).size, 0);
console.log(`📦 Tổng dung lượng ban đầu: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

// Cấu hình: 
// 1280px width (HD) là sự kết hợp tối ưu giữa độ sắc nét và hiệu năng tải/vẽ canvas trên cả thiết bị di động.
// Nếu muốn Full HD, hãy đổi thành 1920.
const TARGET_WIDTH = 1280; 
const WEBP_QUALITY = 75; 

console.log(`⚙️  Đang chạy FFmpeg để scale về ${TARGET_WIDTH}px và nén WebP (Quality: ${WEBP_QUALITY})...`);

const startTime = Date.now();

// Xử lý tuần tự từng frame
for (let i = 0; i < files.length; i++) {
  const file = files[i];
  // Chuyển đổi tên sang frame-000.webp, frame-001.webp,...
  const indexStr = String(i).padStart(3, '0');
  const inputFile = path.join(inputDir, file);
  const outputFile = path.join(outputDir, `frame-${indexStr}.webp`);
  
  const cmd = `"${ffmpeg}" -i "${inputFile}" -vf "scale=${TARGET_WIDTH}:-1" -q:v ${WEBP_QUALITY} "${outputFile}" -y`;
  
  try {
    execSync(cmd, { stdio: 'ignore' });
  } catch (err) {
    console.error(`❌ Lỗi khi chuyển đổi frame ${file}:`, err.message);
  }

  // Hiển thị tiến trình
  if ((i + 1) % 30 === 0 || i === files.length - 1) {
    const percent = (((i + 1) / files.length) * 100).toFixed(0);
    console.log(`⏳ Tiến trình: ${percent}% (${i + 1}/${files.length} frames)...`);
  }
}

const duration = ((Date.now() - startTime) / 1000).toFixed(1);
console.log(`⏱️  Thời gian xử lý: ${duration} giây.`);

// Tính tổng dung lượng mới
const outputFiles = fs.readdirSync(outputDir).filter(f => f.startsWith('frame-') && f.endsWith('.webp'));
const newSize = outputFiles.reduce((sum, f) => sum + fs.statSync(path.join(outputDir, f)).size, 0);

console.log(`\n✅ Đã chuyển đổi thành công ${outputFiles.length}/${files.length} frames sang WebP riêng lẻ!`);
console.log(`📦 Tổng dung lượng sau tối ưu: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`📉 Giảm được: ${((1 - newSize / originalSize) * 100).toFixed(1)}% dung lượng!`);
console.log(`📊 Trung bình mỗi frame WebP: ${(newSize / outputFiles.length / 1024).toFixed(1)} KB`);

console.log('\n💡 HƯỚNG DẪN TÍCH HỢP VÀO CODE:');
console.log('1. Đổi đường dẫn trong getFrameUrl(index) của component EarthHero thành:');
console.log('   return `/frames/footage-webp/frame-${String(index - 1).padStart(3, "0")}.webp`; // Vì frame bắt đầu từ 000');
console.log(`2. Cập nhật TOTAL_FRAMES = ${outputFiles.length};`);
