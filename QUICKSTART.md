# Voca AI - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm run install-all
```

This command installs all required packages for both backend and frontend.

### 2. Start the Application
```bash
npm run dev
```

This will start both servers:
- Backend API: http://localhost:5000
- Frontend App: http://localhost:3000

### 3. Open Your Browser

Navigate to: **http://localhost:3000**

---

## 🎯 What You'll See

### Employee Dashboard
- **Header**: Your profile with name and role
- **Quick Stats**: Department and alignment score
- **Performance Card**: Your current score and achievements
- **Goals Card**: Personal goals aligned with company objectives
- **Insights Card**: Quick metrics and opportunities

### AI Chatbot Panel (Right Side)
- **Chat Interface**: Ask questions and get AI-powered guidance
- **Quick Prompts**: Click pre-defined questions to get started
- **Analysis Button**: Get comprehensive alignment analysis
- **Clear History**: Reset the conversation

---

## 💬 Try These Prompts

1. "What are my alignment gaps?"
2. "How can I grow my career?"
3. "What opportunities should I pursue?"
4. "How's my performance trending?"
5. "What skills should I develop?"

---

## 🤖 AI Features

### With OpenAI API Key
If you add your OpenAI API key to `.env`:
- Get personalized, intelligent responses
- Context-aware conversation
- Deep analysis of your career path

### Without API Key (Demo Mode)
Works perfectly with simulated responses:
- Pre-programmed intelligent answers
- Covers all common scenarios
- Great for testing and demonstration

---

## 🔧 Optional: Add OpenAI API Key

1. Get an API key from: https://platform.openai.com/api-keys
2. Edit `.env` file in the root directory
3. Add your key: `OPENAI_API_KEY=sk-your-key-here`
4. Restart the server: `npm run dev`

---

## 📱 Features to Explore

### Performance Overview
- View your current performance score
- See recent achievements
- Track performance trends

### Goals Management  
- Review your active goals
- Align personal objectives with company mission
- Add new goals (UI ready, backend to be implemented)

### Quick Insights
- Alignment score with company objectives
- Top strengths identification
- Growth areas to focus on
- Upcoming opportunities count

### AI Analysis Panel
- Real-time chat with AI assistant
- Comprehensive alignment analysis report
- Personalized recommendations
- Actionable insights for career growth

---

## 🎨 UI Features

- **Modern Design**: Gradient backgrounds and smooth animations
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Interactive Cards**: Hover effects and smooth transitions
- **Professional Chat Interface**: WhatsApp-style messaging
- **Visual Analytics**: Progress bars, score circles, and badges

---

## 🛠️ Troubleshooting

**Q: Port 5000 is already in use**
- Change PORT in `.env` to another port (e.g., 5001)
- Kill the process using port 5000: `lsof -ti:5000 | xargs kill -9`

**Q: Frontend won't load**
- Make sure backend is running (check http://localhost:5000/api/health)
- Clear browser cache and reload

**Q: Chat not responding**
- Check browser console for errors
- Verify backend is running and accessible

---

## 📚 Next Steps

1. **Explore the Dashboard**: Navigate through all cards and features
2. **Chat with AI**: Ask different types of questions
3. **Get Analysis**: Click the analysis button for detailed report
4. **Customize**: Modify employee data in backend files
5. **Extend**: Add new features using the modular architecture

---

## 🎓 Learning the Codebase

### Frontend Structure
- `client/src/components/Dashboard.js` - Main dashboard
- `client/src/components/ChatBot.js` - Chat interface
- `client/src/components/*Card.js` - Individual cards

### Backend Structure
- `server/index.js` - Express server setup
- `server/routes/chat.js` - Chat endpoints
- `server/services/aiService.js` - AI logic

---

## 💡 Tips

- Use quick prompts to explore AI capabilities
- Check alignment analysis for comprehensive insights
- Monitor the browser console for API responses
- Experiment with different questions to see AI responses

---

## 🌟 Demo Account

Current demo employee:
- **Name**: Alex Johnson
- **Role**: Software Engineer
- **Department**: Engineering
- **Performance Score**: 87/100

---

**Happy exploring! 🚀**
