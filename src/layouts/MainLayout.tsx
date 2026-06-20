import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import { useTheme }
  from "../context/ThemeContext";


interface MainLayoutProps {
  children: ReactNode;
}

const navLinkClass = ({
  isActive,
}: {
  isActive: boolean;
}) =>
  `rounded-xl px-4 py-3 transition-all duration-200 ${isActive
    ? "bg-vintage-brown text-vintage-cream font-semibold shadow-md"
    : "text-inherit hover:bg-vintage-brown/20"
  }`;

function MainLayout({ children }: MainLayoutProps) {
  const { theme, toggleTheme } =
    useTheme();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <aside
        className={`
    w-64
    shadow-xl
    ${theme === "light"
            ? "bg-vintage-navy text-vintage-cream"
            : "bg-neon-black text-white"
          }
  `}
      >
        <div className="border-b border-vintage-brown/30 p-6">
          <h2 className="text-3xl font-bold tracking-wide">
            FinTrack Pro
          </h2>

          <p className="mt-1 text-sm opacity-70">
            Personal Finance Hub
          </p>
        </div>

        <nav className="flex flex-col gap-3 px-4 py-6">
          <NavLink to="/" className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={navLinkClass}
          >
            Transactions
          </NavLink>

          <NavLink
            to="/budget"
            className={navLinkClass}
          >
            Budget
          </NavLink>

          <NavLink
            to="/analytics"
            className={navLinkClass}
          >
            Analytics
          </NavLink>

          <NavLink
            to="/goals"
            className={navLinkClass}
          >
            Goals
          </NavLink>

        </nav>
      </aside>

      {/* Main Content */}

      <main
        className={`
    flex-1
    ${theme === "light"
            ? "bg-vintage-cream"
            : "bg-neon-black"
          }
  `}
      >
        <header
          className={`
    border-b
    px-6
    py-4
    ${theme === "light"
              ? "bg-vintage-cream border-vintage-sage"
              : "bg-neon-black border-neon-purple"
            }
  `}
        >
          <div className="flex items-center justify-between">
            <h1
              className={`
    text-xl
    font-bold
    ${theme === "light"
                  ? "text-vintage-navy"
                  : "text-neon-purple-light"
                }
  `}
            >
              Personal Finance Dashboard
            </h1>

            <button
              onClick={toggleTheme}
              className={`
              rounded-xl
              border
              px-3
              py-2
              shadow-sm
              transition
              hover:shadow-md
              ${theme === "light"
                  ? "border-vintage-sage bg-white/80"
                  : "border-neon-purple bg-neon-purple-dark text-white"
                }
  `}
            >
              {theme === "light"
                ? "🌙"
                : "☀️"}
            </button>
          </div>
        </header>

        <div
          className={`p-6 ${theme === "light"
              ? "text-vintage-navy"
              : "text-neon-purple-light"
            }`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainLayout;