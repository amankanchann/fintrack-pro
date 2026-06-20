import type { ReactNode } from "react";
import { useTheme } from "../../context/ThemeContext";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({
  children,
  className = "",
}: CardProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`
        rounded-2xl
        border
        p-6
        shadow-sm
        ${
          theme === "light"
            ? "bg-white/70 border-vintage-sage"
            : "bg-[#1A1A1A] border-vintage-brown/40"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;