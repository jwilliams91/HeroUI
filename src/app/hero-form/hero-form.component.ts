import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  moduleId: module.id,
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;

  constructor(
    private heroService: HeroService,
    private location: Location,
    private router: Router) { }

  submitted = false;
  newHero: Hero;
  heroImage: File;

  ngOnInit() {
    this.newHero = new Hero();
  }


  onSubmit(newHero: Hero): void{ 
    this.submitted = true; 
    this.heroService.create(newHero.name, newHero.secretIdentity, newHero.bio);
    this.heroService.uploadHeroImage(this.getFileRef());
    this.router.navigateByUrl("/heroes");
  }

  getFileRef(): FormData {
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if(fileCount > 0){
        for(let i=0; i < fileCount; i++)
        {
          formData.append('file[]', inputEl.files.item(i));
        }
        return formData;
    }
  }
  goBack(): void {
    this.location.back();
  }

}
