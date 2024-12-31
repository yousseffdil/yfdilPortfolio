// Import necessary libraries
import { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const GitHubLanguagesRadar = () => {
  const [languages, setLanguages] = useState({});
  const { theme } = useTheme();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('https://api.github.com/users/yousseffdil/repos');
        const repos = await response.json();
        const langCounts: { [key: string]: number } = {};

        for (const repo of repos) {
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          }
        }
        console.log(langCounts);
        setLanguages(langCounts);
      } catch (error) {
        console.error('Error fetching GitHub languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  const data = {
    labels: Object.keys(languages),
    datasets: [
      {
        label: 'Most Used Languages',
        data: Object.values(languages),
        backgroundColor: theme === 'dark' ? 'rgba(52, 144, 235, 0.34)' : 'rgba(235, 143, 52, 0.2)',
        borderColor: theme === 'dark' ? 'rgba(52, 143, 235, 1)' : 'rgba(235, 143, 52, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: theme === 'dark' ? 'rgb(150, 150, 150)' : 'rgb(200, 200, 200)',
        },
        grid: {
          color: theme === 'dark' ? 'rgb(150, 150, 150)' : 'rgb(200, 200, 200)',
        },
        pointLabels: {
          color: theme === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
        },
        suggestedMin: 0,
        ticks:{
            display : false,
        }
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className='border border-foreground p-4' style={{ width: '500px', height: '500px', margin: '0 auto' }} >
        <Radar data={data} options={options} />
    </div>
  );
};

export default GitHubLanguagesRadar;
