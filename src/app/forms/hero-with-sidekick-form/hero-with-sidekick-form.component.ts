import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup,FormArray,FormBuilder,Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Hero } from '../../hero';
import { Weapon } from '../../../weapon';
import { HeroService } from '../../hero.service';
import { Sidekick } from '../../sidekick';

@Component({
  moduleId: module.id,
  selector: 'app-hero-with-sidekick-form',
  templateUrl: './hero-with-sidekick-form.component.html',
  styleUrls: ['./hero-with-sidekick-form.component.css']
})
export class HeroWithSidekickFormComponent {
  @ViewChild('fileInput') inputEl: ElementRef;

  constructor(
    private heroService: HeroService,
    private location: Location,
    private router: Router,
    private fb:FormBuilder
  ) { this.createForm(); this.newHero = new Hero();}

  heroForm: FormGroup;
  newHero: Hero;
  newSidekicks: Sidekick[];


  onSubmit(newHero: Hero): void {
    console.log('On onSubmit');
    this.newHero = this.prepareSaveHero();
    this.newSidekicks = this.prepareSaveSidekicks();
    this.heroService.create(this.newHero, this.newSidekicks);
    this.heroService.uploadHeroImage(this.getFileRef());
    this.router.navigateByUrl("/heroes");
  }

  createForm(): void {
    this.heroForm = this.fb.group({
      hName: ['', Validators.required],
      hId: ['', Validators.required],
      hBio: ['', Validators.required],
      heroImage: ['']
    });
  }

  addSidekick(): void {
    this.heroForm.addControl('listSidekicks', this.fb.array([]));
    this.listSidekicks.push(this.fb.group(this.initSidekick()));
    let list = this.listSidekicks.get((this.listSidekicks.controls.length - 1).toString()) as FormGroup;
    list.addControl('weapons', this.fb.array([]));
  }

  get listSidekicks(): FormArray {
    return this.heroForm.get('listSidekicks') as FormArray;
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

    if(this.heroForm.contains('listSidekicks')){
      var sidekickDeepCopy: Sidekick[] = formModel.listSidekicks.map((sidekick: Sidekick) => Object.assign({}, sidekick));
     return sidekickDeepCopy; 
    }
    else
      return null;
  }

  initSidekick():Sidekick {
    var s = new Sidekick();
    s.name = '';
    s.bio = '';
    s.secretIdentity ='';
    s.age =  null;
    return s;
  }

  deleteSidekick(index: number): void {
    this.listSidekicks.removeAt(index);
    if(this.listSidekicks.length === 0)
    {
      this.heroForm.removeControl('listSidekicks');
    }
  }

}
