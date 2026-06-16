const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetch all matches (summary info)
 */
export async function fetchMatches() {
  const res = await fetch(`${API_BASE_URL}/matches`);
  if (!res.ok) throw new Error('Failed to fetch matches');
  return res.json();
}

/**
 * Fetch detailed match data (events, lineups, tactical shifts, VAR, momentum)
 */
export async function fetchMatchDetails(id) {
  const res = await fetch(`${API_BASE_URL}/matches/${id}`);
  if (!res.ok) throw new Error('Failed to fetch match details');
  return res.json();
}

/**
 * Ask IBM Granite to explain a specific match event
 */
export async function analyzeEvent(matchId, event, customQuestion = '') {
  const res = await fetch(`${API_BASE_URL}/matches/analyze-event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      matchId,
      eventId: event.id,
      eventTitle: event.title,
      eventDetail: event.detail,
      minute: event.minute,
      type: event.type,
      customQuestion
    })
  });
  if (!res.ok) throw new Error('Failed to analyze match event');
  return res.json();
}

/**
 * Ask IBM Granite to explain a tactical shift
 */
export async function analyzeTactics(matchId, tactic) {
  const res = await fetch(`${API_BASE_URL}/matches/analyze-tactics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      matchId,
      tacticTitle: tactic.title,
      tacticSummary: tactic.summary,
      tacticDescription: tactic.description
    })
  });
  if (!res.ok) throw new Error('Failed to analyze tactical shifts');
  return res.json();
}

/**
 * Ask IBM Granite to explain a VAR incident
 */
export async function analyzeVar(matchId, incident, customQuestion = '') {
  const res = await fetch(`${API_BASE_URL}/matches/analyze-var`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      matchId,
      varTitle: incident.title,
      refereeDecision: incident.refereeDecision,
      varResult: incident.varResult,
      rulesReference: incident.rulesReference,
      description: incident.description,
      minute: incident.minute,
      customQuestion
    })
  });
  if (!res.ok) throw new Error('Failed to analyze VAR incident');
  return res.json();
}

/**
 * Ask IBM Granite to analyze momentum shifts in a minute range
 */
export async function analyzeMomentum(matchId, startMinute, endMinute) {
  const res = await fetch(`${API_BASE_URL}/matches/analyze-momentum`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      matchId,
      startMinute,
      endMinute
    })
  });
  if (!res.ok) throw new Error('Failed to analyze momentum window');
  return res.json();
}
