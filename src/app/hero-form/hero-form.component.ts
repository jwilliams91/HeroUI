import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  moduleId: module.id,
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private location: Location) { }

  submitted = false;
  newHero: Hero;
  ngOnInit() {
    this.newHero = new Hero();
  }


  onSubmit(): void{ 
    this.submitted = true; 
    this.heroService.addHero(this.newHero);
  }

  goBack(): void {
    this.location.back();
  }
}
