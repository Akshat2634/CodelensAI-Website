import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  wide,
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        wide ? "max-w-[1400px]" : "max-w-[1200px]",
        className
      )}
    >
      {children}
    </div>
  );
}
