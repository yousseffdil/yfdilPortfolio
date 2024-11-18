import { useState } from "react";
import {
  Clipboard,
  Code,
  Mail,
  Sparkles,
  User,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";

export default function PortFolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };



  return (
    <div
      className="min-h-screen bg-purple-900 text-lime-300 font-mono p-4 cursor-none"
      onMouseMove={handleMouseMove}
    >
      <div
        className="fixed top-0 left-0 w-7 h-7 bg-lime-300 mix-blend-difference rounded-full pointer-events-none"
        style={{
          transform: `translate(${cursorPosition.x - 12}px, ${
            cursorPosition.y - 12
          }px)`,
          transition: "transform 0.2s ease-out",
        }}
      />

      <header className="mb-8 border-b-4 border-lime-300 pb-4">
        <h1 className="text-5xl font-bold mb-2">&lt;YOUSSEF FDIL /&gt;</h1>
        <p className="text-2xl">FULL STACK | UI/UX ENTHUSIAST | CODE ARTIST</p>
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
        {activeSection === "about" && (
          <section className="border-4 border-lime-300 p-6">
            <h2 className="text-3xl mb-4 flex items-center">
              <User className="mr-2" /> ABOUT ME
            </h2>
            <p className="mb-4">
              Hi there! I'm currently pursuing a Bachelor's degree in Computer
              Engineering from Spain, with a strong passion for programming and
              design.I'm proficient in several programming languages 💻, and I
              also have hands-on experience with UI/UX design tools like Figma
              and Adobe XD.<br></br><br></br> 🎨 In my free time, I love editing videos and
              creating 3D renders using software like Blender & i love make
              music🎶 <br></br>These creative hobbies help me stay sharp and always ready
              to learn something new! 🚀<br></br><br></br> 🔧 Beyond my technical skills, I'm
              always looking for ways to grow—whether it's through solving
              coding challenges or perfecting a design. Every project, big or
              small, is a chance to learn and innovate. <br></br><br></br>I'm excited to apply my
              skills in the dynamic fields of software development and design.
              Let's connect and create something amazing together! 🚀
            </p>
          </section>
        )}

        {activeSection === "skills" && (
          <section className="border-4 border-lime-300 p-6">
            <h2 className="text-3xl mb-4 flex items-center">
              <Code className="mr-2" /> SKILLS & TOOLS
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl mb-2">Languages</h3>
                <ul className="list-disc list-inside">
                  <li>HTML5 / CSS3</li>
                  <li>JavaScript (ES6+)</li>
                  <li>TypeScript</li>
                  <li>Python</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl mb-2">Frameworks & Libraries</h3>
                <ul className="list-disc list-inside">
                  <li>React / Next.js</li>
                  <li>Vue.js</li>
                  <li>Tailwind CSS</li>
                  <li>Three.js</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl mb-2">Tools</h3>
                <ul className="list-disc list-inside">
                  <li>Git / GitHub</li>
                  <li>Webpack / Vite</li>
                  <li>Jest / React Testing Library</li>
                  <li>Figma</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl mb-2">Concepts</h3>
                <ul className="list-disc list-inside">
                  <li>Responsive Design</li>
                  <li>Accessibility (A11y)</li>
                  <li>Performance Optimization</li>
                  <li>CI/CD</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeSection === "projects" && (
          <section className="border-4 border-lime-300 p-6">
            <h2 className="text-3xl mb-4 flex items-center">
              <Sparkles className="mr-2" /> FEATURED PROJECTS
            </h2>
            <ul className="space-y-6">
              <li>
                <h3 className="text-xl font-bold">GRAPHIC 2D ENGINE</h3>
                <p className="mb-2">
                  This project is a 2D graphic engine that uses pure C# and the .NET framework. It's a simple engine that can render sprites, text, and shapes on the screen.
                </p>
                <a
                  href="https://github.com/yousseffdil/graphic-engine"
                  className="underline hover:text-pink-400 transition-colors"
                >
                  View Project
                </a>
              </li>
              <li>
                <h3 className="text-xl font-bold">Three Js Tracker Object Mouse</h3>
                <p className="mb-2">
                  This project is a 3D object tracker using Three.js and the WebGL API. It allows you to track the mouse position and rotate the 3D object accordingly.
                </p>
                <a
                  href="https://github.com/yousseffdil/three-js-tracker-object-mouse"
                  className="underline hover:text-pink-400 transition-colors"
                >
                  View Project
                </a>
              </li>
              <li>
                <h3 className="text-xl font-bold">MML Temperature converter</h3>
                <p className="mb-2">
                  Thats a small AI maded with TensorFlow and python using Jupyter NoteBook in Google Colab, that can convert the temperature from Celsius to Fahrenheit and vice versa.
                </p>
                <a
                  href="https://github.com/yousseffdil/Convertidor_tensorflow"
                  className="underline hover:text-pink-400 transition-colors"
                >
                  View Project
                </a>
              </li>
            </ul>
          </section>
        )}

        {activeSection === "contact" && (
          <section className="border-4 border-lime-300 p-6">
            <h2 className="text-3xl mb-4 flex items-center">
              <Mail className="mr-2" /> GET IN TOUCH
            </h2>
            <p className="mb-4">
              I'm always open to new opportunities, collaborations, or just a
              friendly chat about web development.
            </p>
            <a
              href="mailto:fdilyoussef@example.com"
              className="text-xl underline hover:text-pink-400 transition-colors"
            >
              fdilyoussef@example.com
            </a>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://github.com/yousseffdil"
                className="hover:text-pink-400 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/youssef-fdil-6b6497187/"
                className="hover:text-pink-400 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com/fdilyoussef/"
                className="hover:text-pink-400 transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram size={24} />
              </a>
            </div>
          </section>
        )}

        <aside className="border-4 border-lime-300 p-6 h-fit">
          <h2 className="text-3xl mb-4 flex items-center">
            <Clipboard className="mr-2" /> CODE SNIPPET
          </h2>
          <pre className="text-sm overflow-x-auto bg-purple-800 p-4 rounded">
            {`function createBrutalistDesign(element) {
  return {
    style: {
      fontFamily: 'monospace',
      color: '#90EE90', // lime green
      backgroundColor: '#4B0082', // indigo
      border: '4px solid #90EE90',
      padding: '20px',
      margin: '10px 0',
      boxShadow: '10px 10px 0 #FF1493' // deep pink
    },
    applyStyle: () => {
      Object.assign(element.style, this.style);
    }
  };
}`}
          </pre>
        </aside>
      </main>

      <footer className="mt-12 text-center border-t-4 border-lime-300 pt-4">
        <p>
          &copy; {new Date().getFullYear()} FDIL YOUSSEF |
          CRAFTED WITH &lt;CODE /&gt; & &lt;CREATIVITY /&gt;
        </p>
      </footer>
    </div>
  );
}
