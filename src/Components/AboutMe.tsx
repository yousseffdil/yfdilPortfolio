import { User } from "lucide-react";
export default function AboutMe({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <>
      <section
        className={`border-4 p-6 ${
          isDarkMode ? "border-yellow-300" : "border-gray-900"
        }`}
      >
        <h2 className="text-3xl mb-4 flex items-center">
          <User className="mr-2" /> ABOUT ME
        </h2>
        <p className="mb-4">
          👋Hi there! I'm currently pursuing a Bachelor's degree in Computer
          Engineering from Spain, with a strong passion for programming and
          design.I'm proficient in several programming languages 💻, and I also
          have hands-on experience with UI/UX design tools like Figma and Adobe
          XD.<br></br>
          <br></br> 🎨 In my free time, I love editing videos and creating 3D
          renders using software like Blender & i love make music🎶 <br></br>
          These creative hobbies help me stay sharp and always ready to learn
          something new! 🚀<br></br>
          <br></br> 🔧 Beyond my technical skills, I'm always looking for ways
          to grow—whether it's through solving coding challenges or perfecting a
          design. Every project, big or small, is a chance to learn and
          innovate. <br></br>
          <br></br>I'm excited to apply my skills in the dynamic fields of
          software development and design. Let's connect and create something
          amazing together! 🚀
        </p>
      </section>
    </>
  );
}
