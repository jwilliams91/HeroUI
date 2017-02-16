import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  imgSrc: string;
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(0,4));

  }

  onMouseOver(id: Number): void {

    switch(id)
    {
      case 1: this.imgSrc = "../assets/Iron Man.png"; break;
      case 2: this.imgSrc = "../assets/Thor.png"; break;
      case 3: this.imgSrc = "../assets/Captain America.png"; break;
      case 4: this.imgSrc = "../assets/Hulk.png"; break;
    }
    
  }

  onMouseOut(): void {
    this.imgSrc = null;
  }
}
