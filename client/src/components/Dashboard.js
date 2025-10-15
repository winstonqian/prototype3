import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBot from './ChatBot';
import PerformanceCard from './PerformanceCard';
import GoalsCard from './GoalsCard';
import InsightsCard from './InsightsCard';
import { FiUser, FiBriefcase, FiTrendingUp } from 'react-icons/fi';
import './Dashboard.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

function Dashboard({ employeeId }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, [employeeId]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/employee/${employeeId}/dashboard`);
      setDashboardData(response.data.dashboard);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={fetchDashboardData} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">Voca AI</h1>
            <p className="dashboard-subtitle">Your Personal Organizational Engine</p>
          </div>
          <div className="header-right">
            <div className="user-profile">
              <div className="user-avatar">
                <FiUser size={24} />
              </div>
              <div className="user-info">
                <h3>{dashboardData.profile.name}</h3>
                <p>{dashboardData.profile.role}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-container">
        {/* Left Column - Overview */}
        <div className="dashboard-left">
          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <FiBriefcase size={24} />
              </div>
              <div className="stat-info">
                <p className="stat-label">Department</p>
                <p className="stat-value">{dashboardData.profile.department}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <FiTrendingUp size={24} />
              </div>
              <div className="stat-info">
                <p className="stat-label">Alignment Score</p>
                <p className="stat-value">{dashboardData.insights.alignmentScore}%</p>
              </div>
            </div>
          </div>

          {/* Performance Card */}
          <PerformanceCard performance={dashboardData.performance} />

          {/* Goals Card */}
          <GoalsCard goals={dashboardData.goals} />

          {/* Insights Card */}
          <InsightsCard insights={dashboardData.insights} />
        </div>

        {/* Right Column - AI Chatbot */}
        <div className="dashboard-right">
          <ChatBot employeeId={employeeId} employeeName={dashboardData.profile.name} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
