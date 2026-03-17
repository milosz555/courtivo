import { useState, useMemo } from "react";

const DRILLS = [
// BEGINNER — WITH COACH (basket)
{ id: 1, title: “Forehand Groundstroke Basics”, level: “beginner”, coachRequired: true, desc: “Coach feeds balls from a basket to your forehand side. Focus on unit turn, contact point, and follow-through. 3 sets of 20 balls.”, tags: [“forehand”, “basket”, “technique”] },
{ id: 2, title: “Backhand Slice Introduction”, level: “beginner”, coachRequired: true, desc: “Coach hand-feeds slow sliced balls. Learn to open the racket face and brush under the ball. 3 sets of 15 balls.”, tags: [“backhand”, “slice”, “basket”] },
{ id: 3, title: “Volley Wall — Close Net”, level: “beginner”, coachRequired: true, desc: “Stand 1m from net. Coach gently tosses balls — punch volleys back. Work on firm wrist and short swing. 4 sets of 10.”, tags: [“volley”, “net”, “basket”] },
{ id: 4, title: “Corridor Rally — Back to Centre”, level: “beginner”, coachRequired: true, desc: “Play in a 1-metre-wide corridor along the singles sideline. After each shot, recover to the centre mark. Coach feeds each point.”, tags: [“footwork”, “recovery”, “small court”] },
{ id: 5, title: “Service Motion Phase 1”, level: “beginner”, coachRequired: true, desc: “Coach guides trophy-position posture with hand placement. Hit 30 serves focusing only on ball toss consistency.”, tags: [“serve”, “basket”] },
{ id: 6, title: “Cross-Court Forehand Feeding”, level: “beginner”, coachRequired: true, desc: “Coach feeds mid-court balls, you drive cross-court forehands. 50-ball basket. Focus on diagonal target.”, tags: [“forehand”, “cross-court”, “basket”] },
{ id: 7, title: “Red Court Mini Rally”, level: “beginner”, coachRequired: true, desc: “Coach rallies with you on a shortened red court. Keep the ball in play 5+ shots. Develops timing and feel.”, tags: [“small court”, “rally”, “feel”] },
{ id: 8, title: “Drop & Drive”, level: “beginner”, coachRequired: true, desc: “Coach feeds short balls just past the service line. Sprint in, drive the ball deep, recover. 3 sets of 12.”, tags: [“footwork”, “approach”, “basket”] },
{ id: 9, title: “Lob Defence”, level: “beginner”, coachRequired: true, desc: “Coach lobs over your head while you’re at the net. Turn, chase, and chip the lob back. Intro to overhead prep.”, tags: [“lob”, “overhead”, “basket”] },
{ id: 10, title: “Two-Ball Serve & Return”, level: “beginner”, coachRequired: true, desc: “Coach serves and you return, then you serve and coach returns. 2 balls only. Develops natural rally instincts.”, tags: [“serve”, “return”, “two-ball”] },

// BEGINNER — WITHOUT COACH (2–3 balls)
{ id: 11, title: “Wall Rally Warm-Up”, level: “beginner”, coachRequired: false, desc: “Rally against a practice wall with 2 balls. Focus on consistent contact and recovery step. 10-minute sets.”, tags: [“wall”, “forehand”, “consistency”] },
{ id: 12, title: “Cross-Court Duel”, level: “beginner”, coachRequired: false, desc: “Both players rally exclusively cross-court. First to 10 errors loses a set. Use only 3 balls.”, tags: [“cross-court”, “rally”, “consistency”] },
{ id: 13, title: “Serve & Return Game”, level: “beginner”, coachRequired: false, desc: “One player serves, one returns. Play out each point. Rotate every 10 serves. Uses 2–3 balls.”, tags: [“serve”, “return”, “game”] },
{ id: 14, title: “Short Court Rallying”, level: “beginner”, coachRequired: false, desc: “Both players stand inside service boxes and rally. Soft hands, feel for the ball, net height awareness. 3 balls.”, tags: [“small court”, “feel”, “touch”] },
{ id: 15, title: “Target Serving”, level: “beginner”, coachRequired: false, desc: “Place a bag or water bottle as target in deuce/ad box. Hit 20 serves per side. Track accuracy. 2 balls.”, tags: [“serve”, “accuracy”, “target”] },
{ id: 16, title: “One Up One Back Rally”, level: “beginner”, coachRequired: false, desc: “One player at net, one at baseline. Maintain a rally; switch every 15 shots. Develops both volleying and passing.”, tags: [“volley”, “passing”, “two-ball”] },
{ id: 17, title: “Down-the-Line Only Game”, level: “beginner”, coachRequired: false, desc: “Both players must hit down the line on every shot. First to 10 points wins. Great directional discipline drill.”, tags: [“down-the-line”, “discipline”, “rally”] },
{ id: 18, title: “Cooperative 21”, level: “beginner”, coachRequired: false, desc: “Cooperate to keep the rally alive. Count together — first to reach 21 consecutive shots wins. 2 balls.”, tags: [“consistency”, “cooperative”, “rally”] },
{ id: 19, title: “Toss & Groundstroke”, level: “beginner”, coachRequired: false, desc: “One player tosses, other hits groundstrokes cross-court. 15 tosses then switch. Simple but effective. 2 balls.”, tags: [“forehand”, “backhand”, “toss feed”] },
{ id: 20, title: “Approach & Pass”, level: “beginner”, coachRequired: false, desc: “One player hits short ball intentionally; partner approaches & volleys. Defender tries to pass. 3 balls.”, tags: [“approach”, “volley”, “passing”] },

// INTERMEDIATE — WITH COACH (basket)
{ id: 21, title: “Forehand-Cross / Backhand-Line Pattern”, level: “intermediate”, coachRequired: true, desc: “Coach feeds long ball to forehand — you play cross. Coach feeds to backhand — you play down the line. 4 sets of 20.”, tags: [“pattern”, “forehand”, “backhand”, “basket”] },
{ id: 22, title: “Inside-Out Forehand Attack”, level: “intermediate”, coachRequired: true, desc: “Coach feeds to backhand corner, you run around and hit inside-out forehand. Aggressive stance, explosive hip rotation. 50-ball basket.”, tags: [“forehand”, “inside-out”, “basket”] },
{ id: 23, title: “Volley-Volley-Smash”, level: “intermediate”, coachRequired: true, desc: “Coach feeds: forehand volley → backhand volley → lob for overhead. Work the sequence smoothly. 4 sets of 12.”, tags: [“volley”, “overhead”, “net”, “basket”] },
{ id: 24, title: “Approach & Finish Pattern”, level: “intermediate”, coachRequired: true, desc: “Coach feeds mid-court short ball. You approach, coach feeds passing shot or lob. Finish the point at net.”, tags: [“approach”, “net”, “basket”] },
{ id: 25, title: “High Backhand Defence”, level: “intermediate”, coachRequired: true, desc: “Coach feeds heavy topspin to backhand shoulder. Work on shoulder turn and brushing up the back of the ball aggressively.”, tags: [“backhand”, “topspin”, “defence”, “basket”] },
{ id: 26, title: “Short Angle Forehand”, level: “intermediate”, coachRequired: true, desc: “Coach feeds mid-court ball. Practice angled forehand winner short cross-court. 3 sets of 15.”, tags: [“forehand”, “angle”, “winner”, “basket”] },
{ id: 27, title: “Two-Ball Serve + 1 Aggressive”, level: “intermediate”, coachRequired: true, desc: “Serve, coach returns to open court, you play aggressive forehand to finish. Develops serve-plus-one attacking habit.”, tags: [“serve”, “forehand”, “basket”, “tactic”] },
{ id: 28, title: “Backhand Topspin Build-Up”, level: “intermediate”, coachRequired: true, desc: “Coach feeds 3 deep backhand balls — you build up pace cross-court, finish with winner down the line. 4 sets.”, tags: [“backhand”, “topspin”, “pattern”, “basket”] },
{ id: 29, title: “Corridor + Counter Attack”, level: “intermediate”, coachRequired: true, desc: “Play in corridor along T-line. After 3 shots in corridor, coach opens the court — attack the open space.”, tags: [“small court”, “footwork”, “attack”] },
{ id: 30, title: “Drop Shot Feeder”, level: “intermediate”, coachRequired: true, desc: “Coach feeds mid-court balls alternating pace. React and play a disguised drop shot when coach feeds slow. 4 sets of 10.”, tags: [“drop shot”, “touch”, “basket”] },
{ id: 31, title: “Defensive Lob Rescue”, level: “intermediate”, coachRequired: true, desc: “Coach hits you wide forcing defensive position. Play a high topspin lob cross-court to recover. 3 sets of 15.”, tags: [“lob”, “defence”, “basket”] },
{ id: 32, title: “Serve-Volley Introduction”, level: “intermediate”, coachRequired: true, desc: “Serve and charge the net immediately. Coach returns — close the net and volley. Develops net confidence.”, tags: [“serve-volley”, “net”, “basket”] },
{ id: 33, title: “Backhand Slice Approach”, level: “intermediate”, coachRequired: true, desc: “Coach feeds mid-court slice-height ball. Reply with controlled backhand slice approach and move to net.”, tags: [“slice”, “approach”, “net”] },
{ id: 34, title: “Full Baseline Triangle Pattern”, level: “intermediate”, coachRequired: true, desc: “Coach feeds wide forehand → you play cross → coach feeds wide backhand → you play cross → short ball → attack. 3-ball pattern.”, tags: [“pattern”, “triangle”, “basket”] },
{ id: 35, title: “Topspin Backhand High Ball”, level: “intermediate”, coachRequired: true, desc: “Coach feeds loopy high balls to backhand consistently. 50-ball basket focused on aggressive upward swing path.”, tags: [“backhand”, “topspin”, “high ball”, “basket”] },

// INTERMEDIATE — WITHOUT COACH
{ id: 36, title: “Baseline Cross-Court Grind”, level: “intermediate”, coachRequired: false, desc: “Both players rally cross-court from the baseline for 20-minute sets. First to miss 10 in a row loses. 3 balls.”, tags: [“baseline”, “cross-court”, “consistency”] },
{ id: 37, title: “Inside-Out / Inside-In Duel”, level: “intermediate”, coachRequired: false, desc: “One player runs around every backhand to hit inside-out forehand. Opponent must respond in a set direction. 3 balls.”, tags: [“forehand”, “inside-out”, “pattern”] },
{ id: 38, title: “Approach & Counter Game”, level: “intermediate”, coachRequired: false, desc: “Agree: one player approaches on every short ball, other tries to pass or lob. Play competitive sets. 3 balls.”, tags: [“approach”, “pass”, “game”] },
{ id: 39, title: “Serve-Return Championship”, level: “intermediate”, coachRequired: false, desc: “Play tiebreaks where only the serve and first return count as the point. Develops clutch serve & return. 2 balls.”, tags: [“serve”, “return”, “tiebreak”] },
{ id: 40, title: “Half-Court Singles”, level: “intermediate”, coachRequired: false, desc: “Play singles on half a court (one sideline to center line). Forces creative angles and movement. 3 balls.”, tags: [“small court”, “angles”, “game”] },
{ id: 41, title: “One Player Attacks, One Defends”, level: “intermediate”, coachRequired: false, desc: “Player A must hit winners inside service box. Player B must only defend. Switch after 10 points. 3 balls.”, tags: [“attack”, “defence”, “game”] },
{ id: 42, title: “Dropshot-Lob Exchange”, level: “intermediate”, coachRequired: false, desc: “One player drops, other lobs. Then switch roles. Build coordination and touch. Cooperative drill. 2 balls.”, tags: [“drop shot”, “lob”, “touch”] },
{ id: 43, title: “No-Man’s Land Challenge”, level: “intermediate”, coachRequired: false, desc: “Both players must stand inside service boxes. Rally keeping the ball in play. Volley exchanges only. 3 balls.”, tags: [“volley”, “net”, “small court”] },
{ id: 44, title: “Tiebreak Challenge”, level: “intermediate”, coachRequired: false, desc: “Play 5 tiebreaks in a row, tracking results. Develops pressure-performance awareness. 3 balls.”, tags: [“game”, “tiebreak”, “competitive”] },
{ id: 45, title: “Deep Ball Baseline Duel”, level: “intermediate”, coachRequired: false, desc: “Both players must land all balls behind the service line or lose the point. Forces consistent depth. 3 balls.”, tags: [“depth”, “baseline”, “consistency”] },

// ADVANCED — WITH COACH (basket)
{ id: 46, title: “High-Intensity BH-Cross / FH-Line Triangle”, level: “advanced”, coachRequired: true, desc: “Classic pro pattern: coach feeds wide forehand — you play cross. Coach feeds to backhand — down the line. Coach feeds short — attack inside-out. Continuous at high pace. 5 sets of 20.”, tags: [“pattern”, “triangle”, “basket”, “intensity”] },
{ id: 47, title: “Serve + Forehand Pivot Attack”, level: “advanced”, coachRequired: true, desc: “Serve wide to deuce, coach returns to middle, you pivot and rip inside-in forehand winner. 50-serve basket.”, tags: [“serve”, “forehand”, “inside-in”, “basket”] },
{ id: 48, title: “Running Forehand Down the Line”, level: “advanced”, coachRequired: true, desc: “Coach feeds wide forehand balls, you sprint, load and hit aggressive down-the-line as a change of direction winner.”, tags: [“forehand”, “down-the-line”, “speed”, “basket”] },
{ id: 49, title: “Full Court 5-Ball Combo”, level: “advanced”, coachRequired: true, desc: “Coach: deep FH → deep BH → short FH → short BH → put-away volley. Player executes full sequence without stopping.”, tags: [“pattern”, “combo”, “basket”, “fitness”] },
{ id: 50, title: “2nd Serve + Aggressive Baseline Point”, level: “advanced”, coachRequired: true, desc: “Serve a kicker 2nd serve then build the point aggressively. Coach returns and plays out. Focus on not defending after 2nd serve.”, tags: [“serve”, “kicker”, “baseline”, “tactic”] },
{ id: 51, title: “Overhead Under Pressure”, level: “advanced”, coachRequired: true, desc: “Coach alternates deep lobs and short lobs. Smash all balls while shuffling to maintain position. 4 sets of 15 overheads.”, tags: [“overhead”, “smash”, “basket”] },
{ id: 52, title: “Kick Serve Placement Drill”, level: “advanced”, coachRequired: true, desc: “50 kick serves to body, wide, and T — coach calls direction pre-toss. Develop serve as a weapon.”, tags: [“serve”, “kick”, “placement”] },
{ id: 53, title: “Backhand Rip Short & Come In”, level: “advanced”, coachRequired: true, desc: “Coach feeds to backhand corner. Rip topspin backhand cross-court short angle then sprint to net. Coach lobs.”, tags: [“backhand”, “angle”, “net”, “basket”] },
{ id: 54, title: “Banana-Shot Passing Practice”, level: “advanced”, coachRequired: true, desc: “Coach at net applying pressure. Hit heavy cross-court forehand banana shot while on the run. 4 sets.”, tags: [“forehand”, “passing”, “banana”, “basket”] },
{ id: 55, title: “Forehand-Backhand-Forehand Sprint”, level: “advanced”, coachRequired: true, desc: “Coach feeds alternating wide balls at race pace. No extra steps — pivot, explode, recover. 4 sets of 10.”, tags: [“footwork”, “speed”, “basket”, “fitness”] },
{ id: 56, title: “Serve & Chip-Charge”, level: “advanced”, coachRequired: true, desc: “Slice serve wide to ad court, chip-charge the return, volley finish. Develop aggressive serve-and-volley option.”, tags: [“serve”, “volley”, “slice”, “basket”] },
{ id: 57, title: “Defensive Recovery to Counter-Attack”, level: “advanced”, coachRequired: true, desc: “Coach hits you wide off-court. You retrieve with heavy topspin cross-court, then recover and attack next ball.”, tags: [“defence”, “recovery”, “counter-attack”, “basket”] },
{ id: 58, title: “Net Pressure Combination”, level: “advanced”, coachRequired: true, desc: “Coach feeds: low slice → mid volley → high volley → overhead. Execute at full speed, 5 sets of 12.”, tags: [“volley”, “net”, “overhead”, “combo”, “basket”] },
{ id: 59, title: “Shortball Recognition & Punishment”, level: “advanced”, coachRequired: true, desc: “Coach rallies from basket, randomly feeds a short ball. You must recognise and punish immediately with approach shot or winner.”, tags: [“recognition”, “approach”, “attack”, “basket”] },
{ id: 60, title: “Full Intensity 10-Ball Feeding”, level: “advanced”, coachRequired: true, desc: “Coach feeds 10 balls back-to-back with minimal rest between. Play each as a real point. Maximum physical and mental intensity.”, tags: [“fitness”, “intensity”, “basket”, “mental”] },

// ADVANCED — WITHOUT COACH
{ id: 61, title: “Pro Cross-Court Exchange”, level: “advanced”, coachRequired: false, desc: “Both players rally cross-court at 80–90% intensity for 30 minutes. Track errors per 50 shots. Push pace. 3 balls.”, tags: [“baseline”, “cross-court”, “intensity”] },
{ id: 62, title: “Serve-Volley Game”, level: “advanced”, coachRequired: false, desc: “One player must serve and come to net on every point. Regular scoring. Switch servers every 4 games. 3 balls.”, tags: [“serve-volley”, “net”, “game”] },
{ id: 63, title: “No Second Serve Tiebreak”, level: “advanced”, coachRequired: false, desc: “Play tiebreaks where double-faults lose the point — no second serve allowed. Builds aggressive first-serve mentality.”, tags: [“serve”, “pressure”, “tiebreak”] },
{ id: 64, title: “Alternate DTL/CC Pattern Game”, level: “advanced”, coachRequired: false, desc: “Player A must always go down the line; Player B must always go cross-court. Build patterns intentionally. 3 balls.”, tags: [“pattern”, “DTL”, “cross-court”, “discipline”] },
{ id: 65, title: “One-Ball Emergency Rally”, level: “advanced”, coachRequired: false, desc: “Rally with only ONE ball. No stopping. If the ball goes in the net the point is over. Extreme focus required.”, tags: [“focus”, “one ball”, “pressure”, “rally”] },
{ id: 66, title: “Attack Everything Short”, level: “advanced”, coachRequired: false, desc: “Play a set where any ball landing in the service box must be approached and finished at net. Builds aggression instinct. 3 balls.”, tags: [“approach”, “net”, “aggression”, “game”] },
{ id: 67, title: “Competitive Set with Statistics”, level: “advanced”, coachRequired: false, desc: “Play a full set, both players track: winner count, unforced errors, break points. Debrief after. 3 balls.”, tags: [“game”, “stats”, “competitive”] },
{ id: 68, title: “Second-Ball Aggression Game”, level: “advanced”, coachRequired: false, desc: “After every serve, the server must hit the second ball aggressively (no pushing). Point is free. Develops habit.”, tags: [“serve”, “aggression”, “pattern”, “game”] },
{ id: 69, title: “Supersonic Return Game”, level: “advanced”, coachRequired: false, desc: “Returner wins +2 points for any unreturnable return. Serve is normal. Play 20-point sets. 3 balls.”, tags: [“return”, “pressure”, “game”] },
{ id: 70, title: “Passing Shot Championship”, level: “advanced”, coachRequired: false, desc: “One player always at net, other tries to pass. One player defends lobs. Competitive points only. 3 balls.”, tags: [“passing”, “volley”, “net”, “competitive”] },

// MIXED EXTRA DRILLS — BEGINNER WITH COACH
{ id: 71, title: “Bounce-Hit Rhythm Drill”, level: “beginner”, coachRequired: true, desc: “Coach feeds balls while you say ‘bounce’ when it bounces and ‘hit’ at contact. Develops timing and focus. 3 sets of 20.”, tags: [“timing”, “rhythm”, “basket”] },
{ id: 72, title: “Target Zones — Cones”, level: “beginner”, coachRequired: true, desc: “Place 3 cones in the court. Coach feeds and you aim for each cone in rotation. Develops directional accuracy early.”, tags: [“accuracy”, “target”, “basket”] },
{ id: 73, title: “Net Approach Footwork”, level: “beginner”, coachRequired: true, desc: “Coach feeds short balls, you sprint and hit, then coach feeds lob — you backpedal for overhead. Intro to all-court tennis.”, tags: [“footwork”, “approach”, “overhead”] },

// MIXED EXTRA — INTERMEDIATE WITH COACH
{ id: 74, title: “Pressure Point Simulation”, level: “intermediate”, coachRequired: true, desc: “Play practice points at 30-40 or deuce. Only pressure situations. Coach feeds; react under simulated match stress.”, tags: [“mental”, “pressure”, “tactic”] },
{ id: 75, title: “Slice Backhand Builder”, level: “intermediate”, coachRequired: true, desc: “Coach feeds pace to backhand consistently. Focus on low, skidding slice that stays low. Work on length of contact.”, tags: [“slice”, “backhand”, “basket”] },
{ id: 76, title: “Overhead + Reset Volley”, level: “intermediate”, coachRequired: true, desc: “Smash, then coach feeds low volley immediately. Overhead → reset → close for put-away. 4 sequences × 8.”, tags: [“overhead”, “volley”, “basket”] },
{ id: 77, title: “Return of Serve Positioning”, level: “intermediate”, coachRequired: true, desc: “Coach serves from various positions. Focus on return positioning, split step, and racket preparation. Basket of 40 serves.”, tags: [“return”, “positioning”, “basket”] },
{ id: 78, title: “Wide Forehand Recovery”, level: “intermediate”, coachRequired: true, desc: “Coach feeds extremely wide forehand balls. Sprint, recover, and reset to centre before next feed. 3 sets of 12.”, tags: [“forehand”, “footwork”, “recovery”, “basket”] },
{ id: 79, title: “Transition Zone Drill”, level: “intermediate”, coachRequired: true, desc: “Coach feeds balls to the no-man’s land zone. You must attack or defend decisively — no hesitation. 4 sets of 10.”, tags: [“transition”, “decision”, “basket”] },
{ id: 80, title: “Topspin vs Slice Exchange”, level: “intermediate”, coachRequired: true, desc: “Coach feeds alternating topspin and slice. You must match: topspin reply to topspin, slice to slice. Develop feel for different grips.”, tags: [“topspin”, “slice”, “feel”, “basket”] },

// MIXED EXTRA — ADVANCED WITH COACH
{ id: 81, title: “All-Out Baseline War”, level: “advanced”, coachRequired: true, desc: “15-minute continuous baseline battle from basket. Coach feeds and plays back. Max intensity throughout. Heart rate monitor encouraged.”, tags: [“fitness”, “intensity”, “baseline”, “basket”] },
{ id: 82, title: “Flat Serve Bomb Drill”, level: “advanced”, coachRequired: true, desc: “50 flat serves targeting the T in deuce and ad courts at maximum speed. Measure with speed radar if available.”, tags: [“serve”, “flat”, “speed”, “basket”] },
{ id: 83, title: “Tweener Touch Training”, level: “advanced”, coachRequired: true, desc: “Coach lobs over head while you’re at net. Train the between-the-legs tweener as a real option. 3 sets of 8.”, tags: [“tweener”, “creative”, “basket”] },
{ id: 84, title: “Four-Ball Combination Pro”, level: “advanced”, coachRequired: true, desc: “Coach: wide FH → BH line → short cross → drop shot. Player executes all four in sequence at match pace. 5 sets.”, tags: [“combo”, “pattern”, “basket”, “pro”] },
{ id: 85, title: “Big Point Simulation”, level: “advanced”, coachRequired: true, desc: “Only play match points, set points, tiebreak points. 30 simulated pressure situations. Develops mental fortitude.”, tags: [“mental”, “pressure”, “simulation”] },

// MIXED EXTRA — WITHOUT COACH (all levels)
{ id: 86, title: “Moonball vs Flat Duel”, level: “intermediate”, coachRequired: false, desc: “One player hits heavy moonballs, other replies with flat aggressive strokes. 15-point games. Track winners vs errors. 3 balls.”, tags: [“moonball”, “tactics”, “game”] },
{ id: 87, title: “Deuce Court Only Sets”, level: “intermediate”, coachRequired: false, desc: “Play full sets with points only in the deuce court. Forces backhand and deuce-court serve strategy. 3 balls.”, tags: [“deuce court”, “game”, “tactic”] },
{ id: 88, title: “Mirror Pattern Drill”, level: “advanced”, coachRequired: false, desc: “Both players hit the same shot type (both cross, both down-line, etc.) simultaneously. One player calls direction before each rally.”, tags: [“pattern”, “mirror”, “discipline”] },
{ id: 89, title: “Serve Plus Two”, level: “advanced”, coachRequired: false, desc: “Server wins only if they win the point within 3 shots (serve, +1, +2). Returner wins any long rally. 3 balls.”, tags: [“serve”, “aggressive”, “game”] },
{ id: 90, title: “Volley Touch Game”, level: “beginner”, coachRequired: false, desc: “Both players stand at the service boxes and exchange volleys cooperatively. Count to 50. Reset on error. 2 balls.”, tags: [“volley”, “touch”, “cooperative”] },
{ id: 91, title: “Topspin Height Over Net”, level: “beginner”, coachRequired: false, desc: “Mark a string 1m above the net with tape. Must clear that height with every groundstroke. 20-shot cooperative rally. 2 balls.”, tags: [“topspin”, “height”, “consistency”] },
{ id: 92, title: “Approach & Put-Away Sets”, level: “intermediate”, coachRequired: false, desc: “Every rally starts with a short ball feed. Receiver must attack, server tries to pass. 15-point games. 3 balls.”, tags: [“approach”, “game”, “volley”] },
{ id: 93, title: “Slice Only Set”, level: “intermediate”, coachRequired: false, desc: “Both players may ONLY use slice strokes. Any topspin = lose point. Creative tactics, heavy skidding balls only. 3 balls.”, tags: [“slice”, “game”, “restriction”] },
{ id: 94, title: “No Backhand Game”, level: “beginner”, coachRequired: false, desc: “Both players can only hit forehand strokes. Run around everything. Great for footwork development. 2 balls.”, tags: [“forehand”, “footwork”, “game”] },
{ id: 95, title: “Groundstroke Accuracy Contest”, level: “intermediate”, coachRequired: false, desc: “Place 4 targets on each side. Each player has 20 balls — hit each target 5 times. Track hit rate. 3 balls.”, tags: [“accuracy”, “target”, “contest”] },
{ id: 96, title: “Return Blitz”, level: “advanced”, coachRequired: false, desc: “Server hits 20 first serves back-to-back. Returner tries to win each point in 1–2 shots. Immediate switch. Extreme aggression required.”, tags: [“return”, “blitz”, “game”] },
{ id: 97, title: “Lob Only Defence Game”, level: “intermediate”, coachRequired: false, desc: “One player lobs exclusively; other must smash and come to net. First to 10 smash winners wins. 3 balls.”, tags: [“lob”, “overhead”, “game”] },
{ id: 98, title: “Speed Serve Contest”, level: “advanced”, coachRequired: false, desc: “Both players serve 10 flat serves. Returner tracks number of aces or unreturnable. Most unreturnable serves wins. 3 balls.”, tags: [“serve”, “speed”, “contest”] },
{ id: 99, title: “Point Construction Game”, level: “advanced”, coachRequired: false, desc: “Must build every point through at least 4 shots before going for a winner. Instant loss if attacked too early. 3 balls.”, tags: [“tactic”, “construction”, “game”] },
{ id: 100, title: “Endurance Rally Challenge”, level: “advanced”, coachRequired: false, desc: “Cross-court rally with 2 balls. Goal: 200 consecutive shots without error. Track personal bests. Pure endurance.”, tags: [“endurance”, “consistency”, “challenge”] },
];

