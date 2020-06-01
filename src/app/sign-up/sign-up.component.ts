import { Component, OnInit } from '@angular/core';
import { IPreference } from '../shared/interfaces/preference.interface';
import { IUser } from '../shared/interfaces/user.interface';
import { UsersService } from '../shared/services/users.service';
import { PreferencesService } from '../shared/services/preferences.service';
import { Preference } from '../shared/modules/preference.module';
import { LogInService } from '../shared/services/log-in.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  address: string
  preferences: IPreference = {
    id: "78", optionFish: true, optionMeat: true,
    optionDairyProduct: true, optionSugar: true, optionGluten: true
  }
  users: Array<IUser> = []

  meat: boolean
  fish: boolean
  dairyProducts: boolean
  sugar: boolean
  gluten: boolean

  optionMeat: boolean
  optionFish: boolean
  optionDairyProducts: boolean
  optionSugar: boolean
  optionGluten: boolean

  options: any = [
    { name: 'yes', checked: true },
    { name: 'no', checked: false }
  ];

  prefId: string

  constructor(private userService: UsersService,
    private prefService: PreferencesService,
    private auth: LogInService) { }

  ngOnInit(): void {
    const newPref = JSON.parse(localStorage.getItem('preference'))
    this.prefId = newPref.id
    this.prefService.getCloudOneUserPreference(newPref.id).subscribe(
      data => {
        console.log('pref from firebase', data)
        if (data.optionMeat === 'yes') {
          this.meat = true
          this.optionMeat = data.optionMeat
        } else if (data.optionMeat === 'no') {
          this.meat = false
          this.optionMeat = data.optionMeat
        }

        if (data.optionFish === 'yes') {
          this.fish = true
          this.optionFish = data.optionFish
        } else if (data.optionFish === 'no') {
          this.fish = false
          this.optionFish = data.optionFish
        }

        if (data.optionDairyProduct === 'yes') {
          this.dairyProducts = true
          this.optionDairyProducts = data.optionDairyProduct
        } else if (data.optionDairyProduct === 'no') {
          this.dairyProducts = false
          this.optionDairyProducts = data.optionDairyProduct
        }

        if (data.optionSugar === 'yes') {
          this.sugar = true
          this.optionSugar = data.optionSugar
        } else if (data.optionSugar === 'no') {
          this.sugar = false
          this.optionSugar = data.optionSugar
        }
        if (data.optionGluten === 'yes') {
          this.gluten = true
          this.optionGluten = data.optionGluten
        } else if (data.optionGluten === 'no') {
          this.gluten = false
          this.optionGluten = data.optionGluten
        }
      }
    )
  }

  signUp(): void {
    const pref = JSON.parse(localStorage.getItem('preference'))
    const newPreferene: IPreference = new Preference(this.prefId,
      pref.optionMeat,
      pref.optionFish,
      pref.optionDairyProduct,
      pref.optionSugar,
      pref.optionGluten)
    localStorage.setItem('preference', JSON.stringify(newPreferene))
    this.prefService.addCloudPreference(newPreferene)
    this.auth.signUp(this.firstName,
      this.lastName,
      this.email,
      this.password,
      this.phone,
      this.address,
      newPreferene);
  }

  Meat(value: boolean): void {
    const pref = JSON.parse(localStorage.getItem('preference'))
    pref.optionMeat = value
    localStorage.setItem('preference', JSON.stringify(pref))
  }
  Fish(value: boolean): void {
    const pref = JSON.parse(localStorage.getItem('preference'))
    this.optionFish = value
    localStorage.setItem('preference', JSON.stringify(pref))
  }
  DairyProducts(value: boolean): void {
    const pref = JSON.parse(localStorage.getItem('preference'))
    this.optionDairyProducts = value
    localStorage.setItem('preference', JSON.stringify(pref))
  }
  Sugar(value: boolean): void {
    const pref = JSON.parse(localStorage.getItem('preference'))
    this.optionSugar = value
    localStorage.setItem('preference', JSON.stringify(pref))
  }
  Gluten(value: boolean): void {
    const pref = JSON.parse(localStorage.getItem('preference'))
    this.optionGluten = value
    localStorage.setItem('preference', JSON.stringify(pref))
  }
}

