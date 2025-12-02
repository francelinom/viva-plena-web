import React from "react";

interface ProgressCircleProps {
  progress: number;
  color: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, color }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg className="w-24 h-24 transform -rotate-90">
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        strokeWidth="5"
        fill="none"
        className="stroke-gray-200 dark:stroke-slate-600"
      />

      <circle
        cx="50%"
        cy="50%"
        r={radius}
        strokeWidth="5"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ stroke: color, transition: "stroke-dashoffset 0.5s" }}
      />

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        className="text-lg font-bold dark:text-white"
      >
        {progress}%
      </text>
    </svg>
  );
};

export default ProgressCircle;
