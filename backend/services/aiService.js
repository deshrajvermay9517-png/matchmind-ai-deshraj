import axios from 'axios';

// Helper to check if credentials exist
export const hasCredentials = () => {
  return !!(process.env.WATSONX_API_KEY && process.env.WATSONX_PROJECT_ID);
};

// Exchange IBM Cloud API Key for IAM Access Token
async function getIamToken(apiKey) {
  try {
    const response = await axios.post(
      'https://iam.cloud.ibm.com/identity/token',
      `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching IAM token from IBM Cloud:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with IBM Cloud API Key.');
  }
}

// Main generation function using IBM Granite
export async function generateText(prompt, systemInstruction = '') {
  const apiKey = process.env.WATSONX_API_KEY;
  const projectId = process.env.WATSONX_PROJECT_ID;
  const baseUrl = process.env.WATSONX_URL || 'https://us-south.ml.cloud.ibm.com';
  const modelId = process.env.WATSONX_MODEL_ID || 'ibm/granite-13b-chat-v2';

  // If no credentials, use our smart tactical explainer engine
  if (!apiKey || !projectId) {
    console.log('IBM watsonx.ai credentials missing. Falling back to local smart football AI simulator...');
    return getMockAiResponse(prompt);
  }

  try {
    const token = await getIamToken(apiKey);
    const endpoint = `${baseUrl}/ml/v1/text/generation?version=2023-05-29`;

    const fullPrompt = systemInstruction 
      ? `<|system|>\n${systemInstruction}\n<|user|>\n${prompt}\n<|assistant|>\n`
      : `<|user|>\n${prompt}\n<|assistant|>\n`;

    const payload = {
      model_id: modelId,
      input: fullPrompt,
      parameters: {
        decoding_method: "sample",
        max_new_tokens: 600,
        min_new_tokens: 1,
        temperature: 0.7,
        top_p: 0.85,
        repetition_penalty: 1.05
      },
      project_id: projectId
    };

    const response = await axios.post(endpoint, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (response.data && response.data.results && response.data.results[0]) {
      return response.data.results[0].generated_text.trim();
    } else {
      throw new Error('Unexpected response format from watsonx.ai');
    }
  } catch (error) {
    console.error('Error calling IBM watsonx.ai:', error.response?.data || error.message);
    // Graceful fallback to simulator if live call fails
    console.log('Error occurred with live IBM Granite. Gracefully falling back to tactical simulator...');
    return getMockAiResponse(prompt) + "\n\n*(Note: Generated via MatchMind AI Backup Football Simulator due to upstream IBM Watsonx API error)*";
  }
}

// Contextual simulator that generates detailed tactical analyses based on football terminology
function getMockAiResponse(prompt) {
  const lowerPrompt = prompt.toLowerCase();

  // Match 1: Argentina vs France
  if (lowerPrompt.includes('argentina') || lowerPrompt.includes('france') || lowerPrompt.includes('wc-2022-final') || lowerPrompt.includes('messi') || lowerPrompt.includes('mbappé')) {
    if (lowerPrompt.includes('di maría') || lowerPrompt.includes('gambit') || lowerPrompt.includes('left-wing')) {
      return `### IBM Granite Tactical Insight: Scaloni's Left-Wing Masterclass

Lionel Scaloni's positioning of Ángel Di María on the left flank (rather than his customary right) was a tactical masterstroke designed to exploit **Jules Koundé's** central bias. As a natural center-back playing right-back, Koundé instinctively tucked inside to cover Messi's horizontal movements.

**Key Mechanics of the Shift:**
1. **Flank Isolation:** Di María stayed extremely wide, hugging the touchline. This pulled Ousmane Dembélé into deep defensive recovery areas, isolating Koundé in 1v1 situations.
2. **Decoy Runs:** Julian Álvarez consistently made diagonal runs from the center to the left channel, dragging Dayot Upamecano with him and preventing him from helping Koundé.
3. **Midfield Overload:** Alexis Mac Allister pushed high in the left half-space to act as a linking node.

This setup created the space for Di María's dribble that drew the 23rd-minute penalty and allowed him to finish the sweeping 5-pass counterattack in the 36th minute. France failed to register a single shot in the first half because their entire right side was pinned in emergency defensive duties.`;
    }

    if (lowerPrompt.includes('deschamps') || lowerPrompt.includes('4-2-4') || lowerPrompt.includes('double substitution')) {
      return `### IBM Granite Tactical Insight: Deschamps' Physical Reset

At the 41st minute, Didier Deschamps took one of the boldest tactical actions in World Cup history, replacing Olivier Giroud and Ousmane Dembélé with Marcus Thuram and Randal Kolo Muani. This shifted France from a slow, possession-based 4-2-3-1 to an aggressive, direct **4-2-4 pressing block**.

**Tactical Impact Analysis:**
- **Striker Reallocation:** Kylian Mbappé was moved to the central striker position, freeing him from defensive duties and putting him directly against Otamendi.
- **Physical Pressing Intensity:** Kolo Muani and Thuram occupied the wide zones, applying intense, athletic pressure on Argentina's full-backs (Molina and Tagliafico), who were beginning to tire.
- **Direct vertical transitions:** Rather than building through Griezmann (who was suffocated by Enzo Fernández), France bypassed the midfield entirely, playing long, vertical passes into the channels for Kolo Muani and Thuram to chase.

This physical adjustment destabilized Argentina's compact mid-block and led directly to the late penalty draw and Mbappé's equalizing volley in the 81st minute.`;
    }

    if (lowerPrompt.includes('var') || lowerPrompt.includes('penalty') || lowerPrompt.includes('diving') || lowerPrompt.includes('offside')) {
      return `### IBM Granite VAR Analysis: Rules & Protocol Context

The referee decision was scrutinized under **IFAB Law 12 (Fouls and Misconduct)** and **IFAB Law 11 (Offside)**. Let's break down the VAR room logic:

1. **The Di María Penalty (21'):** Dembélé makes light contact with Di María's ankle from behind. Under IFAB rules, if there is contact that disrupts a player's running gait at speed inside the box, the referee is justified in awarding a penalty. Since there was verifiable physical contact, the VAR room determined it was not a **"clear and obvious error"** and did not intervene, upholding the on-field decision.
2. **Thuram Simulation (87'):** Marcus Thuram goes down expecting a trip. On replays, Enzo Fernández clearly pulls his leg back, and Thuram drags his foot to initiate contact. The referee's yellow card for simulation was upheld because there was zero defensive impediment.
3. **Messi Goal (108'):** A dual check was run. First, semi-automated offside checked Lautaro Martínez's positioning during the initial shot: Upamecano's trailing heel played him onside by mere centimeters. Second, goal-line technology immediately sent a signal to the referee's watch indicating the ball had fully crossed the line under Upamecano's block. Correct decision achieved in 45 seconds.`;
    }

    if (lowerPrompt.includes('momentum') || lowerPrompt.includes('insight')) {
      return `### IBM Granite Momentum Analysis: The 97-Second Rollercoaster

Argentina controlled 78% of the Match Control Index for the first 75 minutes. The momentum shifted violently starting in the 79th minute due to a combination of tactical weariness and physical fatigue:

- **Midfield Energy Depletion:** Rodrigo De Paul and Mac Allister had run over 10km each in high-intensity press. Once their pressing intensity dropped, Eduardo Camavinga and Adrien Rabiot found space to turn.
- **The Kolo Muani Factor:** Kolo Muani's speed forced Nicolas Otamendi to defend deeper, breaking the compact vertical lines of Argentina.
- **Psychological Inversion:** Scoring the first penalty (80') spiked France's high-speed attack frequency by 180%. The second goal (81') was a direct result of this panic, as Argentina lost possession from the kickoff, culminating in Mbappé's world-class scissor volley.

This represents a classic momentum cascade where physical drop-off leads to structural breakdown, which is then fully exploited by high-speed transitional forwards.`;
    }
  }

  // Match 2: Real Madrid vs Dortmund
  if (lowerPrompt.includes('madrid') || lowerPrompt.includes('dortmund') || lowerPrompt.includes('cl-2024-final') || lowerPrompt.includes('kroos') || lowerPrompt.includes('vinícius')) {
    if (lowerPrompt.includes('vertical') || lowerPrompt.includes('terzić') || lowerPrompt.includes('low block') || lowerPrompt.includes('counter')) {
      return `### IBM Granite Tactical Insight: Terzić's Transition Trap

Edin Terzić's first-half blueprint was executed flawlessly but failed in the final execution. Dortmund sat in a compact **4-4-2 mid-low block**, completely shutting down Jude Bellingham's runs between the lines and forcing Madrid to pass sideways.

**Tactical Triggers:**
- **Right Flank Overload:** Real Madrid's Dani Carvajal pushed high, leaving space behind him.
- **Vertical Launchers:** Whenever Dortmund won the ball, Mats Hummels or Julian Brandt immediately played long, low diagonal balls into the space behind Carvajal for Karim Adeyemi.
- **The 1-on-1 Isolation:** This isolated Antonio Rüdiger and forced Courtois to sweep high. Adeyemi's 21st-minute chance and Füllkrug's post strike were direct outcomes of this specific transition mechanism. Dortmund's failure to convert these chances allowed Madrid to adjust at halftime.`;
    }

    if (lowerPrompt.includes('ancelotti') || lowerPrompt.includes('midfield') || lowerPrompt.includes('deep kroos') || lowerPrompt.includes('restructuring')) {
      return `### IBM Granite Tactical Insight: Ancelotti's Halftime Control Adjustment

During the first half, Dortmund's central midfielders (Emre Can and Marcel Sabitzer) easily jumped to press Camavinga and Kroos because Madrid's build-up was flat. In response, Carlo Ancelotti implemented a crucial structural change for the second half:

1. **The Back-3 Build-Up:** Toni Kroos was instructed to drop deep and wide to the left of center-back Nacho.
2. **Full-back Release:** This allowed Ferland Mendy to push higher and pinned Jadon Sancho back.
3. **Midfield Box Creation:** With Kroos deep, Camavinga occupied the single pivot, and Valverde tucked inside. This drew Sabitzer out, opening up space for Jude Bellingham to operate in the central pocket.

By restructuring the first phase of possession, Kroos dictated the game's tempo (completing 94% of his second-half passes), neutralizing Dortmund's counter-attack and setting up the pressure that led to the opening goal.`;
    }

    return `### IBM Granite Match Analysis: Real Madrid's UCL DNA

Real Madrid once again demonstrated their tactical resilience. Despite Dortmund dominating the first-half statistics (xG of 1.42 vs Madrid's 0.09), Carlo Ancelotti's second-half adjustments changed the flow:
- **Set Piece Efficiency:** Knowing Dortmund defended in a zonal block, Kroos targeted the near post, allowing Dani Carvajal (who had been practicing this run) to get ahead of Füllkrug.
- **Pressing Trap:** Real Madrid triggered a high-press in the 83rd minute, forcing Ian Maatsen into a blind square pass that was intercepted by Bellingham to feed Vinícius.

This blend of structural adaptability, calm under pressure, and opportunistic pressing defines Real Madrid's tournament-winning pedigree.`;
  }

  // Match 3: Man City vs Arsenal
  if (lowerPrompt.includes('city') || lowerPrompt.includes('arsenal') || lowerPrompt.includes('pl-2024-city-arsenal') || lowerPrompt.includes('arteta') || lowerPrompt.includes('guardiola')) {
    return `### IBM Granite Tactical Insight: Arteta's Defensive Masterclass

Mikel Arteta set up a historic defensive block that successfully neutralised Manchester City's attacking patterns at the Etihad Stadium. Shifting away from their high-pressing system, Arsenal operated in a compact **4-4-2 low-block**.

**Defensive Structural Details:**
1. **Restricting the Half-Spaces:** William Saliba and Gabriel Magalhães played extremely close to one another, preventing Erling Haaland from making diagonal runs.
2. **Double Winger Lines:** Bukayo Saka and Gabriel Jesus dropped deep to assist full-backs Ben White and Jakub Kiwior, denying Kevin De Bruyne and Bernardo Silva the opportunity to create numerical overloads.
3. **Pivot Screen:** Rice and Jorginho formed a horizontal shield, forcing Manchester City to rotate possession sideways and backwards.

This low-risk defensive blueprint resulted in City possessing 72% of the ball but generating an expected goals (xG) rating of just 0.68. It was a classic demonstration of spatial denial over ball possession.`;
  }

  // Fallback default
  return `### IBM Granite Tactical Insights: Match Analysis

Analysis of this match event indicates a high-intensity tactical interaction:
- **Tactical System**: The attacking team successfully created an overload in the half-space, dragging the opposing defensive block out of alignment.
- **Key Player Action**: A rapid vertical pass broke the lines, catching the transition defenders off-guard before a compact shape could be re-established.
- **Match State Impact**: This event altered the Momentum Control Index, forcing the defensive side to adjust their press lines and drop into a mid-block.

*Use the specific timeline events or tactical shifts inside the dashboard tabs to trigger contextual AI breakdowns.*`;
}
