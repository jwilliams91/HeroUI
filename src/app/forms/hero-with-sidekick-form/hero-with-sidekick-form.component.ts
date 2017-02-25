import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray }       from '@angular/forms';
import { Sidekick } from '../../Sidekick';

@Component({
  moduleId: module.id,
  selector: 'app-hero-with-sidekick-form',
  templateUrl: './hero-with-sidekick-form.component.html',
  styleUrls: ['./hero-with-sidekick-form.component.css']
})
export class HeroWithSidekickFormComponent implements OnInit, OnChanges {
  heroForm: FormGroup;

  constructor(private fb: FormBuilder) {this.createForm()}

  ngOnInit() {
  }

  ngOnChanges(){
    this.heroForm.reset();
  }

  createForm(): void {
    this.heroForm = this.fb.group({
      name: ['Batman', Validators.required],
      sidekickArray: this.fb.group(this.fb.array([]))
    });
  }

  get sidekickArray(): FormArray {
  return this.heroForm.get('sidekickArray') as FormArray;
};

  addSidekick(): void {
  this.sidekickArray.push(this.fb.group(new Sidekick()));
}

setSidekicks(sidekicks: Sidekick[]) {
  const sidekickFGs = sidekicks.map(sidekick => this.fb.group(sidekick));
  const sidekickFormArray = this.fb.array(sidekickFGs);
  this.heroForm.setControl('sidekickArray', sidekickFormArray);
}


}
