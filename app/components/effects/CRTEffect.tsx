"use client";

export function CRTEffect() {
  return (
    <div className="crt-overlay" aria-hidden="true">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,255,159,0.01)] to-transparent pointer-events-none" />
      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
}
