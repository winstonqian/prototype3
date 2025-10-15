import React from 'react';
import { FiZap, FiStar, FiTrendingUp, FiTarget } from 'react-icons/fi';
import './Cards.css';

function InsightsCard({ insights }) {
  return (
    <div className="card insights-card">
      <div className="card-header">
        <h3 className="card-title">
          <FiZap className="card-icon" />
          Quick Insights
        </h3>
      </div>
      
      <div className="insights-grid">
        <div className="insight-item">
          <div className="insight-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <FiTrendingUp size={20} />
          </div>
          <div className="insight-content">
            <p className="insight-label">Alignment Score</p>
            <p className="insight-value">{insights.alignmentScore}%</p>
          </div>
        </div>

        <div className="insight-item">
          <div className="insight-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <FiStar size={20} />
          </div>
          <div className="insight-content">
            <p className="insight-label">Top Strength</p>
            <p className="insight-value">{insights.topStrength}</p>
          </div>
        </div>

        <div className="insight-item">
          <div className="insight-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <FiTarget size={20} />
          </div>
          <div className="insight-content">
            <p className="insight-label">Growth Area</p>
            <p className="insight-value">{insights.growthArea}</p>
          </div>
        </div>

        <div className="insight-item">
          <div className="insight-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <FiZap size={20} />
          </div>
          <div className="insight-content">
            <p className="insight-label">Opportunities</p>
            <p className="insight-value">{insights.upcomingOpportunities}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightsCard;
