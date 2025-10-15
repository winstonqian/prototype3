const OpenAI = require('openai');

class AIService {
  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('⚠️  OpenAI API key not found. AI features will be simulated.');
      this.client = null;
    } else {
      this.client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    }
    
    this.conversationHistory = new Map();
  }

  /**
   * Initialize conversation context for an employee
   */
  initializeContext(employeeId, employeeData) {
    const systemPrompt = `You are Voca AI, an intelligent assistant for ${employeeData.name}, a ${employeeData.role} at ${employeeData.department}.

Your role is to:
1. Identify alignment gaps between personal goals and company objectives
2. Provide actionable insights for career growth
3. Highlight opportunities to contribute more effectively
4. Analyze performance metrics and suggest improvements
5. Help navigate organizational dynamics

Employee Context:
- Name: ${employeeData.name}
- Role: ${employeeData.role}
- Department: ${employeeData.department}
- Goals: ${employeeData.goals.join(', ')}
- Skills: ${employeeData.skills.join(', ')}
- Current Performance: ${employeeData.performance.score}/100
- Recent Achievements: ${employeeData.performance.achievements.join(', ')}

Company Context:
- Mission: Align knowledge and actions across all organizational levels
- Values: Collaboration, transparency, data-driven decisions, shared success

Be conversational, supportive, and provide specific, actionable advice. Use the employee's data to personalize your responses.`;

    this.conversationHistory.set(employeeId, [
      { role: 'system', content: systemPrompt }
    ]);
  }

  /**
   * Get AI response for employee query
   */
  async getResponse(employeeId, message, employeeData) {
    // Initialize context if not exists
    if (!this.conversationHistory.has(employeeId)) {
      this.initializeContext(employeeId, employeeData);
    }

    const history = this.conversationHistory.get(employeeId);
    history.push({ role: 'user', content: message });

    // If no OpenAI client, return simulated response
    if (!this.client) {
      return this.getSimulatedResponse(message, employeeData);
    }

    try {
      const completion = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: history,
        temperature: 0.7,
        max_tokens: 500
      });

      const assistantMessage = completion.choices[0].message.content;
      history.push({ role: 'assistant', content: assistantMessage });

      // Keep only last 10 messages to manage token usage
      if (history.length > 21) { // 1 system + 20 messages
        history.splice(1, history.length - 21);
      }

      return assistantMessage;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return this.getSimulatedResponse(message, employeeData);
    }
  }

  /**
   * Simulated response when OpenAI is not available
   */
  getSimulatedResponse(message, employeeData) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('alignment') || lowerMessage.includes('gap')) {
      return `Hi ${employeeData.name}! Based on your current goals (${employeeData.goals[0]}), I've identified some alignment opportunities:\n\n1. **Cross-Department Collaboration**: Your skills in ${employeeData.skills[0]} could benefit the upcoming ${employeeData.department} initiative.\n\n2. **Skill Development**: Consider enhancing your ${employeeData.skills[1]} capabilities to better align with company objectives.\n\n3. **Leadership Opportunity**: Your recent achievement in "${employeeData.performance.achievements[0]}" shows leadership potential.\n\nWould you like specific recommendations for any of these areas?`;
    }
    
    if (lowerMessage.includes('grow') || lowerMessage.includes('career')) {
      return `Great question about career growth! Here are personalized recommendations for you:\n\n✨ **Immediate Actions:**\n- Volunteer for cross-functional projects in your department\n- Set up 1-on-1s with senior ${employeeData.role}s\n- Document your process improvements\n\n📈 **Skill Development:**\n- Your ${employeeData.skills.join(' and ')} skills are strong. Consider adding leadership or strategic planning training.\n\n🎯 **Goal Alignment:**\n- Your goal of "${employeeData.goals[0]}" aligns well with company priorities. Let's create milestones!`;
    }
    
    if (lowerMessage.includes('performance') || lowerMessage.includes('metric')) {
      return `Your current performance score is ${employeeData.performance.score}/100, which is ${employeeData.performance.score >= 80 ? 'excellent' : 'solid'}! 🎯\n\n**Recent Highlights:**\n${employeeData.performance.achievements.map((a, i) => `${i + 1}. ${a}`).join('\n')}\n\n**Areas to Boost:**\n- Increase visibility of your work through regular updates\n- Mentor junior team members to multiply your impact\n- Contribute to strategic discussions in team meetings\n\nYour trajectory is positive. Keep up the great work!`;
    }

    if (lowerMessage.includes('opportunity') || lowerMessage.includes('contribute')) {
      return `I've identified several opportunities for you to contribute more effectively:\n\n🚀 **High-Impact Areas:**\n1. Lead a workshop on ${employeeData.skills[0]} for your team\n2. Participate in the company's innovation challenge\n3. Join the ${employeeData.department} strategy committee\n\n💡 **Quick Wins:**\n- Share your expertise in weekly team syncs\n- Propose process improvements based on your experience\n- Mentor new team members\n\nWhich of these interests you most?`;
    }

    return `Thanks for reaching out! As your AI assistant, I'm here to help you:\n\n• 📊 Analyze your alignment with company goals\n• 🎯 Identify growth opportunities\n• 💪 Strengthen your performance\n• 🤝 Find collaboration opportunities\n\nYou can ask me about:\n- "What are my alignment gaps?"\n- "How can I grow my career?"\n- "What opportunities should I pursue?"\n- "How's my performance trending?"\n\nWhat would you like to explore?`;
  }

  /**
   * Analyze employee alignment with company goals
   */
  async analyzeAlignment(employeeData) {
    const analysis = {
      score: 0,
      gaps: [],
      opportunities: [],
      recommendations: []
    };

    // Calculate alignment score
    const goalAlignment = employeeData.goals.length >= 2 ? 30 : 15;
    const performanceAlignment = (employeeData.performance.score / 100) * 40;
    const skillAlignment = employeeData.skills.length >= 3 ? 30 : 20;
    
    analysis.score = Math.round(goalAlignment + performanceAlignment + skillAlignment);

    // Identify gaps
    if (employeeData.goals.length < 2) {
      analysis.gaps.push({
        area: 'Goal Setting',
        description: 'You have fewer than 2 defined goals. Setting clear goals improves alignment.',
        impact: 'Medium'
      });
    }

    if (employeeData.performance.score < 80) {
      analysis.gaps.push({
        area: 'Performance',
        description: 'There\'s room to improve your performance metrics.',
        impact: 'High'
      });
    }

    // Identify opportunities
    analysis.opportunities.push({
      title: 'Cross-Functional Leadership',
      description: `Lead a ${employeeData.skills[0]} initiative across departments`,
      potential: 'High'
    });

    analysis.opportunities.push({
      title: 'Mentorship Program',
      description: 'Share your expertise with junior team members',
      potential: 'Medium'
    });

    // Generate recommendations
    analysis.recommendations.push(
      `Schedule quarterly alignment reviews with your manager`,
      `Set 2-3 SMART goals that tie to company objectives`,
      `Document your contributions to increase visibility`
    );

    return analysis;
  }

  /**
   * Clear conversation history for an employee
   */
  clearHistory(employeeId) {
    this.conversationHistory.delete(employeeId);
  }
}

module.exports = new AIService();
