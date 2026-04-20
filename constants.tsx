import { PresentationSegment, Platform, QuizQuestion } from './types';
import introSlidoQr from './assets/intro-slido-qr.png';
import microsoftLedSessionImage from './assets/ms-slide-img.png';
import financeKnowledgeBaseImage from './assets/finance-knowledge-base-img.png';
import aiChampionsLogo from './assets/ai-champions-logo.png';

export const SEGMENTS: PresentationSegment[] = [
  {
    id: 'outline',
    title: "Outline of the Day",
    shortName: "Outline",
    content: "\"We are transforming our people, and they are transforming finance\" Global Finance Director at Meta",
    icon: '📋',
    imageUrl: introSlidoQr
  },
  {
    id: 'purpose',
    title: "AI Champions Purpose",
    shortName: "Purpose",
    content: "AI Champions Purpose:\n1) Upskilling and Enablement\n2) Supporting Use‑Case Feasibility\n3) Building a Finance‑Wide AI Knowledge Base",
    icon: '🎯',
    imageUrl: "https://picsum.photos/seed/purpose/800/800"
  },
  {
    id: 'energizer',
    title: "AI Energizer",
    shortName: "Energizer",
    content: "Ice Breaker: Split into groups and use AI to create a theme song for the AI Champions network.\n\nEach group should produce: (1) an overall style prompt (max 1000 characters), (2) full song lyrics, and (3) song instructions embedded in the lyrics using square brackets.",
    icon: '⚡',
    imageUrl: "https://picsum.photos/seed/energizer/800/800"
  },
  {
    id: 'challenge',
    title: "Copilot in Excel Challenge",
    shortName: "Excel",
    content: "Copilot integrations in Excel (Microsoft) - How Copilot can assist in reconciliation work.\n\nBalance Sheet Rec File\nUse Excel for assistance in matching",
    icon: '📊',
    imageUrl: "https://picsum.photos/seed/excel/800/800"
  },
  {
    id: 'tools',
    title: "M&S Perspective: AI Tools Available to Finance",
    shortName: "Tools",
    content: "AI Use Cases:\n- Tier 0 – Personal Copilot Agents\n- Tier 1 – Retrofitting AI into Existing Automation\n- Tier 2 – Advanced/Chained Agents & ML Integration\n- Tier 3 – Enterprise‑Level AI Solutions\n\nExperimentation Deep Dive:\n- Microsoft 365 Copilot\n- Copilot for Power BI\n- Copilot Studio",
    icon: '🛠️',
    imageUrl: "https://picsum.photos/seed/tools/800/800"
  },
  {
    id: 'microsoft',
    title: "Microsoft‑Led Session: Getting Value from Copilot",
    shortName: "Intro to Agents",
    content: "Deep dive into Microsoft 365 Copilot, focusing on real finance use cases, Excel, Copilot Chat, and an introduction to agents and copilots.",
    icon: '💻',
    imageUrl: microsoftLedSessionImage
  },
  {
    id: 'break',
    title: "Break",
    shortName: "Break",
    content: "Time to pause, recharge, and informally discuss ideas from the morning sessions.",
    icon: '☕',
    imageUrl: "https://picsum.photos/seed/coffee/800/800"
  },
  {
    id: 'workshop',
    title: "Interactive Workshop: AI Use Cases in Finance",
    shortName: "Workshop",
    content: "Small‑group work to map real finance processes, identify pain points, and explore where AI can add practical value.",
    icon: '👥',
    imageUrl: "https://picsum.photos/seed/workshop/800/800"
  },
  {
    id: 'knowledge',
    title: "Finance AI Knowledge Base Concept",
    shortName: "Knowledge",
    content: "A centralised, trusted and AI Compatible place for finance knowledge",
    icon: '📚',
    imageUrl: financeKnowledgeBaseImage
  },
  {
    id: 'thanks',
    title: "Close & Next Steps",
    shortName: "Close",
    content: "THANK YOU!\n\nWhat’s next:\n1) Regular updates in the Team Space — everyone is expected to contribute.\n2) Monthly “AI Unite” sessions — run on a champion tag-team rota.\n3) Manchester “AI drop-in sessions” — initially led by Andy and Alex, with champions increasingly attending and hosting as confidence and maturity grow.",
    icon: '🏁',
    imageUrl: aiChampionsLogo
  }
];

