
export interface PresentationSegment {
  id: string;
  title: string;
  shortName: string;
  content: string;
  icon: string;
  imageUrl?: string;
}


export interface Player {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  facing: 'left' | 'right';
  onGround: boolean;
}

export interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
  type?: 'ground' | 'float' | 'hazard';
}

export interface Entity {
  x: number;
  y: number;
  segmentId: string;
  icon: string;
  collected: boolean;
  lastCollectedAt?: number;
}