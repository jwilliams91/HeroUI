import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit{

  @Input()
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ){}
  

  imgSrc: string;

  ngOnInit(): void{
    this.route.params.switchMap((params: Params) => this.getHero(params))
    .subscribe(hero => this.hero = hero);
  }
  
  getHero(params: Params): Promise<Hero>{

    if(params['id']){
      return this.heroService.getHero(+params['id']);
    }
    else{
      return this.heroService.getHero(1);
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero).then(() => this.goBack());
  }
}
