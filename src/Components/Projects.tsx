import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import ProjectCard from "./Project-card";

export default function Projects({ isDarkMode }: { isDarkMode: boolean }) {
  const [repos, setRepos] = useState<any[]>([]); // Estado para almacenar los repositorios
  const username = "yousseffdil"; // Usuario de GitHub

  useEffect(() => {
    // Función para obtener los repositorios de la API de GitHub
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
          throw new Error("Error fetching repos");
        }
        const data = await response.json();
        setRepos(data); // Almacenar repositorios en el estado
      } catch (error) {
        console.error("Failed to fetch repositories:", error);
      }
    };

    fetchRepos();
  }, []);

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
        {/* Contenedor con altura fija, scroll y estilo personalizado */}
        <ul
          className="space-y-6 h-[70vh] overflow-y-auto scroll-container"
        >
          {repos.map((repo) => (
            <li key={repo.id}>
              <ProjectCard
                tittle={repo.name} // Nombre del repositorio
                description={repo.description || "No description provided"} // Descripción del repositorio
                link={repo.html_url} // Enlace al repositorio
                isDarkMode={isDarkMode}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
