/**
 * Trích xuất mỗi frame từ Zoomin.mp4 thành ảnh JPEG riêng lẻ.
 * Output: public/frames/frame-001.jpg, frame-002.jpg, ...
 * 
 * Chạy: node scripts/extract-frames.js
 */
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

const inputVideo = path.join(__dirname, '..', 'public', 'Zoomin.mp4');
const outputDir = path.join(__dirname, '..', 'public', 'frames');

// Tạo thư mục output nếu chưa có
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🎬 Extracting frames from:', inputVideo);
console.log('📁 Output directory:', outputDir);

// Trích xuất tất cả frame ở 30fps, chất lượng JPEG cao (q:v 2 = rất tốt)
// Scale xuống 1280px width để giảm dung lượng nhưng vẫn sắc nét
const cmd = `"${ffmpeg}" -i "${inputVideo}" -vf "scale=1280:-1" -q:v 2 -start_number 1 "${path.join(outputDir, 'frame-%03d.jpg')}" -y`;

console.log('⏳ Running ffmpeg...');
try {
  execSync(cmd, { stdio: 'inherit' });
} catch (e) {
  console.error('❌ FFmpeg failed:', e.message);
  process.exit(1);
}

// Đếm số frame đã trích xuất
const frames = fs.readdirSync(outputDir).filter(f => f.startsWith('frame-') && f.endsWith('.jpg'));
console.log(`✅ Extracted ${frames.length} frames successfully!`);

// Tính tổng dung lượng
const totalSize = frames.reduce((sum, f) => sum + fs.statSync(path.join(outputDir, f)).size, 0);
console.log(`📦 Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`📊 Average per frame: ${(totalSize / frames.length / 1024).toFixed(1)} KB`);
