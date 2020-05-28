import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IPreference } from '../shared/interfaces/preference.interface';
import { Preference } from '../shared/modules/preference.module';
import { PreferencesService } from '../shared/services/preferences.service';

import {PageScrollConfig} from 'ng2-page-scroll';


@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss'],
  // animations: [slideInOutAnimation]
})
export class GetStartedComponent implements OnInit {

  // AOS.init();
  
  optionFish: boolean;
  optionMeat: boolean;
  optionDairyProduct: boolean;
  optionSugar: boolean;
  optionGluten: boolean;
  options: string[] = ['yes','no'];
  preferences:Array<IPreference>=[]
  
  constructor(private prefService: PreferencesService) { }

  ngOnInit(): void {
    this.getPreference()
  }

  onClick(id: string): void {
    const el: HTMLElement|null = document.getElementById(id);
    if (el) {
      setTimeout(() =>
        el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'}), 0);
    }
  }

  signUp():void{
    console.log(this.optionMeat)
    console.log(this.optionFish)
    console.log(this.optionDairyProduct)
    console.log(this.optionSugar)
    console.log(this.optionGluten)
  }
  private getPreference():void{
    this.prefService.getCloudPreferences().subscribe(data => {
      this.preferences = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Preference;
      })
    });
  }
  public addPreference(): void {
    const newPreference: IPreference = new Preference(`${this.uuid()}`,
      this.optionMeat,this.optionFish,this.optionDairyProduct,this.optionSugar,this.optionGluten)
    // this.preferences = [];
    localStorage.setItem('preference', JSON.stringify(newPreference));
    this.prefService.addCloudPreference(newPreference)
    this.preferences.push(newPreference)
    console.log(this.preferences)
    // .subscribe(
    //   () => {
    //     // console.log(this.preferences)
    //     console.log('order success');
    //   }
    // );
  }
  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  
}
