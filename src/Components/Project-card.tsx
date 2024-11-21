// in this component is showed the projects i made, you can see the code and the demo of them, i hope you like it! 🚀

const  ProjectCard = ({ tittle, description, link, isDarkMode }: { tittle: string; description: string; link: string; isDarkMode: boolean; }) => {
  return (
    <>
      <div className={`p-6 ${isDarkMode ? "bg-gray-800" : "bg-yellow-200"}` }>
        <h3 className="text-xl font-bold">{tittle}</h3>
        <p className="mb-2">
        {description}
        </p>
        <a
          href={link}
          className="underline hover:text-pink-400 transition-colors"
        >
          View Project
        </a>
      </div>
    </>
  );
}

export default ProjectCard;