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
          ? "bg-purple-900 text-lime-300"
          : "bg-lime-100 text-purple-900"
      }`}
      onMouseMove={handleMouseMove}
    >
      <div
        className="fixed top-0 left-0 w-7 h-7 bg-lime-300 mix-blend-difference rounded-full pointer-events-none"
        style={{
          transform: `translate(${cursorPosition.x - 12}px, ${
            cursorPosition.y - 12
          }px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      <header
        className={`mb-8 pb-4 ${
          isDarkMode
            ? "border-b-4 border-lime-300"
            : "border-b-4 border-purple-900"
        }`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold mb-2">&lt;YOUSSEF FDIL /&gt;</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className={
              isDarkMode
                ? "bg-lime-300 text-purple-900"
                : "bg-purple-900 text-lime-300"
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
      </header>

      <nav className="mb-8 flex flex-wrap gap-4">
        {["about", "skills", "projects", "contact"].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 border-2 border-lime-300 hover:bg-lime-300 hover:text-purple-900 transition-colors ${
              activeSection === section ? "bg-lime-300 text-purple-900" : ""
            }`}
          >
            &lt;{section.toUpperCase()} /&gt;
          </button>
        ))}
      </nav>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activeSection === "about" && <AboutMe />}
        {activeSection === "skills" && <Skills />}
        {activeSection === "projects" && <Projects />}
        {activeSection === "contact" && <Contact />}

        <aside className="border-4 border-lime-300 p-6">
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
          {isDarkMode && (
            <CanvasThreejs mousePosition={cursorPosition} />
          )          
          }
          {
          !isDarkMode && <div className="h-96" />

          }
        </aside>
      </main>
      <footer className="mt-12 text-center border-t-4 border-lime-300 pt-4">
        <p>
          &copy; {new Date().getFullYear()} FDIL YOUSSEF | CRAFTED WITH &lt;CODE
          /&gt; & &lt;CREATIVITY /&gt;
        </p>
      </footer>
    </div>
  );
}
