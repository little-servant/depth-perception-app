import { ImageResponse } from "next/og";

const width = 1200;
const height = 630;

export const alt = "Depth Lab Open Graph Image";
export const size = {
  width,
  height,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(circle at top, rgba(0, 212, 170, 0.2), transparent 34%), radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.16), transparent 28%), linear-gradient(180deg, #0d1018 0%, #0a0a0f 100%)",
          color: "#e8e8ed",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "28px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#00d4aa",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "999px",
              background: "#00d4aa",
              boxShadow: "0 0 24px rgba(0, 212, 170, 0.45)",
            }}
          />
          Depth Lab
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <div style={{ fontSize: "84px", fontWeight: 700, lineHeight: 1.02 }}>
              See how depth cues shape perception.
            </div>
            <div
              style={{
                maxWidth: "860px",
                fontSize: "32px",
                lineHeight: 1.45,
                color: "#b8bcc8",
              }}
            >
              Explore seven visual cues, run a 15-trial 2AFC test, and compare your
              personal depth-perception profile in one interactive 3D lab.
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px", fontSize: "24px", color: "#ff6b35" }}>
            <div>7 depth cues</div>
            <div>15 trials</div>
            <div>Interactive 3D</div>
          </div>
        </div>
      </div>
    ),
    {
      width,
      height,
    },
  );
}
