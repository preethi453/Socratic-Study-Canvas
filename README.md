# Socratic Study Canvas

Socratic Study Canvas is an AI-powered learning platform that transforms unstructured study notes into an interactive knowledge graph. The application leverages Generative AI to extract key concepts, visualize relationships between topics, generate personalized learning insights, and encourage active learning through Socratic questioning.

The project aims to provide a more engaging and structured learning experience by helping students understand concepts rather than simply memorize information.

---

## Features

- AI-powered concept extraction from study notes
- Interactive knowledge graph visualization
- AI-generated explanations for selected concepts
- Socratic question generation to promote active learning
- Personalized AI insights and study recommendations
- Learning analytics dashboard
- Responsive and modern user interface
- Dark and light theme support

---

## Technology Stack

### Frontend

- React.js
- React Router
- React Flow
- Axios
- Lucide React
- CSS3

### Backend

- Node.js
- Express.js
- CORS
- dotenv

### AI Integration

- Groq API
- Llama 3.3 70B Versatile

---

## Project Structure

```text
Socratic-Study-Canvas/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/<your-username>/Socratic-Study-Canvas.git
cd Socratic-Study-Canvas
```

### Install frontend dependencies

```bash
cd frontend
npm install
npm run dev
```

### Install backend dependencies

```bash
cd backend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
GROQ_API_KEY=your_groq_api_key
```

---

## API Endpoints

| Method | Endpoint | Description |
|----------|----------------|--------------------------------|
| POST | `/api/generate` | Generates structured concepts from notes |
| POST | `/api/explain` | Provides AI-generated explanations |
| POST | `/api/insights` | Returns summaries, learning insights, and recommendations |

---

## Screenshots

Include screenshots demonstrating the following sections of the application:

- Landing Page
- Dashboard
- Knowledge Graph
- AI Insights
- Learning Analytics
- Socratic Question Panel

Example directory:

```text
screenshots/
├── landing-page.png
├── dashboard.png
├── knowledge-graph.png
├── ai-insights.png
└── analytics.png
```

---

## Future Improvements

- PDF and DOCX upload support
- Authentication and user profiles
- Flashcard generation
- AI quiz generation
- Export knowledge graphs
- Study history and session management
- Collaborative learning features
- Multi-language support

---

## Learning Outcomes

This project demonstrates practical experience with:

- Full-stack web application development
- RESTful API design
- React component architecture
- AI API integration
- Interactive data visualization
- Responsive UI/UX design
- State management
- Modern frontend development practices

---
## Demo Video

A short demonstration of the application's workflow is available here:

**Google Drive:** https://drive.google.com/file/d/1ridT95DueXkzCRP7yOQtlUcoCDxuYYD6/view?usp=drivesdk

## Author

**Amrutha Preethi**

Computer Science Engineering (Artificial Intelligence & Machine Learning)

GitHub: https://github.com/preethi453

LinkedIn: https://www.linkedin.com/in/amrutha-preethi-700072291/
