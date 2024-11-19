import { Code } from "lucide-react";
export default function Skills() {
  return (
    <>
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
              <li>Angular.js</li>
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
              <li>Blender</li>
              <li>Adobe Premiere, After Effects, Media Encoder, Photoshop, Illustrator</li>
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
    </>
  );
}
