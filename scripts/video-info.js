const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

try {
  const r = execSync(`"${ffmpeg}" -i public/Zoomin.mp4`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  console.log(r);
} catch (e) {
  // ffmpeg -i always exits with code 1 when no output specified, stderr contains the info
  console.log(e.stderr.toString());
}
