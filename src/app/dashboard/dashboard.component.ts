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
    if(id === 13){
      this.imgSrc = "../assets/Thor.png";
    }
    else if(id === 12)
    {
      this.imgSrc = "../assets/IronMan.png";
    }
    else if(id === 14)
    {
      this.imgSrc = "../assets/Captain-America.png";
    }
    else if(id === 15)
    {
      this.imgSrc = "../assets/Hulk.png";
    }
  }

  onMouseOut(): void {
    this.imgSrc = null;
  }
}
