import { Component, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {

  @Input()
  hero: Hero;

}
