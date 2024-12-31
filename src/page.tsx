import { Canvas } from "@react-three/fiber";
import { SpaceScene } from "./Components/SpaceScene";
import { ThemeToggle } from "./Components/ThemeToggle";
import { CustomCursor } from "./Components/CustomCursor";
import { ContactForm } from "./Components/ContactForm";
import { GitHub, Linkedin, Youtube, Play, Pause } from "react-feather";
import { useEffect, useState } from "react";
import { skills } from "./data/skills";
import { projects } from "./data/projects";
import { experiences } from "./data/experiences";
import { education } from "./data/education";
import { EnhancedScene } from "./Components/AnimatedCube";

export default function Home() {
  const [activatedAnimation, setActivatedAnimation] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(
        window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <CustomCursor />
      <EnhancedScene scrollProgress={scrollProgress} />
      <div className="relative">
        <header className="p-4 border-b border-foreground flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-xl font-bold">Youssef Fdil</h1>
          <nav className="hidden md:flex gap-4 items-center">
            <a href="#Projects">Projects</a>
            <a href="#Experience">Experience</a>
            <a href="#Education">Education</a>
            <a href="#Skills">Skills</a>
            <a href="#Contact">Contact</a>
            <ThemeToggle />
          </nav>
          <div className="md:hidden">
            <details>
              <summary className="cursor-pointer">Menu</summary>
              <nav className="flex flex-col gap-2 mt-2">
                <a href="#Projects">Projects</a>
                <a href="#Experience">Experience</a>
                <a href="#Education">Education</a>
                <a href="#Skills">Skills</a>
                <a href="#Contact">Contact</a>
                <ThemeToggle />
              </nav>
            </details>
          </div>
        </header>
        <main className="p-6 space-y-12 mx-auto max-w-5xl">
          <section className="border border-foreground p-6">
            <h2 className="text-3xl font-bold mb-4">ABOUT ME</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="leading-relaxed text-sm">
                <p>
                  Hi there! I'm currently pursuing a Bachelor's degree in
                  Computer Engineering from Spain, with a strong passion for
                  programming and design.
                </p>
                <p className="mb-2">
                  I'm proficient in several programming languages, and I also
                  have hands-on experience with UI/UX design tools like Figma
                  and Adobe XD.
                </p>
                <p className="mb-2">
                  In my free time, I love editing videos and creating 3D renders
                  using software like Blender & i love make music These creative
                  hobbies help me stay sharp and always ready to learn something
                  new!
                </p>
                <p className="mb-2">
                  These creative hobbies help me stay sharp and always ready to
                  learn something new!
                </p>
                <p className="mb-2">
                  Beyond my technical skills, I'm always looking for ways to
                  grow—whether it's through solving coding challenges or
                  perfecting a design. Every project, big or small, is a chance
                  to learn and innovate.{" "}
                </p>
                <p>
                  I'm excited to apply my skills in the dynamic fields of
                  software development and design. Let's connect and create
                  something amazing together!{" "}
                </p>
              </div>
              <div className="h-25 w-full border border-foreground ">
                <Canvas>
                  <SpaceScene activatedAnimation={activatedAnimation} />
                </Canvas>
              </div>
            </div>
            <div className="mt-3 relative flex justify-end items-center flex flex-row gap-4">
              {activatedAnimation ? (
                <></>
              ) : (
                <div className="flex flex-row gap-1">
                  <p>
                    <strong>Click and drag to explore the scene!</strong>
                  </p>

                  <div className="indicator">
                    <div className="mouse">
                      <div className="wheel"></div>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={() => setActivatedAnimation(!activatedAnimation)}
                className="border border-foreground p-2 cursor-pointer"
              >
                {activatedAnimation ? <Pause /> : <Play />}
              </button>
            </div>
          </section>
          <section className="border border-foreground p-6 relative">
            <h2 className="text-3xl font-bold mb-4" id="Projects">
              PROJECTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="border border-foreground p-4 relative overflow-visible w-full"
                >
                  <div
                    className="flex flex-col h-full justify-between hovered"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <p>{project.description}</p>
                    <GitHub className="mt-2 " />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-foreground p-6">
            <h2 className="text-3xl font-bold mb-4" id="Experience">
              EXPERIENCE
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="border border-foreground p-4">
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  <p className="text-sm">
                    {exp.company} | {exp.period}
                  </p>
                  <p className="mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-foreground p-6">
            <h2 className="text-3xl font-bold mb-4" id="Education">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border border-foreground p-4">
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-sm">
                    {edu.institution} | {edu.year}
                  </p>
                  <p className="mt-2">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-foreground p-6">
            <h2 className="text-3xl font-bold mb-4" id="Skills">
              SKILLS
            </h2>
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-row justify-between gap-4"></div>
              <div className="w-full flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-foreground p-2 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
          <section className="border border-foreground p-6">
            <h2 className="text-3xl font-bold mb-4" id="Contact">
              CONTACT ME
            </h2>
            <ContactForm />
          </section>
        </main>

        <footer className="p-6 border-t border-foreground mt-6 flex justify-between items-center">
          <p>&copy; Youssef Fdil. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="https://github.com/yousseffdil" target="_blank">
              <GitHub />
            </a>
            <a
              href="https://www.linkedin.com/in/youssef-fdil-6b6497187"
              target="_blank"
            >
              <Linkedin />
            </a>
            <a href="https://www.youtube.com/@YFB_Prod/videos" target="_blank">
              <Youtube />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
