import { ImageResponse } from "next/og";

export const alt = "José Hernández Mondéjar — Escritor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(180deg, #0D0D0D 0%, #161616 60%, #1E1C18 100%)",
          color: "#F5EFE0",
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(201,168,76,0.22) 0%, transparent 65%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 48,
            left: 80,
            fontSize: 16,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.75)",
          }}
        >
          josehernandezmondejar.com
        </div>

        <div
          style={{
            fontSize: 20,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#C9A84C",
            marginBottom: 48,
            zIndex: 1,
          }}
        >
          Escritor · Articulista
        </div>

        <div
          style={{
            fontSize: 108,
            textAlign: "center",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            fontWeight: 700,
            zIndex: 1,
            maxWidth: 980,
          }}
        >
          José Hernández Mondéjar
        </div>

        <div
          style={{
            width: 120,
            height: 2,
            background: "#C9A84C",
            marginTop: 56,
            zIndex: 1,
          }}
        />

        <div
          style={{
            fontSize: 30,
            color: "#C8BFA8",
            marginTop: 44,
            textAlign: "center",
            fontStyle: "italic",
            zIndex: 1,
            maxWidth: 820,
          }}
        >
          Voz crítica del ciudadano de a pie
        </div>
      </div>
    ),
    size,
  );
}
