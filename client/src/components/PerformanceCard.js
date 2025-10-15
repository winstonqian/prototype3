import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';
import './Cards.css';

function PerformanceCard({ performance }) {
  const getTrendIcon = (trend) => {
    if (trend === 'up') return <FiTrendingUp className="trend-up" />;
    if (trend === 'down') return <FiTrendingDown className="trend-down" />;
    return <FiMinus className="trend-neutral" />;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div className="card performance-card">
      <div className="card-header">
        <h3 className="card-title">Performance Overview</h3>
        {performance.trend && (
          <div className="trend-indicator">
            {getTrendIcon(performance.trend)}
          </div>
        )}
      </div>
      
      <div className="performance-score">
        <div className="score-display">
          <span className="score-number" style={{ color: getScoreColor(performance.score) }}>
            {performance.score}
          </span>
          <span className="score-max">/100</span>
        </div>
        <div className="score-bar">
          <div 
            className="score-fill"
            style={{ 
              width: `${performance.score}%`,
              backgroundColor: getScoreColor(performance.score)
            }}
          />
        </div>
      </div>

      <div className="achievements-section">
        <h4 className="section-subtitle">Recent Achievements</h4>
        <ul className="achievements-list">
          {performance.achievements.slice(0, 3).map((achievement, index) => (
            <li key={index} className="achievement-item">
              <span className="achievement-bullet">✓</span>
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PerformanceCard;
