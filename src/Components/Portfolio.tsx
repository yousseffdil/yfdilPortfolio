import { useState } from "react";
import { Youtube, Sparkles, Moon, Sun } from "lucide-react";

import AboutMe from "./AboutMe";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import { Button } from "./button";
import CanvasThreejs from "./CanvasThreejs";
export default function PortFolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useState(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
  });
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div
      className={`min-h-screen font-mono p-4 cursor-none transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900 text-yellow-300"
          : "bg-yellow-100 text-gray-900"
      }`}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none ${
          isDarkMode ? "bg-yellow-300" : "bg-gray-900"
        }`}
        style={{
          transform: `translate(${cursorPosition.x - 12}px, ${
            cursorPosition.y - 12
          }px)`,
          transition: "transform 0s ease-out",
          mixBlendMode: isDarkMode ? "difference" : "normal",
          zIndex: 9999,
        }}
      />

      <header
        className={`mb-8 pb-4 ${
          isDarkMode
            ? "border-b-4 border-yellow-300"
            : "border-b-4 border-gray-900"
        }`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold mb-2">&lt;YOUSSEF FDIL /&gt;</h1>
          <Button
            size="icon"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setCursorPosition({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              });
              toggleTheme();
            }}
            className={
              isDarkMode
                ? "bg-yellow-300 text-gray-900"
                : "bg-gray-900 text-yellow-300"
            }
          >
            {isDarkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        <p className="text-2xl">
          FRONTEND DEVELOPER | UI/UX ENTHUSIAST | CODE ARTIST
        </p>
        <div
          className={`mt-4 p-2 font-bold  ${
            isDarkMode ? "bg-gray-800" : "bg-yellow-200"
          } inline-block`}
        >
          <p className="text-sm font-bold">CURRENT STATUS: WORKING...</p>
        </div>
      </header>

      <nav className="mb-8 flex flex-wrap gap-4">
        {["about", "skills", "projects", "contact"].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 border-2 transition-colors ${
              isDarkMode
                ? `border-yellow-300 hover:bg-yellow-300 hover:text-gray-900 ${
                    activeSection === section
                      ? "bg-yellow-300 text-gray-900"
                      : ""
                  }`
                : `border-gray-900 hover:bg-gray-900 hover:text-yellow-100 ${
                    activeSection === section
                      ? "bg-gray-900 text-yellow-100"
                      : ""
                  }`
            }`}
          >
            &lt;{section.toUpperCase()} /&gt;
          </button>
        ))}
      </nav>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activeSection === "about" && <AboutMe isDarkMode={isDarkMode} />}
        {activeSection === "skills" && <Skills isDarkMode={isDarkMode} />}
        {activeSection === "projects" && <Projects isDarkMode={isDarkMode} />}
        {activeSection === "contact" && <Contact isDarkMode={isDarkMode} />}

        <aside
          className={`border-4 p-6 ${
            isDarkMode ? "border-yellow-300" : "border-gray-900"
          }`}
        >
          <h2 className="text-3xl mb-4 flex items-center">
            <Youtube className="mr-2" />
            <Sparkles className="mr-2" />
            MY YOUTUBE CHANNEL !!!
          </h2>
          <p>
            In this Youtube Channel is where i upload all my music or creative
            things that i do in my free time, i hope you enjoy it! 🎶
          </p>
          <a
            href="https://www.youtube.com/@YFB_Prod/videos"
            className="underline hover:text-pink-400 transition-colors"
          >
            Go to Channel
          </a>
        <CanvasThreejs isDarkMode={isDarkMode} />
        </aside>
      </main>
      {/* <footer className="mt-12 text-center border-t-4 border-gray-900 pt-4"> */}
      <footer
        className={`mt-12 text-center border-t-4 ${
          isDarkMode
            ? "border-t-4 border-yellow-300"
            : "border-t-4 border-gray-900"
        }`}
      >
        <p>
          &copy; {new Date().getFullYear()} FDIL YOUSSEF | CRAFTED WITH &lt;CODE
          /&gt; & &lt;CREATIVITY /&gt;
        </p>
      </footer>
    </div>
  );
}
