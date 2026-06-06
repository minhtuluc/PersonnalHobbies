"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Đăng ký plugin ScrollTrigger với GSAP
gsap.registerPlugin(ScrollTrigger);

export default function EarthHero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Đảm bảo video được gỡ bỏ các sự kiện mặc định và nén sẵn
    video.muted = true;
    video.playsInline = true;

    const initScrollVideo = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      // Reset thời gian video về 0 ban đầu
      video.currentTime = 0;

      // 1. Tạo Timeline ghim toàn bộ section và tua video
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",        // Ghim khi đỉnh container chạm đỉnh màn hình
          end: "+=2500",           // Khoảng cách cuộn chuột (2500px)
          scrub: 0.8,              // Quán tính cuộn mượt mà
          pin: true,               // Ghim lại màn hình
          invalidateOnRefresh: true
        }
      });

      // Tua currentTime của video từ 0 đến cuối
      tl.to(video, {
        currentTime: duration,
        ease: "none"
      });

      // 2. Chuyển tiếp mượt mà (Fade Out video ở 20% chặng cuộn cuối)
      tl.to(video, {
        opacity: 0,
        duration: 0.2
      }, "-=0.2"); // Chạy hiệu ứng mờ dần trong 20% chặng cuối của timeline
    };

    // Lắng nghe metadata của video
    if (video.readyState >= 1) {
      initScrollVideo();
    } else {
      video.addEventListener("loadedmetadata", initScrollVideo);
    }

    return () => {
      // Dọn dẹp GSAP và ScrollTrigger khi unmount để tránh rò rỉ bộ nhớ
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: "relative", 
        width: "100%", 
        height: "100vh", 
        backgroundColor: "#000000",
        overflow: "hidden"
      }}
    >
      {/* Video Fullscreen */}
      <video
        ref={videoRef}
        src="/Zoomin.mp4"
        muted
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 1,
          display: "block",
          pointerEvents: "none",
          willChange: "transform, opacity"
        }}
      />

      {/* Overlay hiệu ứng bóng tối không gian */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%)",
          pointerEvents: "none"
        }}
      />

      {/* Kêu gọi cuộn chuột tối giản kiểu Apple */}
      <div 
        style={{ 
          position: "absolute", 
          bottom: "48px", 
          left: "50%", 
          transform: "translateX(-50%)", 
          color: "#ffffff",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 5
        }}
      >
        <span className="fine-print" style={{ opacity: 0.5, letterSpacing: "1px", textTransform: "uppercase" }}>
          Cuộn để bắt đầu hành trình
        </span>
        <div style={{ fontSize: "16px", marginTop: "8px", animation: "bounce 2s infinite", opacity: 0.6 }}>↓</div>
      </div>

      <style jsx global>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