const LEVEL_CONFIG = {
all: { label: “All Levels”, color: “#b5cc32”, bg: “rgba(181,204,50,0.12)” },
beginner: { label: “Beginner”, color: “#4ade80”, bg: “rgba(74,222,128,0.12)” },
intermediate: { label: “Intermediate”, color: “#fb923c”, bg: “rgba(251,146,60,0.12)” },
advanced: { label: “Advanced”, color: “#f43f5e”, bg: “rgba(244,63,94,0.12)” },
};

const COACH_CONFIG = {
all: { label: “Any Setup”, icon: “🎾” },
coach: { label: “With Coach & Basket”, icon: “🪣” },
solo: { label: “2–3 Balls w/ Friend”, icon: “🤝” },
};

const levelDot = (level) => {
if (level === “beginner”) return “#4ade80”;
if (level === “intermediate”) return “#fb923c”;
return “#f43f5e”;
};

export default function TennisTrainingHub() {
const [levelFilter, setLevelFilter] = useState(“all”);
const [coachFilter, setCoachFilter] = useState(“all”);
const [search, setSearch] = useState(””);
const [selectedDrill, setSelectedDrill] = useState(null);

const filtered = useMemo(() => {
return DRILLS.filter((d) => {
if (levelFilter !== “all” && d.level !== levelFilter) return false;
if (coachFilter === “coach” && !d.coachRequired) return false;
if (coachFilter === “solo” && d.coachRequired) return false;
if (search && !d.title.toLowerCase().includes(search.toLowerCase()) &&
!d.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) &&
!d.desc.toLowerCase().includes(search.toLowerCase())) return false;
return true;
});
}, [levelFilter, coachFilter, search]);

const stats = {
beginner: DRILLS.filter(d => d.level === “beginner”).length,
intermediate: DRILLS.filter(d => d.level === “intermediate”).length,
advanced: DRILLS.filter(d => d.level === “advanced”).length,
};

return (
<div style={{
minHeight: “100vh”,
background: “#0a0f0d”,
fontFamily: “‘Georgia’, ‘Times New Roman’, serif”,
color: “#e8edd4”,
}}>
<style>{`
@import url(‘https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap’);

```
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body { background: #0a0f0d; }

    .hero {
      background: linear-gradient(160deg, #0d1a0f 0%, #0a0f0d 50%, #111a0d 100%);
      position: relative;
      overflow: hidden;
      padding: 70px 24px 60px;
      text-align: center;
    }
    .hero::before {
      content: '';
      position: absolute;
      top: -60px; left: 50%;
      transform: translateX(-50%);
      width: 700px; height: 700px;
      background: radial-gradient(circle, rgba(181,204,50,0.07) 0%, transparent 70%);
      pointer-events: none;
    }
    .hero-tag {
      display: inline-block;
      background: rgba(181,204,50,0.12);
      border: 1px solid rgba(181,204,50,0.3);
      color: #b5cc32;
      font-family: 'DM Sans', sans-serif;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 3px;
      text-transform: uppercase;
      padding: 6px 18px;
      border-radius: 100px;
      margin-bottom: 24px;
    }
    .hero h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(42px, 7vw, 88px);
      font-weight: 900;
      line-height: 1;
      color: #e8edd4;
      margin-bottom: 6px;
    }
    .hero h1 span { color: #b5cc32; }
    .hero-sub {
      font-family: 'DM Sans', sans-serif;
      font-size: 16px;
      color: rgba(232,237,212,0.5);
      font-weight: 300;
      margin-bottom: 40px;
      letter-spacing: 0.5px;
    }
    .stats-row {
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 0;
    }
    .stat-pill {
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      font-weight: 500;
      padding: 5px 14px;
      border-radius: 100px;
      border: 1px solid;
    }

    .controls {
      max-width: 1200px;
      margin: 0 auto;
      padding: 36px 24px 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .search-wrap {
      position: relative;
    }
    .search-icon {
      position: absolute;
      left: 18px; top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      opacity: 0.4;
      pointer-events: none;
    }
    .search-input {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px;
      padding: 14px 20px 14px 46px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      color: #e8edd4;
      outline: none;
      transition: border-color 0.2s;
    }
    .search-input::placeholder { color: rgba(232,237,212,0.3); }
    .search-input:focus { border-color: rgba(181,204,50,0.4); }

    .filter-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }
    .filter-label {
      font-family: 'DM Sans', sans-serif;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(232,237,212,0.35);
      margin-right: 4px;
      white-space: nowrap;
    }
    .filter-btn {
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      padding: 8px 18px;
      border-radius: 100px;
      border: 1px solid rgba(255,255,255,0.1);
      background: transparent;
      color: rgba(232,237,212,0.6);
      cursor: pointer;
      transition: all 0.18s;
      white-space: nowrap;
    }
    .filter-btn:hover {
      border-color: rgba(255,255,255,0.25);
      color: #e8edd4;
    }
    .filter-btn.active-beginner {
      background: rgba(74,222,128,0.12);
      border-color: #4ade80;
      color: #4ade80;
    }
    .filter-btn.active-intermediate {
      background: rgba(251,146,60,0.12);
      border-color: #fb923c;
      color: #fb923c;
    }
    .filter-btn.active-advanced {
      background: rgba(244,63,94,0.12);
      border-color: #f43f5e;
      color: #f43f5e;
    }
    .filter-btn.active-all, .filter-btn.active-coach, .filter-btn.active-solo {
      background: rgba(181,204,50,0.12);
      border-color: #b5cc32;
      color: #b5cc32;
    }

    .results-meta {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px 16px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      color: rgba(232,237,212,0.35);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .results-count {
      color: #b5cc32;
      font-weight: 600;
    }

    .grid {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px 80px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 16px;
    }

    .card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 18px;
      padding: 22px;
      cursor: pointer;
      transition: all 0.22s;
      position: relative;
      overflow: hidden;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: transparent;
      transition: background 0.22s;
    }
    .card:hover {
      background: rgba(255,255,255,0.055);
      border-color: rgba(255,255,255,0.14);
      transform: translateY(-2px);
    }
    .card:hover::before { background: var(--accent); }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      gap: 10px;
    }
    .card-num {
      font-family: 'Playfair Display', serif;
      font-size: 11px;
      color: rgba(232,237,212,0.2);
      font-weight: 700;
      letter-spacing: 1px;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .card-badges {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
    }
    .badge {
      font-family: 'DM Sans', sans-serif;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 3px 9px;
      border-radius: 100px;
      border: 1px solid;
    }
    .card-title {
      font-family: 'Playfair Display', serif;
      font-size: 17px;
      font-weight: 700;
      color: #e8edd4;
      line-height: 1.3;
      margin-bottom: 10px;
      flex: 1;
    }
    .card-desc {
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      color: rgba(232,237,212,0.5);
      line-height: 1.6;
      font-weight: 300;
    }
    .card-footer {
      margin-top: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .tag {
      font-family: 'DM Sans', sans-serif;
      font-size: 10px;
      color: rgba(232,237,212,0.3);
      background: rgba(255,255,255,0.04);
      padding: 3px 8px;
      border-radius: 6px;
    }

    .setup-icon {
      margin-left: auto;
      font-size: 18px;
      opacity: 0.65;
    }

    /* MODAL */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(6px);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      animation: fadeIn 0.18s ease;
    }
    @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
    .modal {
      background: #111a0d;
      border: 1px solid rgba(181,204,50,0.15);
      border-radius: 24px;
      padding: 36px;
      max-width: 560px;
      width: 100%;
      position: relative;
      animation: slideUp 0.22s ease;
    }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: none; opacity: 1 } }
    .modal-close {
      position: absolute;
      top: 18px; right: 20px;
      background: rgba(255,255,255,0.06);
      border: none;
      color: rgba(232,237,212,0.5);
      width: 32px; height: 32px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
    }
    .modal-close:hover { background: rgba(255,255,255,0.12); color: #e8edd4; }
    .modal-num {
      font-family: 'DM Sans', sans-serif;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(232,237,212,0.3);
      margin-bottom: 8px;
    }
    .modal-title {
      font-family: 'Playfair Display', serif;
      font-size: 26px;
      font-weight: 900;
      color: #e8edd4;
      line-height: 1.2;
      margin-bottom: 18px;
    }
    .modal-desc {
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      line-height: 1.75;
      color: rgba(232,237,212,0.7);
      font-weight: 300;
      margin-bottom: 22px;
    }
    .modal-meta {
      display: flex; gap: 12px; flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .modal-tags {
      display: flex; gap: 6px; flex-wrap: wrap;
    }

    .empty-state {
      grid-column: 1/-1;
      text-align: center;
      padding: 80px 20px;
    }
    .empty-icon { font-size: 52px; margin-bottom: 16px; }
    .empty-title {
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      color: rgba(232,237,212,0.4);
      margin-bottom: 8px;
    }
    .empty-sub {
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      color: rgba(232,237,212,0.2);
    }

    .divider {
      width: 1px;
      height: 18px;
      background: rgba(255,255,255,0.1);
    }

    @media (max-width: 600px) {
      .grid { grid-template-columns: 1fr; }
      .filter-row { gap: 8px; }
    }
  `}</style>

  {/* HERO */}
  <div className="hero">
    <div className="hero-tag">🎾 Training Library</div>
    <h1>Tennis<br /><span>Drillbook</span></h1>
    <p className="hero-sub">100 drills for every player, every session, every level</p>
    <div className="stats-row">
      <div className="stat-pill" style={{ color: "#4ade80", borderColor: "rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.07)" }}>
        🟢 {stats.beginner} Beginner
      </div>
      <div className="stat-pill" style={{ color: "#fb923c", borderColor: "rgba(251,146,60,0.3)", background: "rgba(251,146,60,0.07)" }}>
        🟠 {stats.intermediate} Intermediate
      </div>
      <div className="stat-pill" style={{ color: "#f43f5e", borderColor: "rgba(244,63,94,0.3)", background: "rgba(244,63,94,0.07)" }}>
        🔴 {stats.advanced} Advanced
      </div>
    </div>
  </div>

  {/* CONTROLS */}
  <div className="controls">
    <div className="search-wrap">
      <span className="search-icon">🔍</span>
      <input
        className="search-input"
        placeholder="Search drills, tags, techniques…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>

    <div className="filter-row">
      <span className="filter-label">Level</span>
      {["all","beginner","intermediate","advanced"].map(l => (
        <button
          key={l}
          className={`filter-btn ${levelFilter === l ? `active-${l}` : ""}`}
          onClick={() => setLevelFilter(l)}
        >
          {l === "all" ? "All Levels" : l.charAt(0).toUpperCase() + l.slice(1)}
        </button>
      ))}
      <div className="divider" />
      <span className="filter-label">Setup</span>
      {Object.entries(COACH_CONFIG).map(([k, v]) => (
        <button
          key={k}
          className={`filter-btn ${coachFilter === k ? `active-${k}` : ""}`}
          onClick={() => setCoachFilter(k)}
        >
          {v.icon} {v.label}
        </button>
      ))}
    </div>
  </div>

  <div className="results-meta">
    <span className="results-count">{filtered.length}</span>
    <span>drills found</span>
    {search && <span>for "{search}"</span>}
  </div>

  {/* GRID */}
  <div className="grid">
    {filtered.length === 0 && (
      <div className="empty-state">
        <div className="empty-icon">🎾</div>
        <div className="empty-title">No drills found</div>
        <div className="empty-sub">Try adjusting your filters or search term</div>
      </div>
    )}
    {filtered.map(drill => {
      const accent = levelDot(drill.level);
      return (
        <div
          key={drill.id}
          className="card"
          style={{ "--accent": accent }}
          onClick={() => setSelectedDrill(drill)}
        >
          <div className="card-header">
            <span className="card-num">#{String(drill.id).padStart(3,"0")}</span>
            <div className="card-badges">
              <span className="badge" style={{
                color: accent,
                borderColor: accent + "55",
                background: accent + "18",
              }}>
                {drill.level}
              </span>
              <span className="badge" style={{
                color: drill.coachRequired ? "#facc15" : "#60a5fa",
                borderColor: drill.coachRequired ? "#facc1555" : "#60a5fa55",
                background: drill.coachRequired ? "#facc1518" : "#60a5fa18",
              }}>
                {drill.coachRequired ? "Coach" : "Solo"}
              </span>
            </div>
          </div>
          <div className="card-title">{drill.title}</div>
          <div className="card-desc">{drill.desc.length > 100 ? drill.desc.slice(0, 100) + "…" : drill.desc}</div>
          <div className="card-footer">
            {drill.tags.slice(0, 3).map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
            <span className="setup-icon">{drill.coachRequired ? "🪣" : "🤝"}</span>
          </div>
        </div>
      );
    })}
  </div>

  {/* MODAL */}
  {selectedDrill && (
    <div className="modal-overlay" onClick={() => setSelectedDrill(null)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setSelectedDrill(null)}>✕</button>
        <div className="modal-num">Drill #{String(selectedDrill.id).padStart(3,"0")}</div>
        <div className="modal-title">{selectedDrill.title}</div>
        <div className="modal-meta">
          <span className="badge" style={{
            color: levelDot(selectedDrill.level),
            borderColor: levelDot(selectedDrill.level) + "55",
            background: levelDot(selectedDrill.level) + "18",
            padding: "5px 14px",
            fontSize: "12px",
          }}>
            {selectedDrill.level}
          </span>
          <span className="badge" style={{
            color: selectedDrill.coachRequired ? "#facc15" : "#60a5fa",
            borderColor: selectedDrill.coachRequired ? "#facc1555" : "#60a5fa55",
            background: selectedDrill.coachRequired ? "#facc1518" : "#60a5fa18",
            padding: "5px 14px",
            fontSize: "12px",
          }}>
            {selectedDrill.coachRequired ? "🪣 Coach + Basket" : "🤝 2–3 Balls w/ Friend"}
          </span>
        </div>
        <div className="modal-desc">{selectedDrill.desc}</div>
        <div className="modal-tags">
          {selectedDrill.tags.map(t => (
            <span key={t} className="tag" style={{ fontSize: "12px", padding: "5px 10px" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )}
</div>
```

);
}