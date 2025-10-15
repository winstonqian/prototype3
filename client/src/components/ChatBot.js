import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiSend, FiRefreshCw, FiMessageCircle, FiTrendingUp } from 'react-icons/fi';
import './ChatBot.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

function ChatBot({ employeeId, employeeName }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initial greeting
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: `Hi ${employeeName}! 👋 I'm your Voca AI assistant. I'm here to help you identify alignment gaps, grow your career, and maximize your impact. What would you like to explore today?`,
        timestamp: new Date()
      }
    ]);
  }, [employeeName]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat/message`, {
        message: inputMessage,
        employeeId
      });

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.data.message,
        timestamp: new Date(response.data.timestamp)
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/chat/analyze`, {
        employeeId
      });
      setAnalysis(response.data.analysis);
      setShowAnalysis(true);
    } catch (error) {
      console.error('Error getting analysis:', error);
      alert('Failed to get analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear the chat history?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/chat/history/${employeeId}`);
      setMessages([
        {
          id: Date.now(),
          type: 'bot',
          content: `Chat history cleared. How can I help you today?`,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const formatTimestamp = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const quickPrompts = [
    'What are my alignment gaps?',
    'How can I grow my career?',
    'What opportunities should I pursue?',
    'How\'s my performance trending?'
  ];

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-header-left">
          <div className="chatbot-icon">
            <FiMessageCircle size={24} />
          </div>
          <div>
            <h2 className="chatbot-title">AI Analysis Panel</h2>
            <p className="chatbot-subtitle">Your personal guidance system</p>
          </div>
        </div>
        <div className="chatbot-actions">
          <button
            onClick={handleAnalyze}
            className="action-button analyze-button"
            disabled={isLoading}
            title="Get Alignment Analysis"
          >
            <FiTrendingUp size={18} />
          </button>
          <button
            onClick={handleClearHistory}
            className="action-button"
            disabled={isLoading}
            title="Clear Chat History"
          >
            <FiRefreshCw size={18} />
          </button>
        </div>
      </div>

      {!showAnalysis ? (
        <>
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.type}-message ${message.isError ? 'error-message' : ''}`}
              >
                <div className="message-content">
                  {message.content}
                </div>
                <div className="message-timestamp">
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="quick-prompts">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(prompt)}
                className="quick-prompt"
                disabled={isLoading}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="chatbot-input-form">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about your alignment, growth, or opportunities..."
              className="chatbot-input"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="send-button"
              disabled={isLoading || !inputMessage.trim()}
            >
              <FiSend size={20} />
            </button>
          </form>
        </>
      ) : (
        <div className="analysis-view">
          <div className="analysis-header">
            <h3>Alignment Analysis Report</h3>
            <button
              onClick={() => setShowAnalysis(false)}
              className="close-analysis"
            >
              ← Back to Chat
            </button>
          </div>

          <div className="analysis-score">
            <div className="score-circle">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="score-bg" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="score-progress"
                  style={{
                    strokeDasharray: `${analysis.score * 2.83} 283`,
                  }}
                />
              </svg>
              <div className="score-text">
                <span className="score-number">{analysis.score}</span>
                <span className="score-label">/ 100</span>
              </div>
            </div>
            <p className="score-description">Overall Alignment Score</p>
          </div>

          {analysis.gaps.length > 0 && (
            <div className="analysis-section">
              <h4>🔍 Alignment Gaps</h4>
              {analysis.gaps.map((gap, index) => (
                <div key={index} className="analysis-item gap-item">
                  <div className="item-header">
                    <strong>{gap.area}</strong>
                    <span className={`impact-badge ${gap.impact.toLowerCase()}`}>
                      {gap.impact} Impact
                    </span>
                  </div>
                  <p>{gap.description}</p>
                </div>
              ))}
            </div>
          )}

          <div className="analysis-section">
            <h4>🚀 Opportunities</h4>
            {analysis.opportunities.map((opp, index) => (
              <div key={index} className="analysis-item opportunity-item">
                <div className="item-header">
                  <strong>{opp.title}</strong>
                  <span className={`potential-badge ${opp.potential.toLowerCase()}`}>
                    {opp.potential} Potential
                  </span>
                </div>
                <p>{opp.description}</p>
              </div>
            ))}
          </div>

          <div className="analysis-section">
            <h4>💡 Recommendations</h4>
            <ul className="recommendations-list">
              {analysis.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
