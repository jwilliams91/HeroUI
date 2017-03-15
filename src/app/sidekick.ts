import {Hero} from './hero';
import {Weapon} from '../weapon';

export class Sidekick{
  id: number;
  name: string;
  secretIdentity: string;
  bio: string;
  age: number;
  weapons: Weapon[];
}