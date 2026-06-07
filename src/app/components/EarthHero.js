"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 361;

// Sinh danh sách URL cho tất cả frame
function getFrameUrl(index) {
  // index: 1-based (1 ... 361) tương ứng với frame-000.webp ... frame-360.webp
  return `/frames/footage-webp/frame-${String(index - 1).padStart(3, "0")}.webp`;
}

export default function EarthHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const ctaRef = useRef(null);
  const spacerRef = useRef(null);

  // Lưu trữ tất cả Image objects đã decode
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hàm vẽ 1 frame lên canvas với object-fit: cover
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[frameIndex];
    if (!img) return;

    const vw = canvas.width;
    const vh = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = vw / vh;

    let drawW, drawH, drawX, drawY;
    if (canvasRatio > imgRatio) {
      drawW = vw;
      drawH = vw / imgRatio;
      drawX = 0;
      drawY = (vh - drawH) / 2;
    } else {
      drawH = vh;
      drawW = vh * imgRatio;
      drawX = (vw - drawW) / 2;
      drawY = 0;
    }

    ctx.clearRect(0, 0, vw, vh);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Thiết lập kích thước canvas (không dùng devicePixelRatio vì ảnh đã 1280px)
    const resizeCanvas = () => {
      // Dùng DPR capped ở 2 để tránh canvas quá lớn
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      // Vẽ lại frame hiện tại sau khi resize
      if (imagesRef.current[currentFrameRef.current]) {
        drawFrame(currentFrameRef.current);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ============================
    // PRELOAD TẤT CẢ FRAME
    // ============================
    let loadedCount = 0;
    const images = new Array(TOTAL_FRAMES);

    const onAllLoaded = () => {
      imagesRef.current = images;
      setIsLoaded(true);

      // Vẽ frame đầu tiên ngay lập tức
      drawFrame(0);

      // Khởi tạo GSAP ScrollTrigger
      const proxy = { frame: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacerRef.current,
          start: "top top",
          end: "+=3850",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      tl.to(proxy, {
        frame: TOTAL_FRAMES - 1,
        snap: "frame",        // Snap tới frame nguyên
        ease: "none",
        duration: 1.0,
        onUpdate: () => {
          const frameIndex = Math.round(proxy.frame);
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            drawFrame(frameIndex);
          }
        },
      }, 0);

      // Fade out chữ "cuộn để bắt đầu" nhanh
      tl.to(ctaRef.current, {
        opacity: 0,
        duration: 0.08,
        ease: "none",
      }, 0);

      // Fade to white ở cuối (từ 0.85 đến 1.0)
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.15,
        ease: "power2.in",
      }, 0.85);

      // Fade out toàn bộ container cố định để lộ nội dung bên dưới (từ 1.0 đến 1.1)
      tl.to(containerRef.current, {
        autoAlpha: 0,
        duration: 0.10,
        ease: "power1.inOut",
      }, 1.0);
    };

    // Tải song song tất cả frame
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = () => {
        images[i] = img;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          onAllLoaded();
        }
      };
      img.onerror = () => {
        // Nếu frame lỗi, vẫn đếm để không treo mãi
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          onAllLoaded();
        }
      };
      img.src = getFrameUrl(i + 1); // 1-based
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [drawFrame]);

  return (
    <>
      {/* Spacer để tạo khoảng cuộn chạy video */}
      <div
        ref={spacerRef}
        style={{
          height: "3850px",
          width: "100%",
          position: "relative",
          pointerEvents: "none",
        }}
      />

      {/* Container chính giữ Canvas, chạy cố định (fixed) */}
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "#000000",
          overflow: "hidden",
          zIndex: 98,
        }}
      >
        {/* Canvas chính */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "block",
            pointerEvents: "none",
            willChange: "transform",
          }}
        />

      {/* Loading indicator — ẩn khi tải xong */}
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#ffffff",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "2px solid rgba(255,255,255,0.15)",
              borderTopColor: "#ffffff",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <span
            className="fine-print"
            style={{
              opacity: 0.6,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontSize: "12px",
            }}
          >
            {loadProgress}%
          </span>
        </div>
      )}

      {/* Overlay fade-to-white ở cuối chặng cuộn */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "#ffffff",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Vignette vũ trụ */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background:
            "radial-gradient(circle, transparent 50%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* CTA cuộn */}
      <div
        ref={ctaRef}
        style={{
          position: "absolute",
          bottom: "48px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#ffffff",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 5,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <span
          className="fine-print"
          style={{
            opacity: 0.5,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Cuộn để bắt đầu hành trình
        </span>
        <div
          style={{
            fontSize: "16px",
            marginTop: "8px",
            animation: "bounce 2s infinite",
            opacity: 0.6,
          }}
        >
          ↓
        </div>
      </div>

      </div>
    </>
  );
}
