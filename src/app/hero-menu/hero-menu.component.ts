import { Component, OnInit, ViewChild } from '@angular/core';
import { MdMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-hero-menu',
  templateUrl: './hero-menu.component.html',
  styleUrls: ['./hero-menu.component.css']
})
export class HeroMenuComponent implements OnInit {
  @ViewChild(MdMenuTrigger) trigger : MdMenuTrigger;


  mouseOver(): void {
    this.trigger.openMenu();
  }

  mouseOut(): void {
    this.trigger.closeMenu();
  }

  constructor() { }

  ngOnInit() {
  }

}
