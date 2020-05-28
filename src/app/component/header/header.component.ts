import { Component, OnInit } from '@angular/core';
import { IDish } from 'src/app/shared/interfaces/dish.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { LogInService } from 'src/app/shared/services/log-in.service';
import { PreferencesService } from 'src/app/shared/services/preferences.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  myBasket: Array<IDish> = [];
  totalPrice = 0;
  statusLogin: boolean;
  urlLogin: string;
  pageLogin: string;

  recomendMeat: string
  recomendFish: string
  recomendGluten: string
  recomendDairy: string
  recomendSugar: string
  recomendBowl: string
  recomendSalad: string
  recomendSoup: string
  recomendPasta: string
  recomendBakery: string
  recomendDesserts: string
  // recomendBowl:any= this.recomendMeat || this.recomendFish
  // recomendSalad:any= this.recomendMeat || this.recomendFish || this.recomendDairy
  // recomendSoup:any=this.recomendMeat || this.recomendFish 
  // recomendPasta:any=this.recomendMeat || this.recomendFish || !this.recomendGluten
  // recomendBakery:any=this.recomendDairy || !this.recomendSugar
  // recomendDesserts:any=this.recomendSugar || this.recomendGluten || !this.recomendDairy
  constructor(private orderService: OrdersService, private prefService: PreferencesService, private auth: LogInService) {

    if (localStorage.getItem('preference')) {
      const pref = JSON.parse(localStorage.getItem('preference'))
      this.prefService.preference.next(pref.optionMeat);
      console.log(pref)
      if (pref.optionMeat === 'yes') {
        this.recomendMeat = 'recomend to you'
        this.prefService.preference.next(pref.optionMeat);
      }
      else { this.recomendMeat = ''; this.prefService.preference.next(pref.optionMeat); }

      if (pref.optionFish === 'yes') { this.recomendFish = 'recomend to you' }
      else { this.recomendFish = '' }

      if (pref.optionMeat === 'yes' && pref.optionFish === 'yes') { this.recomendSoup = 'recomend to you' }
      else { this.recomendSoup = '' }

      if (pref.optionMeat === 'yes' && pref.optionFish === 'yes' && pref.optionGluten === 'no') { this.recomendPasta = 'recomend to you' }
      else { this.recomendPasta = '' }

      if (pref.optionMeat === 'yes' && pref.optionFish === 'yes') { this.recomendBowl = 'recomend to you' }
      else { this.recomendBowl = '' }

      if (pref.optionMeat === 'yes' && pref.optionFish === 'yes' && pref.optionDairyProduct === 'yes') { this.recomendSalad = 'recomend to you' }
      else { this.recomendSalad = '' }

      if (pref.optionDairyProduct === 'yes' && pref.optionSugar === 'yes') { this.recomendBakery = 'recomend to you' }
      else { this.recomendBakery = '' }

      if (pref.optionDairyProduct === 'no' && pref.optionSugar === 'no' && pref.optionGluten === 'yes') { this.recomendDesserts = 'recomend to you' }
      else { this.recomendDesserts = '' }
    } else {
      this.recomendMeat = ''
      this.recomendFish = ''
      this.recomendSoup = ''
      this.recomendPasta = ''
      this.recomendBowl = ''
      this.recomendSalad = ''
      this.recomendBakery = ''
      this.recomendDesserts = ''
    }
  }

  ngOnInit(): void {
    this.checkBasket();
    this.getLocalStorage();
    this.checkUser()
    this.checkUserLocalStorage()
    const pref = JSON.parse(localStorage.getItem('preference'))
    // this.prefService.preferenceMeat.next(pref.optionMeat);
    this.prefService.preference.subscribe(
      data => {
        console.log(data)
        if (pref.optionMeat === 'yes') {
          this.recomendMeat = 'recomend to you'
        }
        else { this.recomendMeat = '' }
      }
    )
    this.prefService.preference.next(pref.optionMeat)
    // this.prefService.updateCloudPreference(pref)
  }

  private checkBasket(): void {
    this.orderService.basket.subscribe(
      () => {
        this.getLocalStorage();
      }
    );
  }

  private getLocalStorage(): void {
    if (localStorage.length > 0 && localStorage.getItem('dishes')) {
      this.myBasket = JSON.parse(localStorage.getItem('dishes'));
      this.totalPrice = this.myBasket.reduce((total, product) => total + (product.price * product.count), 0);
    }
  }
  private checkUser(): void {
    this.auth.userStatusChanges.subscribe(
      () => {
        this.checkUserLocalStorage();
      }
    );
  }

  private checkUserLocalStorage(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      if (user.role === 'admin') {
        this.urlLogin = 'admin';
        this.pageLogin = 'Admin';
      } else {
        this.urlLogin = 'profile';
        this.pageLogin = 'Cabinet';
      }
      this.statusLogin = true;
    } else {
      this.statusLogin = false;
      this.urlLogin = '';
      this.pageLogin = '';
    }
  }
}
