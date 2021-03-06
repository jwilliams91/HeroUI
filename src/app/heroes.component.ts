import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { Sidekick } from './sidekick';
import { HeroService } from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: []
})
export class HeroesComponent implements OnInit{
  constructor(private heroService: HeroService, private router: Router){}

  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  onSelect(hero: Hero): void{
    this.selectedHero = hero;
    this.getSidekicks();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id).then(() =>{this.getHeroes();
      if(this.selectedHero === hero) {this.selectedHero = null;}
    });
  }

  getSidekicks(): void {
    this.heroService.getSidekicks(this.selectedHero.id).then(sidekicks => this.selectedHero.sidekicks = sidekicks);
  }

  ngOnInit(): void{
    this.getHeroes();
  }

}


