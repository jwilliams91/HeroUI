import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup,FormArray,FormBuilder,Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';
import { Sidekick } from '../../sidekick';

@Component({
  moduleId: module.id,
  selector: 'app-hero-with-sidekick-form',
  templateUrl: './hero-with-sidekick-form.component.html',
  styleUrls: ['./hero-with-sidekick-form.component.css']
})
export class HeroWithSidekickFormComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;

  constructor(
    private heroService: HeroService,
    private location: Location,
    private router: Router,
    private fb:FormBuilder
  ) { this.createForm();}

  heroForm: FormGroup;
  newHero: Hero;
  newSidekicks: Sidekick[];

  ngOnInit() {
    this.newHero = new Hero();

  }

  onSubmit(newHero: Hero): void {
    console.log('On onSubmit');
    this.newHero = this.prepareSaveHero();
    this.newSidekicks = this.prepareSaveSidekicks();
    this.heroService.create(this.newHero, this.newSidekicks);
    this.router.navigateByUrl("/heroes");
  }


  createForm(): void {
    this.heroForm = this.fb.group({
      hName: ['', Validators.required],
      hId: ['', Validators.required],
      hBio: ['', Validators.required],
      sidekick: this.fb.group({
        name: ['', Validators.required],
        secretIdentity: ['', Validators.required],
        bio: ['', Validators.required],
        hero:'',
        age: ['', Validators.required]
      })
    });
  }

  addSidekick(): void {
    this.newSidekicks.push(new Sidekick());
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

  prepareSaveHero(): Hero {
    const formModel = this.heroForm.value;
    var saveHero: Hero = {
      id: null,
      name: formModel.hName as string,
      secretIdentity: formModel.hId as string,
      bio: formModel.hBio as string,
      sidekicks: new Array<Sidekick>()
    }; 
    return saveHero;
  }

  prepareSaveSidekicks(): Sidekick[] {
    const formModel = this.heroForm.value;
    var sArray = new Array<Sidekick>();
    var saveSidekick: Sidekick = {
      id: null,
      name: formModel.sidekick.name as string,
      secretIdentity: formModel.sidekick.secretIdentity as string,
      bio: formModel.sidekick.bio as string,
      age: formModel.sidekick.age as number
    };
    sArray.push(saveSidekick);
    return sArray;
  }
}
