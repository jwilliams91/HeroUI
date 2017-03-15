import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Weapon } from '../../weapon';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

  @Input() listSidekicks: FormGroup;
  @Input() index: number;

  constructor(private fb: FormBuilder) {
    
   }

  ngOnInit() {
    console.log(this.listSidekicks);
    this.weapons.push(this.fb.group(this.initWeapon()));
  }

  get weapons(): FormArray {
    return this.listSidekicks.get(this.index.toString()).get("weapons") as FormArray;//.controls["0"].controls.weapons`) as FormArray;
  }

  initWeapon(): Weapon {
    let w = new Weapon();
    w.name = "";
    w.powerLevel = null;
    return w;
  }

  get sidekick(): FormGroup {
    return this.listSidekicks.get(this.index.toString()) as FormGroup;
  }

  deleteWeapon(index: number): void {
    this.weapons.removeAt(index);
    if(this.weapons.length === 0)
    {
      this.listSidekicks.removeControl('weapons');
    }
  }

  addWeapon(): void {
    this.weapons.push(this.fb.group(this.initWeapon()));
  }

}
