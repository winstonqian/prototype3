const express = require('express');
const router = express.Router();

// Mock employee data (in production, this would be from a database)
const employeeDatabase = {
  'emp001': {
    id: 'emp001',
    name: 'Alex Johnson',
    email: 'alex.johnson@vocaai.com',
    role: 'Software Engineer',
    department: 'Engineering',
    level: 'Senior',
    joinDate: '2022-03-15',
    goals: [
      'Lead a major feature development',
      'Mentor 2 junior engineers',
      'Improve system performance by 20%'
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'System Design', 'Team Leadership'],
    performance: {
      score: 87,
      trend: 'up',
      achievements: [
        'Reduced API response time by 35%',
        'Successfully mentored 2 interns',
        'Led the Q3 feature rollout'
      ],
      feedback: [
        {
          from: 'Manager',
          date: '2024-09-15',
          comment: 'Excellent technical leadership and mentorship'
        }
      ]
    },
    recentActivity: [
      {
        type: 'project',
        title: 'Performance Optimization Initiative',
        status: 'completed',
        date: '2024-10-01'
      },
      {
        type: 'mentorship',
        title: 'Onboarding new team members',
        status: 'ongoing',
        date: '2024-09-20'
      }
    ]
  }
};

/**
 * GET /api/employee/:id
 * Get employee profile data
 */
router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = employeeDatabase[id];

    if (!employee) {
      return res.status(404).json({
        error: 'Employee not found'
      });
    }

    res.json({
      success: true,
      employee
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/employee/:id/dashboard
 * Get dashboard data for employee
 */
router.get('/:id/dashboard', (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = employeeDatabase[id];

    if (!employee) {
      return res.status(404).json({
        error: 'Employee not found'
      });
    }

    // Compile dashboard data
    const dashboardData = {
      profile: {
        name: employee.name,
        role: employee.role,
        department: employee.department,
        level: employee.level
      },
      performance: employee.performance,
      goals: employee.goals,
      recentActivity: employee.recentActivity,
      insights: {
        alignmentScore: 87,
        topStrength: employee.skills[0],
        growthArea: 'Strategic Planning',
        upcomingOpportunities: 2
      }
    };

    res.json({
      success: true,
      dashboard: dashboardData
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
