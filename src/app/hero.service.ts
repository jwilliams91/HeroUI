import {Injectable} from '@angular/core';

import {Hero} from './hero';
import {HEROES} from './mock-heroes';


@Injectable()
export class HeroService
{
    getHeroes(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    } //stub

    getHero(id: number): Promise<Hero> {
        return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
    }

    addHero(newHero: Hero): void{
        this.getHeroes().then(heroes => newHero.id = (heroes.length + 1));
        this.getHeroes().then(heroes => heroes.push(newHero));
    }
}