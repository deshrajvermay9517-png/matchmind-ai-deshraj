import express from 'express';
import { matches } from '../services/mockDataService.js';
import { generateText, hasCredentials } from '../services/aiService.js';

const router = express.Router();

// Get list of all matches (summarized)
router.get('/', (req, res) => {
  const summary = Object.values(matches).map(m => ({
    id: m.id,
    title: m.title,
    competition: m.competition,
    date: m.date,
    venue: m.venue,
    score: m.score,
    teams: m.teams,
    status: m.status
  }));
  res.json(summary);
});

// Get detailed match by ID
router.get('/:id', (req, res) => {
  const match = matches[req.params.id];
  if (!match) {
    return res.status(404).json({ error: 'Match not found' });
  }
  res.json({
    ...match,
    isMockAI: !hasCredentials()
  });
});

// Post endpoint: Analyze a specific match event
router.post('/analyze-event', async (req, res) => {
  const { matchId, eventId, eventTitle, eventDetail, customQuestion } = req.body;
  const match = matches[matchId];
  
  if (!match) {
    return res.status(404).json({ error: 'Match not found' });
  }

  let prompt = `Analyze this football match event from the game: ${match.title} (${match.competition}).\n`;
  prompt += `Event details: At minute ${req.body.minute || 'unknown'}, event type '${req.body.type || 'event'}': ${eventTitle}.\n`;
  prompt += `Description: ${eventDetail || 'None provided'}.\n`;
  
  if (customQuestion) {
    prompt += `Fan question to explain: ${customQuestion}\n`;
  } else {
    prompt += `Please explain the tactical context, how the space was created, player positioning, and the overall impact of this event on the match.\n`;
  }

  const systemInstruction = "You are MatchMind AI, a premium, analytical assistant powered by IBM Granite. Provide insightful, detailed, and clear football tactical explanations. Use professional football terminology like half-spaces, low blocks, transition phases, expected goals (xG), and numerical overloads. Avoid generic summaries.";

  try {
    const analysis = await generateText(prompt, systemInstruction);
    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post endpoint: Analyze a tactical shift
router.post('/analyze-tactics', async (req, res) => {
  const { matchId, tacticTitle, tacticSummary, tacticDescription } = req.body;
  const match = matches[matchId];

  if (!match) {
    return res.status(404).json({ error: 'Match not found' });
  }

  let prompt = `Analyze this tactical shift in the match: ${match.title} (${match.competition}).\n`;
  prompt += `Tactic Title: ${tacticTitle}\n`;
  prompt += `Summary: ${tacticSummary}\n`;
  prompt += `Description: ${tacticDescription}\n`;
  prompt += `Provide a deep tactical breakdown of this strategy. How did the manager restructure the positioning? What was the defensive or offensive counter-measure? Detail the pros and cons and why it succeeded or failed in this match context.`;

  const systemInstruction = "You are MatchMind AI, a world-class tactical analyst powered by IBM Granite. Break down team shapes, formations, player rotations, and managers' strategic setups with depth, precision, and readability. Use bullet points and paragraphs.";

  try {
    const analysis = await generateText(prompt, systemInstruction);
    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post endpoint: Explain VAR Decision and IFAB Rules
router.post('/analyze-var', async (req, res) => {
  const { matchId, varTitle, refereeDecision, varResult, rulesReference, description, customQuestion } = req.body;
  const match = matches[matchId];

  if (!match) {
    return res.status(404).json({ error: 'Match not found' });
  }

  let prompt = `Explain this VAR incident in the match: ${match.title}.\n`;
  prompt += `Incident: ${varTitle} at minute ${req.body.minute || 'unknown'}.\n`;
  prompt += `On-field Decision: ${refereeDecision}\n`;
  prompt += `VAR Check Result: ${varResult}\n`;
  prompt += `IFAB Law Reference: ${rulesReference}\n`;
  prompt += `Incident Description: ${description}\n`;

  if (customQuestion) {
    prompt += `Fan's specific query: ${customQuestion}\n`;
  } else {
    prompt += `Explain in simple but official terms: Why did the VAR reach this decision? How does the referenced IFAB rule apply here? Explain the nuance (e.g. intent, natural position, clear and obvious standard) so fans understand and trust the call.`;
  }

  const systemInstruction = "You are MatchMind AI VAR Companion, powered by IBM Granite. Your job is to educate fans and build trust in officiating by explaining complex refereeing decisions using IFAB laws in a clear, unbiased, and professional manner. Cite the rules where appropriate.";

  try {
    const analysis = await generateText(prompt, systemInstruction);
    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post endpoint: Analyze momentum shifts
router.post('/analyze-momentum', async (req, res) => {
  const { matchId, startMinute, endMinute } = req.body;
  const match = matches[matchId];

  if (!match) {
    return res.status(404).json({ error: 'Match not found' });
  }

  let prompt = `Explain the match momentum shift in: ${match.title}.\n`;
  prompt += `Focus window: Minutes ${startMinute} to ${endMinute} of the match.\n`;
  prompt += `Analyze what physical, tactical, or event-driven factors caused control to shift during this period. Explain how substitutions, cards, goals, or pressing intensity alterations changed the game flow.`;

  const systemInstruction = "You are MatchMind AI Momentum Analyst, powered by IBM Granite. Analyze how momentum indices shift over the course of a match, linking statistics and fatigue levels to in-play game control transitions.";

  try {
    const analysis = await generateText(prompt, systemInstruction);
    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
