const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

// Store employee data (in production, this would be a database)
const employeeData = {
  'emp001': {
    id: 'emp001',
    name: 'Alex Johnson',
    role: 'Software Engineer',
    department: 'Engineering',
    goals: [
      'Lead a major feature development',
      'Mentor 2 junior engineers',
      'Improve system performance by 20%'
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'System Design', 'Team Leadership'],
    performance: {
      score: 87,
      achievements: [
        'Reduced API response time by 35%',
        'Successfully mentored 2 interns',
        'Led the Q3 feature rollout'
      ]
    }
  }
};

/**
 * POST /api/chat/message
 * Send a message to the AI chatbot
 */
router.post('/message', async (req, res, next) => {
  try {
    const { message, employeeId } = req.body;

    if (!message || !employeeId) {
      return res.status(400).json({
        error: 'Message and employeeId are required'
      });
    }

    // Get employee data (in production, fetch from database)
    const employee = employeeData[employeeId] || {
      id: employeeId,
      name: 'Employee',
      role: 'Team Member',
      department: 'General',
      goals: ['Achieve excellence', 'Collaborate effectively'],
      skills: ['Communication', 'Problem Solving'],
      performance: {
        score: 75,
        achievements: ['Completed onboarding', 'First project delivered']
      }
    };

    // Get AI response
    const response = await aiService.getResponse(employeeId, message, employee);

    res.json({
      success: true,
      message: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/chat/analyze
 * Get alignment analysis for an employee
 */
router.post('/analyze', async (req, res, next) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        error: 'employeeId is required'
      });
    }

    // Get employee data
    const employee = employeeData[employeeId] || {
      id: employeeId,
      name: 'Employee',
      role: 'Team Member',
      department: 'General',
      goals: ['Achieve excellence'],
      skills: ['Communication'],
      performance: {
        score: 75,
        achievements: ['Completed onboarding']
      }
    };

    // Get alignment analysis
    const analysis = await aiService.analyzeAlignment(employee);

    res.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/chat/history/:employeeId
 * Clear chat history for an employee
 */
router.delete('/history/:employeeId', (req, res, next) => {
  try {
    const { employeeId } = req.params;

    aiService.clearHistory(employeeId);

    res.json({
      success: true,
      message: 'Chat history cleared'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
