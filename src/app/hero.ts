import {Sidekick} from './sidekick';

export class Hero{
  id: number;
  name: string;
  secretIdentity: string;
  bio: string;
  sidekicks: Sidekick[]; 
}

export const states = ['CA', 'MD', 'OH', 'VA'];