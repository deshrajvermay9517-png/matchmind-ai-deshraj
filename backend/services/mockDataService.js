export const matches = {
  "wc-2022-final": {
    id: "wc-2022-final",
    title: "Argentina vs France",
    competition: "FIFA World Cup Final 2022",
    date: "Dec 18, 2022",
    venue: "Lusail Stadium, Qatar",
    referee: "Szymon Marciniak (Poland)",
    score: "3 - 3 (4 - 2 Pens)",
    status: "Completed",
    teams: {
      home: {
        name: "Argentina",
        short: "ARG",
        logo: "🇦🇷",
        color: "#74acdf",
        textColor: "#ffffff"
      },
      away: {
        name: "France",
        short: "FRA",
        logo: "🇫🇷",
        color: "#0f2142",
        textColor: "#ffffff"
      }
    },
    lineups: {
      home: {
        formation: "4-3-3 (Mid-block Press)",
        players: [
          { name: "E. Martínez", number: 23, role: "GK", x: 50, y: 10 },
          { name: "Molina", number: 26, role: "RB", x: 85, y: 30 },
          { name: "Romero", number: 13, role: "CB", x: 65, y: 25 },
          { name: "Otamendi", number: 19, role: "CB", x: 35, y: 25 },
          { name: "Tagliafico", number: 3, role: "LB", x: 15, y: 30 },
          { name: "De Paul", number: 7, role: "RCM", x: 70, y: 50 },
          { name: "Fernández", number: 24, role: "DM", x: 50, y: 45 },
          { name: "Mac Allister", number: 20, role: "LCM", x: 30, y: 50 },
          { name: "Messi", number: 10, role: "RW / CF", x: 75, y: 75 },
          { name: "Álvarez", number: 9, role: "ST", x: 50, y: 85 },
          { name: "Di María", number: 11, role: "LW", x: 25, y: 75 }
        ]
      },
      away: {
        formation: "4-2-3-1 (Compact Mid-block)",
        players: [
          { name: "Lloris", number: 1, role: "GK", x: 50, y: 90 },
          { name: "Koundé", number: 5, role: "RB", x: 80, y: 70 },
          { name: "Varane", number: 4, role: "CB", x: 65, y: 75 },
          { name: "Upamecano", number: 18, role: "CB", x: 35, y: 75 },
          { name: "T. Hernandez", number: 22, role: "LB", x: 20, y: 70 },
          { name: "Tchouaméni", number: 8, role: "RDM", x: 60, y: 55 },
          { name: "Rabiot", number: 14, role: "LDM", x: 40, y: 55 },
          { name: "Dembélé", number: 11, role: "RW", x: 80, y: 40 },
          { name: "Griezmann", number: 7, role: "AM", x: 50, y: 45 },
          { name: "Mbappé", number: 10, role: "LW", x: 20, y: 40 },
          { name: "Giroud", number: 9, role: "ST", x: 50, y: 25 }
        ]
      }
    },
    events: [
      {
        id: "e1",
        minute: 23,
        type: "goal",
        team: "home",
        player: "Lionel Messi",
        title: "Penalty Scored (Messi)",
        summary: "Lionel Messi sends Hugo Lloris the wrong way from the penalty spot to give Argentina a deserved lead.",
        detail: "Di Maria drew a foul inside the French penalty area from Ousmane Dembele. Marciniak pointed straight to the spot. Messi confidently placed the ball in the bottom-right corner, scoring his 6th goal of the tournament."
      },
      {
        id: "e2",
        minute: 36,
        type: "goal",
        team: "home",
        player: "Ángel Di María",
        title: "Counterattack Goal (Di María)",
        summary: "A world-class five-pass counterattack is finished in style by Angel Di Maria to double Argentina's lead.",
        detail: "Starting with Molina reclaiming possession, Messi flicks a magical pass to Alvarez, who releases Mac Allister down the right channel. Mac Allister squares a perfect low cross across the box to the unmarked Di Maria, who chips it over Lloris."
      },
      {
        id: "e3",
        minute: 41,
        type: "substitution",
        team: "away",
        player: "Giroud & Dembélé OUT, Kolo Muani & Thuram IN",
        title: "Tactical Shock: Double Substitution",
        summary: "Didier Deschamps takes drastic tactical measures before halftime, removing Dembélé and Giroud.",
        detail: "France has been tactically and physically overwhelmed in the midfield and flanks. Giroud and Dembélé are hooked. Kolo Muani and Marcus Thuram enter, shifting Mbappe to striker and establishing a high-pressing 4-2-4 shape."
      },
      {
        id: "e4",
        minute: 80,
        type: "goal",
        team: "away",
        player: "Kylian Mbappé",
        title: "Penalty Scored (Mbappé)",
        summary: "Mbappé scores from the spot to pull one back for France after Otamendi fouls Kolo Muani.",
        detail: "Otamendi gets caught on the wrong side of Kolo Muani and pulls him down in the box. Mbappé steps up and drills a powerful penalty into the bottom-left corner, past Emi Martinez's fingertips. Game on."
      },
      {
        id: "e5",
        minute: 81,
        type: "goal",
        team: "away",
        player: "Kylian Mbappé",
        title: "Sensational Volley (Mbappé)",
        summary: "A spectacular scissor-volley by Mbappé shocks Argentina and levels the match in 97 seconds.",
        detail: "Coman dispossesses Messi. Rabiot plays a diagonal ball to Mbappe, who plays a quick headed one-two combination with Marcus Thuram on the edge of the box, before unleashing a first-time falling volley into the far corner."
      },
      {
        id: "e6",
        minute: 108,
        type: "goal",
        team: "home",
        player: "Lionel Messi",
        title: "Dramatic Rebound Goal (Messi)",
        summary: "Messi puts Argentina back in front in extra time with a rebounded shot over the line.",
        detail: "Montiel's long ball finds Lautaro Martinez, who plays a quick pass to Messi. Messi slips Lautaro through. Lautaro's powerful near-post shot is parried by Lloris, but Messi is there to convert the rebound. Upamecano tries to clear it off the line, but goal-line technology confirms the ball crossed."
      },
      {
        id: "e7",
        minute: 118,
        type: "goal",
        team: "away",
        player: "Kylian Mbappé",
        title: "Penalty Hat-trick (Mbappé)",
        summary: "Mbappé scores another penalty to complete his hat-trick and force penalties.",
        detail: "Mbappé's shot from the edge of the box strikes the outstretched arm of Gonzalo Montiel inside the area. Penalty awarded. Mbappé steps up again and coolly sends Martinez the wrong way to secure his hat-trick."
      }
    ],
    tacticalShifts: [
      {
        minute: 0,
        title: "The Di María Left-Wing Gambit",
        team: "home",
        summary: "Scaloni positions Angel Di María on the left wing to exploit Koundé's narrow defensive tendencies.",
        description: "Usually a right winger, Di Maria was deployed on the left flank to stretch France's backline. Jules Kounde, naturally a center-back playing right-back, tended to tuck in, leaving massive space on the flank. Scaloni's plan succeeded completely, leading directly to the penalty for the first goal and the second goal."
      },
      {
        minute: 41,
        title: "Deschamps' 4-2-4 Direct Pressing Reset",
        team: "away",
        summary: "Deschamps abandons the traditional 4-2-3-1 for a high-intensity, direct 4-2-4 layout.",
        description: "By replacing the physical target-man Giroud and out-of-form Dembélé with Thuram and Kolo Muani, Deschamps converted France into a direct, high-pressing counter-attacking force. Mbappé shifted centrally, and the two new forwards brought physical intensity and direct running that finally disrupted Argentina's midfield control."
      },
      {
        minute: 102,
        title: "Scaloni's Midfield Refortification",
        team: "home",
        summary: "Scaloni introduces Paredes and Lautaro Martínez to restore central aggression and direct target threat.",
        description: "With Argentina exhausted and French momentum peaking, Scaloni replaced De Paul with Leandro Paredes to secure the defensive block, and brought on Lautaro Martínez for Julian Alvarez. This gave Argentina an outlet to hold up the ball, which directly led to the passing combination for Messi's 108th-minute goal."
      }
    ],
    varIncidents: [
      {
        minute: 21,
        title: "Di María Penalty Decision",
        refereeDecision: "Penalty Awarded to Argentina",
        varResult: "Decision Upheld",
        rulesReference: "IFAB Law 12: Fouls and Misconduct (Careless, reckless or using excessive force)",
        description: "Angel Di Maria dribbles past Ousmane Dembele into the box. Dembele makes contact with Di Maria's heel from behind. Di Maria falls. The referee awards a penalty. VAR reviews the check frame by frame: there is indeed contact at the heel/ankle level, and though soft, it is not a 'clear and obvious error' to award it. The penalty decision stands."
      },
      {
        minute: 87,
        title: "Thuram Booking for Simulation",
        refereeDecision: "Yellow Card for Diving to Marcus Thuram",
        varResult: "Decision Upheld",
        rulesReference: "IFAB Law 12: Simulation / Unsporting Behaviour",
        description: "Marcus Thuram breaks into the penalty box, goes past Enzo Fernandez, and drops to the turf claiming a trip. Referee Szymon Marciniak immediately runs over and shows Thuram a yellow card for diving. VAR reviews the footage: Enzo Fernandez withdrew his leg, and Thuram initiated the contact by dragging his foot. The call is verified as correct simulation, and the yellow card stands."
      },
      {
        minute: 108,
        title: "Messi Goal Review (Offside & Goal-line Check)",
        refereeDecision: "Goal Awarded to Argentina",
        varResult: "Decision Upheld (Goal Confirmed)",
        rulesReference: "IFAB Law 11 (Offside) & Law 1 (The Field of Play - Goal-line Technology)",
        description: "When Lautaro Martinez took the initial shot, VAR had to check if he was offside when receiving the pass. Semautomated offside shows Dayot Upamecano's heel played Martinez marginally onside. Additionally, VAR checked if the ball fully crossed the line before Upamecano cleared it. Goal-line technology sensor triggered, confirming the ball was completely over the line by 3 centimeters."
      }
    ],
    momentum: Array.from({ length: 120 }, (_, i) => {
      let min = i + 1;
      let arg = 50;
      let fra = 50;
      
      if (min <= 36) {
        arg = 70 + Math.sin(min / 3) * 10;
        fra = 30 - Math.sin(min / 3) * 10;
      } else if (min > 36 && min <= 45) {
        arg = 75 + Math.sin(min) * 5;
        fra = 25 - Math.sin(min) * 5;
      } else if (min > 45 && min <= 75) {
        arg = 60 + Math.cos(min / 5) * 8;
        fra = 40 - Math.cos(min / 5) * 8;
      } else if (min > 75 && min <= 80) {
        arg = 45;
        fra = 55;
      } else if (min > 80 && min <= 90) {
        // France extreme momentum
        arg = 20 + Math.sin(min) * 5;
        fra = 80 - Math.sin(min) * 5;
      } else if (min > 90 && min <= 105) {
        // Extra time 1st half: neutral/arg recovering
        arg = 55 + Math.sin(min / 2) * 5;
        fra = 45 - Math.sin(min / 2) * 5;
      } else if (min > 105 && min <= 112) {
        // Argentina goal momentum
        arg = 75 + Math.cos(min) * 4;
        fra = 25 - Math.cos(min) * 4;
      } else {
        // France comeback again
        arg = 40;
        fra = 60;
      }

      // Smooth it
      arg = Math.max(10, Math.min(90, Math.round(arg)));
      fra = Math.max(10, Math.min(90, Math.round(fra)));

      return { minute: min, Argentina: arg, France: fra };
    })
  },
  "cl-2024-final": {
    id: "cl-2024-final",
    title: "Real Madrid vs Borussia Dortmund",
    competition: "UEFA Champions League Final 2023/24",
    date: "Jun 1, 2024",
    venue: "Wembley Stadium, London",
    referee: "Slavko Vinčić (Slovenia)",
    score: "2 - 0",
    status: "Completed",
    teams: {
      home: {
        name: "Real Madrid",
        short: "RMA",
        logo: "👑",
        color: "#ffffff",
        textColor: "#000000"
      },
      away: {
        name: "Borussia Dortmund",
        short: "BVB",
        logo: "🐝",
        color: "#fde047",
        textColor: "#000000"
      }
    },
    lineups: {
      home: {
        formation: "4-4-2 Diamond",
        players: [
          { name: "Courtois", number: 1, role: "GK", x: 50, y: 10 },
          { name: "Carvajal", number: 2, role: "RB", x: 80, y: 30 },
          { name: "Rüdiger", number: 22, role: "CB", x: 65, y: 25 },
          { name: "Nacho", number: 6, role: "CB", x: 35, y: 25 },
          { name: "Mendy", number: 23, role: "LB", x: 20, y: 30 },
          { name: "Valverde", number: 15, role: "RCM", x: 65, y: 50 },
          { name: "Camavinga", number: 12, role: "DM", x: 50, y: 45 },
          { name: "Kroos", number: 8, role: "LCM", x: 35, y: 50 },
          { name: "Bellingham", number: 5, role: "AM", x: 50, y: 65 },
          { name: "Rodrygo", number: 11, role: "RF", x: 65, y: 80 },
          { name: "Vinícius Jr.", number: 7, role: "LF", x: 35, y: 80 }
        ]
      },
      away: {
        formation: "4-2-3-1 (Mid-block Counter)",
        players: [
          { name: "Kobel", number: 1, role: "GK", x: 50, y: 90 },
          { name: "Ryerson", number: 26, role: "RB", x: 80, y: 70 },
          { name: "Hummels", number: 15, role: "CB", x: 65, y: 75 },
          { name: "Schlotterbeck", number: 4, role: "CB", x: 35, y: 75 },
          { name: "Maatsen", number: 22, role: "LB", x: 20, y: 70 },
          { name: "Can", number: 23, role: "RDM", x: 60, y: 55 },
          { name: "Sabitzer", number: 20, role: "LDM", x: 40, y: 55 },
          { name: "Sancho", number: 10, role: "RW", x: 80, y: 40 },
          { name: "Brandt", number: 19, role: "AM", x: 50, y: 45 },
          { name: "Adeyemi", number: 27, role: "LW", x: 20, y: 40 },
          { name: "Füllkrug", number: 14, role: "ST", x: 50, y: 25 }
        ]
      }
    },
    events: [
      {
        id: "c1",
        minute: 21,
        type: "shot",
        team: "away",
        player: "Karim Adeyemi",
        title: "Adeyemi Misses 1-on-1 Chance",
        summary: "Karim Adeyemi beats the offside trap and rounds Thibaut Courtois, but runs too wide.",
        detail: "Hummels sends a defense-splitting long pass. Adeyemi races clear of Rudiger and Carvajal, touches it past the oncoming Courtois, but his heavy second touch carries him too wide, allowing Dani Carvajal to recover and block his eventual shot."
      },
      {
        id: "c2",
        minute: 23,
        type: "shot",
        team: "away",
        player: "Niclas Füllkrug",
        title: "Füllkrug Hits the Post",
        summary: "Dortmund hits the post as Füllkrug slides to reach a low pass in the penalty area.",
        detail: "Brandt feeds Fullkrug inside the box. The German striker slides to poke it past Courtois, beating the keeper, but the ball ricochets off the inside of the left post and away. Real Madrid survives another massive shock."
      },
      {
        id: "c3",
        minute: 74,
        type: "goal",
        team: "home",
        player: "Dani Carvajal",
        title: "Carvajal Header Goal (Kroos Assist)",
        summary: "Dani Carvajal breaks the deadlock with a brilliant header from a Toni Kroos corner.",
        detail: "Toni Kroos delivers a whipped, inswinging corner to the near post. The 5ft 8in Dani Carvajal rises above Niclas Füllkrug and power-headers the ball over Kobel into the far corner of the net."
      },
      {
        id: "c4",
        minute: 83,
        type: "goal",
        team: "home",
        player: "Vinícius Júnior",
        title: "Vinícius Goal (Maatsen Error)",
        summary: "Vinícius Jr doubles the lead after a critical defensive error by Ian Maatsen.",
        detail: "Maatsen attempts a horizontal pass across his own defensive line. It is intercepted by Jude Bellingham, who slides a pass to Vinicius Jr on the left of the box. Vinicius clips a left-footed strike over Gregor Kobel into the bottom-right corner."
      },
      {
        id: "c5",
        minute: 87,
        type: "var",
        team: "away",
        player: "Niclas Füllkrug",
        title: "Füllkrug Goal Disallowed (Offside)",
        summary: "Füllkrug's header goal is immediately ruled out for offside, confirmed by VAR.",
        detail: "Malen crosses from the left flank, and Füllkrug headers it powerfully past Courtois. The linesman raises his flag. VAR reviews the semi-automated frame: Füllkrug was about half a yard offside when the cross was delivered. Goal canceled."
      }
    ],
    tacticalShifts: [
      {
        minute: 0,
        title: "Terzić's Vertical Counter & High Flank Space",
        team: "away",
        summary: "Dortmund plays vertically through Adeyemi to attack the space behind Madrid's high right-back.",
        description: "Dortmund set up in a mid-block and explicitly targetted the space behind Dani Carvajal. Adeyemi's blistering pace was utilized through direct vertical balls from Brandt and Hummels, creating two massive chances in the first half which Dortmund failed to convert."
      },
      {
        minute: 46,
        title: "Ancelotti's Deep Kroos/Camavinga Build-up Shield",
        team: "home",
        summary: "Toni Kroos drops next to Nacho in build-up, forming a back 3 to dictate play.",
        description: "After being dominated in transition during the first half, Carlo Ancelotti instructed Toni Kroos to drop deeper to the left side of the center-backs. This established a 3-man build-up shield that forced Dortmund's forwards to press wider and gave Camavinga more central space, turning the control in Madrid's favor."
      }
    ],
    varIncidents: [
      {
        minute: 87,
        title: "Füllkrug Offside Check",
        refereeDecision: "Goal disallowed for Offside",
        varResult: "Decision Upheld (Offside Confirmed)",
        rulesReference: "IFAB Law 11: Offside",
        description: "Niclas Füllkrug headers a cross into the net. The assistant referee flags for offside. VAR checks the automated lines: Füllkrug's upper torso was ahead of the second-last defender (Nacho) when the ball was kicked by Malen. The decision of offside is correct. No goal."
      }
    ],
    momentum: Array.from({ length: 90 }, (_, i) => {
      let min = i + 1;
      let rma = 50;
      let bvb = 50;

      if (min <= 15) {
        rma = 55;
        bvb = 45;
      } else if (min > 15 && min <= 40) {
        // Dortmund dominating first half
        rma = 30 + Math.sin(min / 2) * 5;
        bvb = 70 - Math.sin(min / 2) * 5;
      } else if (min > 40 && min <= 45) {
        rma = 45;
        bvb = 55;
      } else if (min > 45 && min <= 60) {
        // Real Madrid takes back midfield control
        rma = 55 + Math.sin(min) * 5;
        bvb = 45 - Math.sin(min) * 5;
      } else if (min > 60 && min <= 73) {
        rma = 65;
        bvb = 35;
      } else if (min > 73 && min <= 85) {
        // Real Madrid post-goal dominance
        rma = 80 + Math.sin(min / 3) * 5;
        bvb = 20 - Math.sin(min / 3) * 5;
      } else {
        rma = 60;
        bvb = 40;
      }

      rma = Math.max(10, Math.min(90, Math.round(rma)));
      bvb = Math.max(10, Math.min(90, Math.round(bvb)));

      return { minute: min, "Real Madrid": rma, "Borussia Dortmund": bvb };
    })
  },
  "pl-2024-city-arsenal": {
    id: "pl-2024-city-arsenal",
    title: "Manchester City vs Arsenal",
    competition: "English Premier League 2023/24",
    date: "Mar 31, 2024",
    venue: "Etihad Stadium, Manchester",
    referee: "Anthony Taylor (England)",
    score: "0 - 0",
    status: "Completed",
    teams: {
      home: {
        name: "Manchester City",
        short: "MCI",
        logo: "🩵",
        color: "#6cabdd",
        textColor: "#ffffff"
      },
      away: {
        name: "Arsenal",
        short: "ARS",
        logo: "🔴",
        color: "#ef4444",
        textColor: "#ffffff"
      }
    },
    lineups: {
      home: {
        formation: "4-1-4-1 (Possession Overload)",
        players: [
          { name: "Ortega", number: 18, role: "GK", x: 50, y: 10 },
          { name: "Akanji", number: 25, role: "RB / DM", x: 70, y: 40 },
          { name: "Rúben Dias", number: 3, role: "CB", x: 60, y: 25 },
          { name: "Aké", number: 6, role: "CB", x: 40, y: 25 },
          { name: "Gvardiol", number: 24, role: "LB", x: 20, y: 30 },
          { name: "Rodri", number: 16, role: "DM", x: 50, y: 45 },
          { name: "Bernardo", number: 20, role: "RM", x: 80, y: 60 },
          { name: "De Bruyne", number: 17, role: "AM", x: 65, y: 65 },
          { name: "Kovačić", number: 8, role: "AM", x: 35, y: 60 },
          { name: "Foden", number: 47, role: "LM", x: 20, y: 60 },
          { name: "Haaland", number: 9, role: "ST", x: 50, y: 85 }
        ]
      },
      away: {
        formation: "4-4-2 Low Block Defense",
        players: [
          { name: "Raya", number: 22, role: "GK", x: 50, y: 90 },
          { name: "White", number: 4, role: "RB", x: 80, y: 75 },
          { name: "Saliba", number: 2, role: "CB", x: 65, y: 80 },
          { name: "Gabriel", number: 6, role: "CB", x: 35, y: 80 },
          { name: "Kiwior", number: 15, role: "LB", x: 20, y: 75 },
          { name: "Saka", number: 7, role: "RM", x: 80, y: 60 },
          { name: "Jorginho", number: 20, role: "CM", x: 60, y: 65 },
          { name: "Rice", number: 41, role: "CM", x: 40, y: 65 },
          { name: "Jesus", number: 9, role: "LM", x: 20, y: 60 },
          { name: "Ødegaard", number: 8, role: "SS / AM", x: 50, y: 50 },
          { name: "Havertz", number: 29, role: "ST", x: 50, y: 35 }
        ]
      }
    },
    events: [
      {
        id: "p1",
        minute: 15,
        type: "substitution",
        team: "home",
        player: "Aké OUT, Lewis IN",
        title: "Early Injury Disruption for City",
        summary: "Nathan Ake goes off injured, Rico Lewis replaces him in a minor tactical reshuffle.",
        detail: "Nathan Aké limps off with a hamstring problem. Rico Lewis comes on, slotting into right-back and sliding into midfield beside Rodri in possession, shifting Akanji to center-back."
      },
      {
        id: "p2",
        minute: 43,
        type: "card",
        team: "away",
        player: "Gabriel Jesus",
        title: "Jesus Yellow Card (VAR Check)",
        summary: "Gabriel Jesus is booked for kicking the ball away and a late challenge. Checked for Red.",
        detail: "Jesus commits a hard sliding tackle on Rico Lewis, then kicks the ball away. Anthony Taylor issues a yellow card. VAR reviews the contact for potential serious foul play: the contact was low, below the ankle, and not high-force. Yellow card confirmed."
      },
      {
        id: "p3",
        minute: 61,
        type: "substitution",
        team: "home",
        player: "Kovačić/Foden OUT, Grealish/Doku IN",
        title: "Guardiola Introduces Touchline Wingers",
        summary: "Pep Guardiola introduces Grealish and Doku to stretch Arsenal's defensive block.",
        detail: "Foden and Kovacic are replaced by Grealish and Jeremy Doku. The objective is to go wide and create 1-on-1 dribbles to disrupt Arsenal's compact shape."
      },
      {
        id: "p4",
        minute: 84,
        type: "shot",
        team: "home",
        player: "Erling Haaland",
        title: "Haaland Misses Back Post Connection",
        summary: "Erling Haaland misses a huge chance to score at the back post from a corner.",
        detail: "De Bruyne's corner is flicked on. The ball drops perfectly for Haaland at the back post, but he fails to connect cleanly, and the ball trickles harmlessly wide. Saliba sweeps clear."
      }
    ],
    tacticalShifts: [
      {
        minute: 0,
        title: "Arteta's Compact 4-4-2 Double-Pivot Wall",
        team: "away",
        summary: "Arsenal abandons standard high press to sit in a low-risk 4-4-2 mid/low block.",
        description: "Mikel Arteta chose a pragmatic, defensive approach. Gabriel Jesus and Bukayo Saka dropped deep to form defensive winger lines, making a 6-man defensive line at times. Rice and Jorginho stayed extremely narrow, choking the vertical passing lines into De Bruyne and Foden. City held 72% possession but generated only 1 shot on target."
      },
      {
        minute: 61,
        title: "Guardiola's Touchline Width Extension",
        team: "home",
        summary: "Guardiola introduces Jeremy Doku and Jack Grealish to stretch the defense laterally.",
        description: "To counter Arsenal's narrow block, Pep Guardiola substituted Foden and Kovacic for Grealish and Doku. They were ordered to stand directly on the chalk of the touchlines, widening the pitch, creating 1v1 situations against White and Kiwior, and opening up half-spaces for De Bruyne's late runs."
      }
    ],
    varIncidents: [
      {
        minute: 43,
        title: "Gabriel Jesus Serious Foul Play Check",
        refereeDecision: "Yellow Card to Gabriel Jesus",
        varResult: "Decision Upheld (No Red Card)",
        rulesReference: "IFAB Law 12: Serious Foul Play vs Careless Tackle",
        description: "Jesus lunges into Rico Lewis from behind. The home crowd demands a red card. Referee gives yellow. VAR reviews: the point of contact is on the top of the boot (not higher up), the speed was controlled, and there was no excessive force or lunging studs-up. The check confirms a yellow card is the appropriate action. No red."
      }
    ],
    momentum: Array.from({ length: 90 }, (_, i) => {
      let min = i + 1;
      // Flat control index, mostly City possession but low risk
      let mci = 55 + Math.sin(min / 5) * 5;
      let ars = 45 - Math.sin(min / 5) * 5;

      if (min > 60 && min <= 75) {
        // Doku introduction increases City pressure
        mci = 65 + Math.sin(min) * 4;
        ars = 35 - Math.sin(min) * 4;
      } else if (min > 80 && min <= 85) {
        mci = 70;
        ars = 30;
      }

      mci = Math.max(10, Math.min(90, Math.round(mci)));
      ars = Math.max(10, Math.min(90, Math.round(ars)));

      return { minute: min, "Manchester City": mci, "Arsenal": ars };
    })
  }
};
