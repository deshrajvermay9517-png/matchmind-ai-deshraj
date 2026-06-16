import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import matchRoutes from './routes/matchRoutes.js';
import { hasCredentials } from './services/aiService.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend development server
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/matches', matchRoutes);

// Health check and environment diagnostic
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date(),
    aiProvider: hasCredentials() ? 'IBM watsonx.ai (Granite)' : 'Local Smart Simulator (Granite Mock)',
    modelId: process.env.WATSONX_MODEL_ID || 'ibm/granite-13b-chat-v2'
  });
});

// Root path serving API status
app.get('/', (req, res) => {
  res.send('MatchMind AI Backend API is running. Go to /api/matches to fetch events.');
});

// Start listening
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(` MatchMind AI Backend Server running on port ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(` AI Provider: ${hasCredentials() ? 'IBM watsonx.ai (Live)' : 'Mock Simulator (Local Fallback)'}`);
  if (hasCredentials()) {
    console.log(` IBM Model: ${process.env.WATSONX_MODEL_ID || 'ibm/granite-13b-chat-v2'}`);
  } else {
    console.log(` Tip: To enable real IBM Granite, populate .env with watsonx key and project ID`);
  }
  console.log(`===================================================`);
});
