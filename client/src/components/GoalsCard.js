import React from 'react';
import { FiTarget, FiCheckCircle } from 'react-icons/fi';
import './Cards.css';

function GoalsCard({ goals }) {
  return (
    <div className="card goals-card">
      <div className="card-header">
        <h3 className="card-title">
          <FiTarget className="card-icon" />
          Your Goals
        </h3>
      </div>
      
      <ul className="goals-list">
        {goals.map((goal, index) => (
          <li key={index} className="goal-item">
            <div className="goal-checkbox">
              <FiCheckCircle size={20} />
            </div>
            <span className="goal-text">{goal}</span>
          </li>
        ))}
      </ul>

      <button className="add-goal-button">
        + Add New Goal
      </button>
    </div>
  );
}

export default GoalsCard;
