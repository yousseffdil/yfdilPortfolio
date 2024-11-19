import { Mail, Github, Linkedin, Instagram } from "lucide-react";

export default function Contact() {
  return (
    <>
      <section className="border-4 border-lime-300 p-6">
        <h2 className="text-3xl mb-4 flex items-center">
          <Mail className="mr-2" /> GET IN TOUCH
        </h2>
        <p className="mb-4">
          I'm always open to new opportunities, collaborations, or just a
          friendly chat about web development.
        </p>
        <a
          href="mailto:fdilyoussef@gmail.com"
          className="text-xl underline hover:text-pink-400 transition-colors"
        >
          fdilyoussef@gmail.com
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
    </>
  );
}
