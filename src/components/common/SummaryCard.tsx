import { useTheme } from "../../context/ThemeContext";

interface SummaryCardProps {
  title: string;
  amount: string;
}

function SummaryCard({
  title,
  amount,
}: SummaryCardProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`
        rounded-2xl
        border
        ${
  theme === "light"
    ? "border-vintage-sage"
    : "border-vintage-brown/40"
}
        p-6
        shadow-sm
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        ${
          theme === "light"
            ? "bg-white/70"
            : "bg-[#1A1A1A]"
        }
      `}
    >
      <div
        className="
          mb-4
          h-1
          w-12
          rounded-full
          bg-vintage-brown
        "
      />

      <p
        className={`text-sm uppercase tracking-wider ${
          theme === "light"
            ? "text-gray-500"
            : "text-gray-400"
        }`}
      >
        {title}
      </p>

      <h2
        className={`mt-3 text-3xl font-bold ${
          theme === "light"
            ? "text-vintage-navy"
            : "text-neon-purple-light"
        }`}
      >
        {amount}
      </h2>
    </div>
  );
}

export default SummaryCard;