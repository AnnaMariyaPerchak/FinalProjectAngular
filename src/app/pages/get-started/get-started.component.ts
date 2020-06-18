import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IPreference } from 'src/app/shared/interfaces/preference.interface';
import { Preference } from 'src/app/shared/modules/preference.module';
import { PreferencesService } from 'src/app/shared/services/preferences.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit {
  
  optionFish: boolean;
  optionMeat: boolean;
  optionDairyProduct: boolean;
  optionSugar: boolean;
  optionGluten: boolean;
  options: string[] = ['yes','no'];
  preferences:Array<IPreference>=[]
  
  logged:boolean
  constructor(private prefService: PreferencesService) { }

  ngOnInit(): void {
    this.getPreference()
    if (localStorage.getItem('user')){
      this.logged=true
    } else {
      this.logged=false
    }
  }

  onClick(id: string): void {
    const el: HTMLElement|null = document.getElementById(id);
    if (el) {
      setTimeout(() =>
        el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'}), 0);
    }
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
                                                      this.optionMeat,
                                                      this.optionFish,
                                                      this.optionDairyProduct,
                                                      this.optionSugar,
                                                      this.optionGluten)

    localStorage.setItem('preference', JSON.stringify(newPreference));
    this.prefService.addCloudPreference(newPreference)
    this.preferences.push(newPreference)
  }
  
  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  
}
