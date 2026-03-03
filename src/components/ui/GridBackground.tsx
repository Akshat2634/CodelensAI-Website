export function GridBackground({
  children,
  className,
  showOrbs = true,
}: {
  children?: React.ReactNode;
  className?: string;
  showOrbs?: boolean;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Dot grid */}
      <div className="dot-grid pointer-events-none absolute inset-0" />

      {/* Gradient orbs */}
      {showOrbs && (
        <>
          <div
            className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-[0.07]"
            style={{
              background:
                "radial-gradient(circle, var(--accent-orange) 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full opacity-[0.05]"
            style={{
              background:
                "radial-gradient(circle, var(--accent-teal) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
