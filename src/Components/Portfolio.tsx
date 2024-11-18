import { useState } from 'react'
import { Clipboard, Code, Mail, Sparkles, User, Github, Linkedin, Twitter } from 'lucide-react'

export default function PortFolio() {
  const [activeSection, setActiveSection] = useState('about')
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <div 
      className="min-h-screen bg-purple-900 text-lime-300 font-mono p-4 cursor-none"
      onMouseMove={handleMouseMove}
    >
      <div 
        className="fixed top-0 left-0 w-6 h-6 bg-lime-300 mix-blend-difference rounded-full pointer-events-none"
        style={{ 
          transform: `translate(${cursorPosition.x - 12}px, ${cursorPosition.y - 12}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />

      <header className="mb-8 border-b-4 border-lime-300 pb-4">
        <h1 className="text-5xl font-bold mb-2">&lt;JOHN_DOE /&gt;</h1>
        <p className="text-2xl">FRONTEND DEVELOPER | UI/UX ENTHUSIAST | CODE ARTIST</p>
      </header>

      <nav className="mb-8 flex flex-wrap gap-4">
        {['about', 'skills', 'projects', 'contact'].map((section) => (
          <button 
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 border-2 border-lime-300 hover:bg-lime-300 hover:text-purple-900 transition-colors ${activeSection === section ? 'bg-lime-300 text-purple-900' : ''}`}
          >
            &lt;{section.toUpperCase()} /&gt;
          </button>
        ))}
      </nav>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activeSection === 'about' && (
          <section className="border-4 border-lime-300 p-6">
            <h2 className="text-3xl mb-4 flex items-center"><User className="mr-2" /> ABOUT ME</h2>
            <p className="mb-4">I'm a frontend developer with 5+ years of experience crafting unique, accessible, and performant web experiences. My passion lies in pushing the boundaries of web design while maintaining clean, efficient code.</p>
            <p>When I'm not coding, you can find me experimenting with generative art, contributing to open-source projects, or exploring the latest web technologies.</p>
          </section>
        )}

        {activeSection === 'skills' && (
          <section className="border-4 border-lime-300 p-6">
            <h2 className="text-3xl mb-4 flex items-center"><Code className="mr-2" /> SKILLS & TOOLS</h2>
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

        {activeSection === 'projects' && (
          <section className="border-4 border-lime-300 p-6">
            <h2 className="text-3xl mb-4 flex items-center"><Sparkles className="mr-2" /> FEATURED PROJECTS</h2>
            <ul className="space-y-6">
              <li>
                <h3 className="text-xl font-bold">Brutalist Weather App</h3>
                <p className="mb-2">A weather application with a stark, brutalist interface. Built with React and OpenWeatherMap API.</p>
                <a href="#" className="underline hover:text-pink-400 transition-colors">View Project</a>
              </li>
              <li>
                <h3 className="text-xl font-bold">Minimalist Task Manager</h3>
                <p className="mb-2">A no-frills task management app focusing on simplicity and speed. Uses Vue.js and local storage.</p>
                <a href="#" className="underline hover:text-pink-400 transition-colors">View Project</a>
              </li>
              <li>
                <h3 className="text-xl font-bold">Raw CSS Art Gallery</h3>
                <p className="mb-2">A collection of pure CSS artworks showcasing the power of modern CSS. No JavaScript, just CSS magic.</p>
                <a href="#" className="underline hover:text-pink-400 transition-colors">View Project</a>
              </li>
            </ul>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="border-4 border-lime-300 p-6">
            <h2 className="text-3xl mb-4 flex items-center"><Mail className="mr-2" /> GET IN TOUCH</h2>
            <p className="mb-4">I'm always open to new opportunities, collaborations, or just a friendly chat about web development.</p>
            <a href="mailto:john@example.com" className="text-xl underline hover:text-pink-400 transition-colors">john@example.com</a>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="hover:text-pink-400 transition-colors" aria-label="GitHub Profile">
                <Github size={24} />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors" aria-label="LinkedIn Profile">
                <Linkedin size={24} />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors" aria-label="Twitter Profile">
                <Twitter size={24} />
              </a>
            </div>
          </section>
        )}

        <aside className="border-4 border-lime-300 p-6 h-fit">
          <h2 className="text-3xl mb-4 flex items-center"><Clipboard className="mr-2" /> CODE SNIPPET</h2>
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
        <p>&copy; {new Date().getFullYear()} JOHN_DOE | BRUTALIST_PORTFOLIO | CRAFTED WITH &lt;CODE /&gt; & &lt;CREATIVITY /&gt;</p>
      </footer>
    </div>
  )
}