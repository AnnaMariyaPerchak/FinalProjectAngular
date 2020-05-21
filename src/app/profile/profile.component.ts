import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LogInService } from '../shared/services/log-in.service';
import { UsersService } from '../shared/services/users.service';
import { IPreference } from '../shared/interfaces/preference.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IUser } from '../shared/interfaces/user.interface';
import { User } from '../shared/modules/user.module';
import { PreferencesService } from '../shared/services/preferences.service';
import { Preference } from '../shared/modules/preference.module';
import { OrdersService } from '../shared/services/orders.service';
import { Order } from '../shared/modules/order.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User

  userName: string;
  userEmail: string;
  userAddress: string
  userPhone: string
  userPreferences: IPreference
  userId: string
  userPassword: string

  modalRef: BsModalRef;
  editFirstName: string
  editLastName: string
  editEmail: string
  editAddress: string
  editPhone: string

  meat: boolean
  fish: boolean
  dairyProducts: boolean
  sugar: boolean
  gluten: boolean

  optionMeat: boolean
  optionFish: boolean
  optionDairyProduct: boolean
  optionSugar: boolean
  optionGluten: boolean

  options: any = [
    { name: 'yes', checked: true },
    { name: 'no', checked: false }
  ];

  prefId: string

  personalOrders: Array<Order>

  constructor(private auth: LogInService,
    private userSErvice: UsersService,
    private prefService: PreferencesService,
    private orderService: OrdersService,
    private modalService: BsModalService) { }



  ngOnInit(): void {
    this.getUser()
  }


  logOut(): void {
    this.auth.signOut();
  }

  check(data) {
    console.log(data);
  }

  submit(form: NgForm) {
    console.log(form.value)
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.user)
    this.userName = this.user.firstName + ' ' + this.user.lastName
    this.userEmail = this.user.email
    this.userAddress = this.user.address
    this.userPhone = this.user.phone
    this.userPreferences = this.user.preferences
    this.optionMeat = this.user.preferences.optionMeat
    this.optionFish = this.user.preferences.optionFish
    this.optionDairyProduct = this.user.preferences.optionDairyProduct
    this.optionSugar = this.user.preferences.optionSugar
    this.optionGluten = this.user.preferences.optionGluten
    this.userId = this.user.id
    this.userPassword = this.user.password
    console.log(this.userEmail)

    this.orderService.getCloudOrdersPersonal(this.user.email).subscribe(
      data=>{
        console.log(data)
        this.personalOrders=data
      }
    )
  }

  openModal(template: TemplateRef<any>, user: IUser) {
    this.modalRef = this.modalService.show(template);
    this.editFirstName = this.user.firstName
    this.editLastName = this.user.lastName
    this.editEmail = this.user.email
    this.editAddress = this.user.address
    this.editPhone = this.user.phone

    const newPref = JSON.parse(localStorage.getItem('preference'))
    console.log(newPref)
    this.prefId = newPref.id
    this.prefService.getCloudOneUserPreference(newPref.id).subscribe(
      data => {
        console.log('pref from firebase', newPref)
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
          this.optionDairyProduct = newPref.optionDairyProduct
        } else if (newPref.optionDairyProduct === 'no') {
          this.dairyProducts = false
          this.optionDairyProduct = newPref.optionDairyProduct
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
    )
  }

  saveEditProfile() {
    console.log(this.optionMeat)
    console.log(this.optionFish)
    console.log(this.optionDairyProduct)
    console.log(this.optionSugar)
    console.log(this.optionGluten)

    const newPreferene: IPreference = new Preference(this.prefId, this.optionMeat, this.optionFish,
      this.optionDairyProduct, this.optionSugar, this.optionGluten)
    console.log(newPreferene)
    localStorage.setItem('preference', JSON.stringify(newPreferene))
    this.prefService.updateCloudCategory(newPreferene)
    const editProfile: IUser = new User(this.userId, this.editFirstName, this.editLastName,
      this.editEmail, this.userPassword, this.editAddress,
      this.editPhone, newPreferene, 'user');
    console.log(editProfile)
    this.userSErvice.updateCloudUser(editProfile)
    localStorage.setItem('user', JSON.stringify(editProfile))
    this.getUser();
  }
  Meat(value: boolean): void {
    console.log('You eat meat: ' + value)
    this.optionMeat = value
  }
  Fish(value: boolean): void {
    console.log('You eat fish: ' + value)
    this.optionFish = value
  }
  DairyProducts(value: boolean): void {
    console.log('You eat dairy products: ' + value)
    this.optionDairyProduct = value
  }
  Sugar(value: boolean): void {
    console.log('You eat sugar: ' + value)
    this.optionSugar = value
  }
  Gluten(value: boolean): void {
    console.log('You eat gluten: ' + value)
    this.optionGluten = value
  }
}
