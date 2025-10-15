# Voca AI - Employee Dashboard with AI Chatbot

<div align="center">

![Voca AI Logo](https://img.shields.io/badge/Voca-AI-purple?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**A data-driven organizational engine that helps align knowledge and actions across every level of a company**

</div>

---

## 🌟 Overview

Voca AI is an innovative platform that enables employees, managers, and executives to work in sync by combining personal dashboards with intelligent AI agents. The employee dashboard features an **AI Analysis Panel** that provides:

- 🎯 **Alignment Gap Analysis** - Identify misalignments between personal goals and company objectives
- 💡 **Actionable Insights** - Get personalized recommendations for career growth
- 🚀 **Opportunity Highlighting** - Discover ways to contribute more effectively
- 📊 **Performance Analytics** - Track and improve your organizational impact

Think of the company as a car: traditionally, only founders and managers control the steering wheel, but with Voca AI, **everyone has a hand on the wheel**—with influence weighted by role—ensuring unified movement toward shared goals.

---

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 18
- Axios for API communication
- React Icons for UI elements
- CSS3 with modern gradients and animations

**Backend:**
- Node.js with Express
- OpenAI GPT-4 integration
- RESTful API architecture
- Environment-based configuration

**AI Integration:**
- OpenAI Chat Completions API
- Context-aware conversation management
- Intelligent alignment analysis
- Simulated responses for demo mode

---

## 📁 Project Structure

```
prototype3/
├── client/                     # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Dashboard.js           # Main dashboard component
│       │   ├── Dashboard.css
│       │   ├── ChatBot.js            # AI chatbot interface
│       │   ├── ChatBot.css
│       │   ├── PerformanceCard.js    # Performance metrics display
│       │   ├── GoalsCard.js          # Goals management
│       │   ├── InsightsCard.js       # Quick insights panel
│       │   └── Cards.css             # Shared card styling
│       ├── App.js
│       ├── App.css
│       └── index.js
│
├── server/                    # Node.js backend
│   ├── routes/
│   │   ├── chat.js                   # Chat API endpoints
│   │   └── employee.js               # Employee data endpoints
│   ├── services/
│   │   └── aiService.js              # OpenAI integration & AI logic
│   └── index.js                      # Express server setup
│
├── package.json               # Root package.json
├── .env.example              # Environment variables template
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **OpenAI API Key** (optional - demo mode works without it)

### Installation

1. **Clone the repository**
   ```bash
   cd /Users/winstonqian/Desktop/homework6/prototype3
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```
   This will install dependencies for both the backend and frontend.

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```
   
   **Note:** If you don't have an OpenAI API key, the system will work in demo mode with simulated AI responses.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend React app on `http://localhost:3000`

5. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 🎮 Usage

### Employee Dashboard Features

1. **Quick Stats**
   - View department and alignment score at a glance
   - Monitor key performance indicators

2. **Performance Overview**
   - Current performance score with visual indicators
   - Recent achievements and feedback
   - Trend analysis

3. **Goals Management**
   - View and track personal goals
   - Align goals with company objectives
   - Add new goals for continuous improvement

4. **Quick Insights**
   - Alignment score
   - Top strengths
   - Growth areas
   - Upcoming opportunities

### AI Chatbot Panel

#### Starting a Conversation

The AI assistant greets you automatically and is ready to help. You can:

- **Type custom questions** in the input field
- **Use quick prompts** for common queries:
  - "What are my alignment gaps?"
  - "How can I grow my career?"
  - "What opportunities should I pursue?"
  - "How's my performance trending?"

#### Getting Alignment Analysis

Click the **trending-up icon** (📈) in the chatbot header to get a comprehensive alignment analysis:

- **Alignment Score** - Overall score out of 100
- **Gaps** - Identified areas for improvement with impact levels
- **Opportunities** - High-potential areas to contribute
- **Recommendations** - Actionable steps to improve alignment

#### Managing Chat History

Click the **refresh icon** (🔄) to clear your chat history and start fresh.

### Example Conversations

**Career Growth:**
```
User: "How can I advance in my career?"
AI: "Based on your profile, here are personalized recommendations:
     - Volunteer for cross-functional projects
     - Set up 1-on-1s with senior engineers
     - Document your process improvements..."
```

**Alignment Check:**
```
User: "What are my alignment gaps?"
AI: "I've identified some alignment opportunities:
     1. Cross-Department Collaboration: Your skills in JavaScript 
        could benefit the upcoming Engineering initiative...
     2. Skill Development: Consider enhancing your React capabilities..."
```

---

## 🔧 API Documentation

### Backend Endpoints

#### Chat Endpoints

**POST `/api/chat/message`**

Send a message to the AI chatbot.

Request body:
```json
{
  "message": "How can I improve my performance?",
  "employeeId": "emp001"
}
```

Response:
```json
{
  "success": true,
  "message": "Based on your current performance...",
  "timestamp": "2024-10-15T10:30:00Z"
}
```

**POST `/api/chat/analyze`**

Get alignment analysis for an employee.

Request body:
```json
{
  "employeeId": "emp001"
}
```

Response:
```json
{
  "success": true,
  "analysis": {
    "score": 87,
    "gaps": [...],
    "opportunities": [...],
    "recommendations": [...]
  },
  "timestamp": "2024-10-15T10:30:00Z"
}
```

**DELETE `/api/chat/history/:employeeId`**

Clear chat history for an employee.

#### Employee Endpoints

**GET `/api/employee/:id`**

Get employee profile data.

**GET `/api/employee/:id/dashboard`**

Get dashboard data for employee including performance, goals, and insights.

---

## 🤖 AI Service Details

### OpenAI Integration

The AI service uses GPT-4 to provide intelligent, context-aware responses:

- **System Prompt**: Initialized with employee context (role, goals, skills, performance)
- **Conversation Memory**: Maintains last 20 messages for context
- **Personalization**: Responses tailored to individual employee data
- **Fallback Mode**: Simulated responses when API key is not available

### Alignment Analysis Algorithm

The system calculates alignment scores based on:

1. **Goal Alignment (30-40%)**: Number and quality of defined goals
2. **Performance Alignment (40%)**: Current performance score
3. **Skill Alignment (20-30%)**: Breadth and depth of skills

Gap identification considers:
- Missing or incomplete goals
- Performance below 80%
- Limited skill diversity

---

## 🎨 Customization

### Adding New Employee Data

Edit `server/routes/chat.js` and `server/routes/employee.js` to add more employee profiles:

```javascript
const employeeData = {
  'emp002': {
    id: 'emp002',
    name: 'Jane Smith',
    role: 'Product Manager',
    // ... more data
  }
};
```

### Customizing AI Behavior

Modify `server/services/aiService.js` to adjust:

- System prompt for different AI personality
- Conversation history length
- Analysis scoring algorithm
- Simulated response templates

### Styling

All CSS files are in `client/src/components/`:
- `Dashboard.css` - Main dashboard layout
- `ChatBot.css` - Chatbot interface styling
- `Cards.css` - Card components styling
- `App.css` - Global styles

---

## 🚢 Production Deployment

### Building for Production

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Set environment variables**
   ```bash
   export NODE_ENV=production
   export OPENAI_API_KEY=your_production_key
   export CLIENT_URL=https://your-domain.com
   ```

3. **Start the server**
   ```bash
   npm start
   ```

### Recommended Hosting

- **Frontend**: Vercel, Netlify, or AWS S3 + CloudFront
- **Backend**: Heroku, AWS EC2, or DigitalOcean
- **Database**: MongoDB Atlas, PostgreSQL, or Firebase (for production data)

---

## 🔐 Security Considerations

1. **API Keys**: Never commit `.env` file. Use environment variables in production.
2. **Authentication**: Implement JWT or OAuth for production
3. **CORS**: Configure proper CORS policies for production domains
4. **Rate Limiting**: Add rate limiting for API endpoints
5. **Data Validation**: Validate all input data
6. **HTTPS**: Use HTTPS in production

---

## 🧪 Testing

### Manual Testing

1. Start the development server
2. Test chat functionality with various prompts
3. Verify alignment analysis calculations
4. Check responsive design on different devices

### Automated Testing (Future Enhancement)

```bash
# Backend tests
npm test

# Frontend tests
cd client && npm test
```

---

## 🗺️ Roadmap

- [ ] **Authentication System** - User login and session management
- [ ] **Database Integration** - PostgreSQL or MongoDB for data persistence
- [ ] **Multi-language Support** - i18n implementation
- [ ] **Advanced Analytics** - Detailed performance dashboards
- [ ] **Team Collaboration** - Manager and team views
- [ ] **Mobile App** - React Native mobile application
- [ ] **Real-time Updates** - WebSocket integration
- [ ] **AI Model Fine-tuning** - Custom model training on company data

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Backend won't start**
- Check if port 5000 is already in use
- Verify all dependencies are installed: `npm install`

**Issue: Frontend can't connect to backend**
- Ensure backend is running on port 5000
- Check CORS configuration in `server/index.js`

**Issue: AI responses are generic**
- Add your OpenAI API key to `.env`
- Restart the backend server

**Issue: Build errors in frontend**
- Delete `node_modules` and run `npm install` again
- Clear React cache: `rm -rf client/node_modules/.cache`

---

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Support

For questions or support, please open an issue on GitHub.

---

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- React team for the amazing framework
- All contributors and testers

---

<div align="center">

**Built with ❤️ for organizational excellence**

[Documentation](README.md) • [Report Bug](https://github.com) • [Request Feature](https://github.com)

</div>
