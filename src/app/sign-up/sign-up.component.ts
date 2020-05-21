import { Component, OnInit } from '@angular/core';
import { IPreference } from '../shared/interfaces/preference.interface';
import { IUser } from '../shared/interfaces/user.interface';
import { User } from '../shared/modules/user.module';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { UsersService } from '../shared/services/users.service';
import { PreferencesService } from '../shared/services/preferences.service';
import { Preference } from '../shared/modules/preference.module';
import { LogInService } from '../shared/services/log-in.service';
import { database } from 'firebase';

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

  meat:boolean
  fish:boolean
  dairyProducts:boolean
  sugar:boolean
  gluten:boolean

  optionMeat:boolean
  optionFish:boolean
  optionDairyProducts:boolean
  optionSugar:boolean
  optionGluten:boolean

  options:any = [
    {name:'yes',checked:true},
    {name:'no',checked:false}
  ];

  prefId:string

  constructor(private userService: UsersService,
    private prefService: PreferencesService,
    private auth: LogInService) { }

  ngOnInit(): void {
    const newPref=JSON.parse(localStorage.getItem('preference'))
    console.log(newPref)
    this.prefId=newPref.id
    this.prefService.getCloudOneUserPreference(newPref.id).subscribe(
      data=>{
        console.log('pref from firebase',newPref)
        if (newPref.optionMeat==='yes'){
          this.meat=true
          this.optionMeat=newPref.optionMeat
        } else if (newPref.optionMeat==='no'){
            this.meat=false
            this.optionMeat=newPref.optionMeat
        }

        if (newPref.optionFish==='yes'){
          this.fish=true
          this.optionFish=newPref.optionFish
        } else if (newPref.optionFish==='no'){
            this.fish=false
            this.optionFish=newPref.optionFish
        }

        if (newPref.optionDairyProduct==='yes'){
          this.dairyProducts=true
          this.optionDairyProducts=newPref.optionDairyProduct
        } else if (newPref.optionDairyProduct==='no'){
            this.dairyProducts=false
            this.optionDairyProducts=newPref.optionDairyProduct
        }

        if (newPref.optionSugar==='yes'){
          this.sugar=true
          this.optionSugar=newPref.optionSugar
        } else if (newPref.optionSugar==='no'){
            this.sugar=false
            this.optionSugar=newPref.optionSugar
        }
        if (newPref.optionGluten==='yes'){
          this.gluten=true
          this.optionGluten=newPref.optionGluten
        } else if (newPref.optionGluten==='no'){
            this.gluten=false
            this.optionGluten=newPref.optionGluten
        }
      }
    )
  }

  signUp(): void {
    // if (this.options[0].checked){this.editMeat='yes';console.log(this.editMeat)}
    //   else if (this.options[1].checked){this.editMeat='no';console.log(this.editMeat)}
      // console.log(this.optionMeat)
      // console.log(this.optionFish)
      // console.log(this.optionDairyProducts)
      // console.log(this.optionSugar)
      // console.log(this.optionGluten)
      const pref=JSON.parse(localStorage.getItem('preference'))

      const newPreferene:IPreference=new Preference(this.prefId,pref.optionMeat,pref.optionFish,
        pref.optionDairyProducts,pref.optionSugar,pref.optionGluten)
        console.log(newPreferene)
        localStorage.setItem('preference',JSON.stringify(newPreferene))
        this.prefService.updateCloudCategory(newPreferene)
        // console.log(this.editMeat)

    // this.auth.signUp(this.firstName, this.lastName,
    //   this.email, this.password,
    //   this.phone, this.address,
    //   this.preferences)
    // this.prefService.getCloudPreferences().subscribe(
      // data => {

        // this.meatYes=true
        //   this.meatNo=false
      //   if (this.meatYes && !this.meatNo){this.editMeat='yes';this.meatYes=true;this.meatNo=false}
      //  else if (!this.meatYes && this.meatNo){this.editMeat='no';this.meatYes=false;this.meatNo=true}
      //  console.log(this.editMeat)
// console.log(this.meatYes)
        // const pref=JSON.parse(localStorage.getItem('preference'))
        // console.log(pref)
        this.auth.signUp(this.firstName, this.lastName,
          this.email, this.password,
          this.phone, this.address, newPreferene);
          // console.log(data)
      // },
      // error => { 
      //   console.log('Preference service', error)
      // }
      // )
      
  }
  // uuid(): string {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  //     let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  //     return v.toString(16);
  //   });
  // }

  Meat(value:boolean):void{
    console.log('You eat meat: '+value)
    // this.optionMeat=value
    const pref=JSON.parse(localStorage.getItem('preference'))
    pref.optionMeat=value
    localStorage.setItem('preference',JSON.stringify(pref))
  }
  Fish(value:boolean):void{
    console.log('You eat fish: '+value)
    const pref=JSON.parse(localStorage.getItem('preference'))
    this.optionFish=value
    localStorage.setItem('preference',JSON.stringify(pref))
  }
  DairyProducts(value:boolean):void{
    console.log('You eat dairy products: '+value)    
    const pref=JSON.parse(localStorage.getItem('preference'))
    this.optionDairyProducts=value
    localStorage.setItem('preference',JSON.stringify(pref))
  }
  Sugar(value:boolean):void{
    console.log('You eat sugar: '+value)
    const pref=JSON.parse(localStorage.getItem('preference'))
    this.optionSugar=value
    localStorage.setItem('preference',JSON.stringify(pref))
  }
  Gluten(value:boolean):void{
    console.log('You eat gluten: '+value)
    const pref=JSON.parse(localStorage.getItem('preference'))
    this.optionGluten=value
    localStorage.setItem('preference',JSON.stringify(pref))
  }
}

