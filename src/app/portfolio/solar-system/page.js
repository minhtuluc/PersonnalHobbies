"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// 1. Data cho các hành tinh (Tỉ lệ kích thước & khoảng cách đã được ước lệ để hiển thị đẹp trên màn hình)
const PLANETS_DATA = [
  {
    id: "mercury",
    name: "Sao Thủy",
    englishName: "Mercury",
    color: "#888888",
    radius: 4,          // Bán kính vẽ trên canvas (px)
    distance: 45,       // Khoảng cách quỹ đạo tới Mặt Trời trên canvas (px)
    period: 0.2408,     // Chu kỳ quỹ đạo (năm Trái Đất)
    realDiameter: "4,879 km",
    realDistance: "57.9 triệu km",
    realPeriod: "88 ngày",
    fact: "Là hành tinh nhỏ nhất trong Hệ Mặt Trời và nằm gần Mặt Trời nhất. Nhiệt độ ban ngày lên tới 430°C nhưng ban đêm có thể giảm xuống -180°C."
  },
  {
    id: "venus",
    name: "Sao Kim",
    englishName: "Venus",
    color: "#e3bb76",
    radius: 7,
    distance: 70,
    period: 0.6152,
    realDiameter: "12,104 km",
    realDistance: "108.2 triệu km",
    realPeriod: "224.7 ngày",
    fact: "Là hành tinh nóng nhất trong Hệ Mặt Trời do bầu khí quyển carbon dioxide siêu dày giữ nhiệt (hiệu ứng nhà kính mạnh mẽ). Nhiệt độ bề mặt khoảng 465°C."
  },
  {
    id: "earth",
    name: "Trái Đất",
    englishName: "Earth",
    color: "#2f80ed",
    radius: 8,
    distance: 100,
    period: 1.0,
    realDiameter: "12,742 km",
    realDistance: "149.6 triệu km",
    realPeriod: "365.25 ngày",
    fact: "Hành tinh duy nhất được biết đến trong vũ trụ có sự sống tồn tại. Nước lỏng bao phủ khoảng 71% bề mặt Trái Đất."
  },
  {
    id: "mars",
    name: "Sao Hỏa",
    englishName: "Mars",
    color: "#eb5757",
    radius: 5,
    distance: 135,
    period: 1.8808,
    realDiameter: "6,779 km",
    realDistance: "227.9 triệu km",
    realPeriod: "687 ngày",
    fact: "Thường được gọi là 'Hành tinh Đỏ' do oxit sắt (rỉ sét) bao phủ bề mặt. Nơi đây có ngọn núi lửa cao nhất Hệ Mặt Trời - Olympus Mons (cao 21.9 km)."
  },
  {
    id: "jupiter",
    name: "Sao Mộc",
    englishName: "Jupiter",
    color: "#e0a96d",
    radius: 16,
    distance: 185,
    period: 11.8626,
    realDiameter: "139,820 km",
    realDistance: "778.5 triệu km",
    realPeriod: "11.9 năm",
    fact: "Là hành tinh lớn nhất trong Hệ Mặt Trời, nặng gấp 2.5 lần tất cả các hành tinh khác cộng lại. Có Vết Đỏ Lớn - một cơn bão khổng lồ đã tồn tại hàng trăm năm."
  },
  {
    id: "saturn",
    name: "Sao Thổ",
    englishName: "Saturn",
    color: "#f2c94c",
    radius: 13,
    distance: 245,
    period: 29.4474,
    realDiameter: "116,460 km",
    realDistance: "1.4 tỷ km",
    realPeriod: "29.4 năm",
    fact: "Nổi tiếng nhất với hệ thống vành đai băng và đá tuyệt đẹp bao quanh rộng lớn. Là hành tinh có khối lượng riêng nhẹ nhất, nhẹ hơn cả nước."
  },
  {
    id: "uranus",
    name: "Sao Thiên Vương",
    englishName: "Uranus",
    color: "#56ccf2",
    radius: 10,
    distance: 310,
    period: 84.0168,
    realDiameter: "50,724 km",
    realDistance: "2.9 tỷ km",
    realPeriod: "84 năm",
    fact: "Là hành tinh băng khổng lồ có trục tự quay nghiêng cực độ (gần 98 độ), khiến nó trông giống như đang 'lăn' trên quỹ đạo quanh Mặt Trời."
  },
  {
    id: "neptune",
    name: "Sao Hải Vương",
    englishName: "Neptune",
    color: "#2d9cdb",
    radius: 9,
    distance: 370,
    period: 164.7913,
    realDiameter: "49,244 km",
    realDistance: "4.5 tỷ km",
    realPeriod: "164.8 năm",
    fact: "Là hành tinh xa Mặt Trời nhất, lạnh giá và tối tăm. Nơi đây có những cơn gió mạnh nhất Hệ Mặt Trời, đạt vận tốc lên tới 2,100 km/h."
  }
];