export const QUIZ_DATA: QuizQuestion[] = [
  { 
    question: "Most common pub names in Britain", 
    answers: [
      { text: "Red Lion", points: 1 },
      { text: "Royal Oak", points: 2 },
      { text: "White Hart", points: 3 },
      { text: "Rose and Crown", points: 4 },
      { text: "King’s Head", points: 5 },
      { text: "King’s Arms", points: 6 },
      { text: "Queen’s Head", points: 7 },
      { text: "The Crown", points: 8 },
      { text: "Swan", points: 9 },
      { text: "Railway", points: 10 },
      { text: "Plough", points: -5 },
      { text: "White Horse", points: -3 },
      { text: "Bell", points: -3 }
    ] 
  },
  { 
    question: "Traditional British foods (not just meals)", 
    answers: [
      { text: "Fish and chips", points: 1 },
      { text: "Chicken tikka masala", points: 2 },
      { text: "Scotch egg", points: 3 },
      { text: "Toad-in-the-hole", points: 4 },
      { text: "Pork pie", points: 5 },
      { text: "Full English breakfast", points: 6 },
      { text: "Bangers and mash", points: 7 },
      { text: "Roast beef & Yorkshire pudding", points: 8 },
      { text: "Shepherd’s pie", points: 9 },
      { text: "Cornish pasty", points: 10 },
      { text: "Trifle", points: -5 },
      { text: "Black pudding", points: -3 },
      { text: "Haggis", points: -3 }
    ] 
  },
  { 
    question: "UK supermarket chains by turnover", 
    answers: [
      { text: "Tesco", points: 1 },
      { text: "Sainsbury’s", points: 2 },
      { text: "Asda", points: 3 },
      { text: "Aldi", points: 4 },
      { text: "Morrisons", points: 5 },
      { text: "Co‑op", points: 6 },
      { text: "Lidl", points: 7 },
      { text: "Waitrose & Partners", points: 8 },
      { text: "Iceland", points: 9 },
      { text: "SPAR", points: 10 },
      { text: "Marks & Spencer", points: -5 },
      { text: "Booths", points: -3 },
      { text: "Budgens", points: -3 }
    ] 
  },
  { 
    question: "Largest UK cities by population", 
    answers: [
      { text: "Manchester", points: 1 },
      { text: "Birmingham", points: 2 },
      { text: "Glasgow", points: 3 },
      { text: "Leeds", points: 4 },
      { text: "Liverpool", points: 5 },
      { text: "Sheffield", points: 6 },
      { text: "Bristol", points: 7 },
      { text: "Leicester", points: 8 },
      { text: "Edinburgh", points: 9 },
      { text: "Cardiff", points: 10 },
      { text: "Cardiff", points: -5 },
      { text: "Cambridge", points: -3 },
      { text: "York", points: -3 }
    ] 
  },
  { 
    question: "Famous British landmarks", 
    answers: [
      { text: "Buckingham Palace", points: 1 },
      { text: "Stonehenge", points: 2 },
      { text: "Houses of Parliament", points: 3 },
      { text: "Tower of Manchester", points: 4 },
      { text: "St Paul’s Cathedral", points: 5 },
      { text: "White Cliffs of Dover", points: 6 },
      { text: "Tower Bridge", points: 7 },
      { text: "Edinburgh Castle", points: 8 },
      { text: "Lake District", points: 9 },
      { text: "Westminster Abbey", points: 10 },
      { text: "Manchester Eye", points: -5 },
      { text: "York Minster", points: -3 },
      { text: "Hadrian’s Wall", points: -3 }
    ] 
  },
  { 
    question: "British TV sitcoms", 
    answers: [
      { text: "Only Fools and Horses", points: 1 },
      { text: "Blackadder", points: 2 },
      { text: "The Vicar of Dibley", points: 3 },
      { text: "Dad’s Army", points: 4 },
      { text: "Fawlty Towers", points: 5 },
      { text: "Yes Minister", points: 6 },
      { text: "Mr. Bean", points: 7 },
      { text: "Absolutely Fabulous", points: 8 },
      { text: "Keeping Up Appearances", points: 9 },
      { text: "The Office (UK)", points: 10 },
      { text: "Gavin & Stacey", points: -5 },
      { text: "Peep Show", points: -3 },
      { text: "Red Dwarf", points: -3 }
    ] 
  },
  { 
    question: "Popular British newspapers", 
    answers: [
      { text: "Metro", points: 1 },
      { text: "Daily Mail", points: 2 },
      { text: "The Sunday Times", points: 3 },
      { text: "The Sun", points: 4 },
      { text: "Sunday Telegraph", points: 5 },
      { text: "The Mail on Sunday", points: 6 },
      { text: "The Times", points: 7 },
      { text: "The Guardian", points: 8 },
      { text: "Financial Times", points: 9 },
      { text: "The Sun on Sunday", points: 10 },
      { text: "Daily Telegraph", points: -5 },
      { text: "Daily Express", points: -3 },
      { text: "Evening Standard", points: -3 }
    ] 
  },
  { 
    question: "Popular English Premier League teams", 
    answers: [
      { text: "Arsenal", points: 1 },
      { text: "Chelsea", points: 2 },
      { text: "Tottenham Hotspur", points: 3 },
      { text: "Liverpool", points: 4 },
      { text: "West Ham United", points: 5 },
      { text: "Crystal Palace", points: 6 },
      { text: "Fulham", points: 7 },
      { text: "Brentford", points: 8 },
      { text: "Everton", points: 9 },
      { text: "Newcastle United", points: 10 },
      { text: "West Ham United", points: -5 },
      { text: "Nottingham Forest", points: -3 },
      { text: "Celtic", points: -3 }
    ] 
  },
  { 
    question: "The Best Fruits", 
    answers: [
      { text: "Cherries", points: 1 },
      { text: "Watermelons", points: 2 },
      { text: "Strawberries", points: 3 },
      { text: "Mangoes", points: 4 },
      { text: "Grapes", points: 5 },
      { text: "Pineapples", points: 6 },
      { text: "Apples", points: 7 },
      { text: "Bananas", points: 8 },
      { text: "Oranges", points: 9 },
      { text: "Blueberries", points: 10 },
      { text: "Raspberries", points: -5 },
      { text: "Papayas", points: -3 },
      { text: "Figs", points: -3 }
    ] 
  },
  { 
    question: "Most Common Surnames in the UK", 
    answers: [
      { text: "Smith", points: 1 },
      { text: "Jones", points: 2 },
      { text: "Williams", points: 3 },
      { text: "Taylor", points: 4 },
      { text: "Brown", points: 5 },
      { text: "Davies", points: 6 },
      { text: "Evans", points: 7 },
      { text: "Thomas", points: 8 },
      { text: "Wilson", points: 9 },
      { text: "Johnson", points: 10 },
      { text: "Roberts", points: -5 },
      { text: "Robinson", points: -3 },
      { text: "Thompson", points: -3 }
    ] 
  }
];

