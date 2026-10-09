import { ImageResponse } from "next/og";

export const alt = "Shivam Kumar — Product, Growth & Analytics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#f7f7f5", color: "#111111", padding: "70px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", fontSize: 24, letterSpacing: 5 }}>PORTFOLIO / BANGALORE, INDIA</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 100, fontWeight: 700, letterSpacing: -5 }}>SHIVAM KUMAR</div>
        <div style={{ fontSize: 36, marginTop: 20 }}>Product · Growth · Analytics</div>
      </div>
      <div style={{ display: "flex", fontSize: 24, borderTop: "2px solid #111111", paddingTop: 24 }}>Customer understanding. Data. Hands-on execution.</div>
    </div>,
    size,
  );
}