export default function SolarSystemPage() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // States kiểm soát UI
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  // Refs lưu trữ trạng thái chạy ngầm để chạy loop Canvas mượt mà
  const stateRef = useRef({
    isPlaying: true,
    speedMultiplier: 1,
    angles: PLANETS_DATA.reduce((acc, p) => {
      acc[p.id] = Math.random() * Math.PI * 2; // Khởi tạo góc quay ngẫu nhiên ban đầu
      return acc;
    }, {}),
    simulatedDays: 0,
    lastTimestamp: 0
  });

  // DOM Refs để cập nhật thông tin thời gian trực tiếp mà không cần re-render React liên tục
  const daysTextRef = useRef(null);
  const yearsTextRef = useRef(null);

  // Sync state của component với state của Loop Canvas
  useEffect(() => {
    stateRef.current.isPlaying = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    stateRef.current.speedMultiplier = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Resize canvas theo kích thước container
    const resizeCanvas = () => {
      const rect = containerRef.current.getBoundingClientRect();
      // Để hình vẽ sắc nét trên màn hình Retina, dùng devicePixelRatio
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Vòng lặp vẽ động (Animation Loop)
    const render = (timestamp) => {
      if (!stateRef.current.lastTimestamp) {
        stateRef.current.lastTimestamp = timestamp;
      }
      const deltaTime = (timestamp - stateRef.current.lastTimestamp) / 1000; // Đơn vị giây
      stateRef.current.lastTimestamp = timestamp;

      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 1. Xóa màn hình
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Vẽ lưới ngôi sao nền tinh tế
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(i * 123.45) * 0.5 + 0.5) * rect.width;
        const y = (Math.cos(i * 987.65) * 0.5 + 0.5) * rect.height;
        ctx.fillRect(x, y, 1, 1);
      }

      // 2. Vẽ Mặt Trời ở chính giữa
      const sunGradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 20);
      sunGradient.addColorStop(0, "#fffde6");
      sunGradient.addColorStop(0.2, "#f2c94c");
      sunGradient.addColorStop(0.8, "#f2994a");
      sunGradient.addColorStop(1, "transparent");
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 22, 0, Math.PI * 2);
      ctx.fillStyle = sunGradient;
      ctx.fill();

      // 3. Cập nhật góc quay & vẽ từng hành tinh
      const activeState = stateRef.current;
      
      // Ở tốc độ x1, 1 năm Trái Đất (360 độ quay) = 60 giây ngoài đời thực.
      // -> Tốc độ quay của Trái Đất = (360 độ / 60 giây) = 6 độ/giây = 2 * PI / 60 radian/giây.
      const earthAngularSpeed = (Math.PI * 2) / 60; 

      if (activeState.isPlaying && deltaTime > 0) {
        // Cập nhật số ngày giả lập đã trôi qua
        // Trái Đất quay 1 vòng (365.25 ngày) tương ứng 60 giây ở tốc độ x1
        // -> Mỗi giây ngoài đời thực trôi qua = 365.25 / 60 = 6.0875 ngày giả lập
        const daysElapsed = (365.25 / 60) * deltaTime * activeState.speedMultiplier;
        activeState.simulatedDays += daysElapsed;

        // Cập nhật số ngày và năm lên UI qua ref
        if (daysTextRef.current && yearsTextRef.current) {
          const years = Math.floor(activeState.simulatedDays / 365.25);
          const remainingDays = Math.floor(activeState.simulatedDays % 365.25);
          daysTextRef.current.innerText = remainingDays;
          yearsTextRef.current.innerText = years;
        }
      }

      // Vẽ từng quỹ đạo và hành tinh
      PLANETS_DATA.forEach((planet) => {
        // Tốc độ góc của hành tinh này = Tốc độ góc Trái Đất / Chu kỳ quỹ đạo của hành tinh
        const angularSpeed = earthAngularSpeed / planet.period;

        if (activeState.isPlaying) {
          // Tính góc quay mới dựa trên deltaTime
          activeState.angles[planet.id] += angularSpeed * deltaTime * activeState.speedMultiplier;
          // Chuẩn hóa góc quay trong khoảng [0, 2*PI]
          activeState.angles[planet.id] %= Math.PI * 2;
        }

        const angle = activeState.angles[planet.id];

        // Tọa độ của hành tinh trên Canvas
        const x = centerX + planet.distance * Math.cos(angle);
        const y = centerY + planet.distance * Math.sin(angle);

        // A. Vẽ đường quỹ đạo hình tròn mảnh
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // B. Vẽ chính hành tinh
        ctx.beginPath();
        ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();

        // Riêng Sao Thổ vẽ thêm vành đai mỏng đặc trưng
        if (planet.id === "saturn") {
          ctx.beginPath();
          ctx.ellipse(x, y, planet.radius + 6, planet.radius / 2.5, -Math.PI / 6, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(242, 201, 76, 0.5)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Reset toàn bộ mô phỏng
  const handleReset = () => {
    stateRef.current.simulatedDays = 0;
    PLANETS_DATA.forEach((p) => {
      stateRef.current.angles[p.id] = Math.random() * Math.PI * 2;
    });
    if (daysTextRef.current && yearsTextRef.current) {
      daysTextRef.current.innerText = "0";
      yearsTextRef.current.innerText = "0";
    }
  };

  return (
    <div className="main-content" style={{ backgroundColor: "#000000", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Area Canvas mô phỏng */}
      <div 
        ref={containerRef} 
        style={{ width: "100%", height: "calc(100vh - 44px)", position: "relative" }}
      >
        <canvas ref={canvasRef} style={{ display: "block" }} />

        {/* 2. Tiêu đề nổi bật góc trên bên trái & Nút quay lại */}
        <div style={{ position: "absolute", top: "24px", left: "24px", display: "flex", flexDirection: "column", gap: "12px", zIndex: 10 }}>
          <Link 
            href="/portfolio" 
            className="button-secondary" 
            style={{ 
              alignSelf: "flex-start", 
              color: "#ffffff", 
              borderColor: "rgba(255,255,255,0.3)", 
              fontSize: "12px", 
              padding: "6px 12px",
              backgroundColor: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(10px)"
            }}
          >
            ← Trở lại Portfolio
          </Link>
          <div style={{ pointerEvents: "none" }}>
            <h1 className="display-lg" style={{ color: "#ffffff", fontSize: "24px", marginBottom: "4px" }}>
              Mô phỏng Hệ Mặt Trời
            </h1>
            <p className="caption" style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>
              Tỉ lệ thực tế: 1 năm Trái Đất = 60 giây trình diễn
            </p>
          </div>
        </div>

        {/* 3. Panel Bảng điều khiển (Controls) ở góc dưới bên trái */}
        <div 
          style={{ 
            position: "absolute", 
            bottom: "24px", 
            left: "24px", 
            backgroundColor: "rgba(20, 20, 20, 0.8)", 
            backdropFilter: "blur(20px)",
            padding: "16px", 
            borderRadius: "var(--radius-lg)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "280px",
            zIndex: 10
          }}
        >
          {/* A. Hiển thị Thời gian giả lập */}
          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "10px", marginBottom: "4px" }}>
            <span className="caption" style={{ color: "rgba(255,255,255,0.6)", display: "block", marginBottom: "4px" }}>
              Thời gian giả lập
            </span>
            <span className="lead-airy" style={{ color: "#ffffff", fontSize: "16px", fontWeight: "600" }}>
              <span ref={yearsTextRef}>0</span> năm <span ref={daysTextRef}>0</span> ngày
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button 
              onClick={() => setIsPlaying(!isPlaying)} 
              className="button-primary" 
              style={{ flex: 1, backgroundColor: isPlaying ? "#555555" : "var(--color-primary)", fontSize: "12px" }}
            >
              {isPlaying ? " tạm dừng " : " chạy tiếp "}
            </button>
            <button 
              onClick={handleReset} 
              className="button-secondary" 
              style={{ flex: 1, color: "#ffffff", borderColor: "rgba(255,255,255,0.3)", fontSize: "12px", padding: "8px" }}
            >
              Đặt lại
            </button>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span className="caption" style={{ color: "rgba(255,255,255,0.6)" }}>Tốc độ giả lập</span>
              <span className="caption-strong" style={{ color: "#ffffff" }}>x{speedMultiplier}</span>
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
              {[1, 10, 100, 1000, 5000].map((val) => (
                <button
                  key={val}
                  onClick={() => setSpeedMultiplier(val)}
                  style={{
                    flex: 1,
                    backgroundColor: speedMultiplier === val ? "var(--color-primary)" : "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "4px 0",
                    fontSize: "10px",
                    cursor: "pointer"
                  }}
                >
                  {val}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
