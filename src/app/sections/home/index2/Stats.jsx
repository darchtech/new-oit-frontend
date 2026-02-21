import React, { useEffect, useState } from "react";
import "./Stats.css";
import { FaUserGraduate, FaStar, FaBuilding, FaAward } from "react-icons/fa";

const statsData = [
  {
    icon: <FaUserGraduate />,
    value: 10000,
    suffix: "+",
    title: "Students Trained",
    subtitle: "Successfully completed courses",
  },
  {
    icon: <FaStar />,
    value: 6000,
    suffix: "+",
    title: "Student Placed",
    // subtitle: "4.5 Star Rating",
  },
  {
    icon: <FaBuilding />,
    value: 500,
    suffix: "+",
    title: "Hiring Partners",
    subtitle: "Top MNCs & Startups",
  },
  {
    icon: <FaAward />,
    value: 13,
    suffix: "+",
    title: "Years Experience",
    subtitle: "Industry Excellence",
  },
];

export default function Stats() {
  return (
    <div className="stats-container">
      {statsData.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
}

/* Single Card */
function StatCard({ icon, value, suffix, title, subtitle }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div className="stat-info">
        <h2>
          {count.toLocaleString()}
          {suffix}
        </h2>
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
