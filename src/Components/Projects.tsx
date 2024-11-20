import { Sparkles } from "lucide-react";
export default function Projects({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <>
      <section
        className={`border-4 p-6 ${
          isDarkMode ? "border-yellow-300" : "border-gray-900"
        }`}
      >
        <h2 className="text-3xl mb-4 flex items-center">
          <Sparkles className="mr-2" /> FEATURED PROJECTS
        </h2>
        <ul className="space-y-6">
          <li>
            <h3 className="text-xl font-bold">GRAPHIC 2D ENGINE</h3>
            <p className="mb-2">
              This project is a 2D graphic engine that uses pure C# and the .NET
              framework. It's a simple engine that can render sprites, text, and
              shapes on the screen.
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
              This project is a 3D object tracker using Three.js and the WebGL
              API. It allows you to track the mouse position and rotate the 3D
              object accordingly.
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
              Thats a small AI maded with TensorFlow and python using Jupyter
              NoteBook in Google Colab, that can convert the temperature from
              Celsius to Fahrenheit and vice versa.
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
    </>
  );
}
