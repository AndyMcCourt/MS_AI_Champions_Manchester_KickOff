import { PresentationSegment, Platform } from './types';
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
    id: 'break',
    title: "Break",
    shortName: "Break",
    content: "Time to pause, recharge, and informally discuss ideas from the morning sessions.",
    icon: '☕',
    imageUrl: "https://picsum.photos/seed/coffee/800/800"
  },
  {
    id: 'microsoft',
    title: "Microsoft‑Led Session: Getting Value from Copilot",
    shortName: "Intro to Agents",
    content: "Microsoft-led session on building agents in the Copilot environment, alongside practical Microsoft 365 Copilot examples for finance.",
    icon: '💻',
    imageUrl: microsoftLedSessionImage
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