export const GAME_CONFIG = {
  GRAVITY: 0.6,
  JUMP_FORCE: -16,
  ACCELERATION: 1.2,
  FRICTION: 0.85,
  MAX_SPEED: 10,
  LEVEL_WIDTH: 12000,
  LEVEL_HEIGHT: 1080,
  PLAYER_SIZE: 64,
};

export const PLATFORMS: Platform[] = [
  // Main Ground Pieces
  { x: 0, y: 800, w: 12000, h: 280 }, // Continuous ground for safety

  // Starting Platform (to reach the first icon platform)
  { x: 150, y: 680, w: 300, h: 40 },

  // Platforms aligned to icons (Icons are at x = 800 + i * 1000, y = 400)
  { x: 600, y: 550, w: 400, h: 40 },  // Under Icon 1
  { x: 1600, y: 550, w: 400, h: 40 }, // Under Icon 2
  { x: 2600, y: 550, w: 400, h: 40 }, // Under Icon 3
  { x: 3600, y: 550, w: 400, h: 40 }, // Under Icon 4
  { x: 4600, y: 550, w: 400, h: 40 }, // Under Icon 5
  { x: 5600, y: 550, w: 400, h: 40 }, // Under Icon 6
  { x: 6600, y: 550, w: 400, h: 40 }, // Under Icon 7
  { x: 7600, y: 550, w: 400, h: 40 }, // Under Icon 8
  { x: 8600, y: 550, w: 400, h: 40 }, // Under Icon 9
  { x: 9600, y: 550, w: 400, h: 40 }, // Under Icon 10

  // Intermediate platforms for easier jumping
  { x: 1200, y: 650, w: 200, h: 40 },
  { x: 2200, y: 650, w: 200, h: 40 },
  { x: 3200, y: 650, w: 200, h: 40 },
  { x: 4200, y: 650, w: 200, h: 40 },
  { x: 5200, y: 650, w: 200, h: 40 },
  { x: 6200, y: 650, w: 200, h: 40 },
  { x: 7200, y: 650, w: 200, h: 40 },
  { x: 8200, y: 650, w: 200, h: 40 },
  { x: 9200, y: 650, w: 200, h: 40 },
];
