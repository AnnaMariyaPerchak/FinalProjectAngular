import { Component, OnInit } from '@angular/core';
import { IPreference } from 'src/app/shared/interfaces/preference.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { UsersService } from 'src/app/shared/services/users.service';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import { Preference } from 'src/app/shared/modules/preference.module';
import { LogInService } from 'src/app/shared/services/log-in.service';

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

  pref: any
  prefId: string



  constructor(private userService: UsersService,
    private prefService: PreferencesService,
    private auth: LogInService) { }

  ngOnInit(): void {
    const newPref = JSON.parse(localStorage.getItem('preference'))
    this.prefId = newPref.id
    if (newPref.optionMeat === 'yes') {
      this.meat = true
      this.optionMeat = newPref.optionMeat
    } else if (newPref.optionMeat === 'no') {
      this.meat = false
      this.optionMeat = newPref.optionMeat
    }

    if (newPref.optionFish === 'yes') {
      this.fish = true
      this.optionFish = newPref.optionFish
    } else if (newPref.optionFish === 'no') {
      this.fish = false
      this.optionFish = newPref.optionFish
    }

    if (newPref.optionDairyProduct === 'yes') {
      this.dairyProducts = true
      this.optionDairyProducts = newPref.optionDairyProduct
    } else if (newPref.optionDairyProduct === 'no') {
      this.dairyProducts = false
      this.optionDairyProducts = newPref.optionDairyProduct
    }

    if (newPref.optionSugar === 'yes') {
      this.sugar = true
      this.optionSugar = newPref.optionSugar
    } else if (newPref.optionSugar === 'no') {
      this.sugar = false
      this.optionSugar = newPref.optionSugar
    }
    if (newPref.optionGluten === 'yes') {
      this.gluten = true
      this.optionGluten = newPref.optionGluten
    } else if (newPref.optionGluten === 'no') {
      this.gluten = false
      this.optionGluten = newPref.optionGluten
    }
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

