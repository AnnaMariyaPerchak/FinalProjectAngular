import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { IDish } from 'src/app/shared/interfaces/dish.interface';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { Order } from 'src/app/shared/modules/order.module';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/shared/modules/user.module';
import { Preference } from 'src/app/shared/modules/preference.module';
import { IPreference } from 'src/app/shared/interfaces/preference.interface';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  orders: Array<IDish> = [];
  userFirstName: string 
  userLastName: string 
  userAddress: string
  userPhone: string
  userEmail: string

  totalPrice: number

  makeOrder: boolean = true

  modalRef: BsModalRef;

  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  dishesForOrder: Array<IDish>
  // totalPayment: number

  constructor(private orderService: OrdersService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.checkBasket();
    if (localStorage.getItem('user')) {
      this.makeOrder = true;
    } else {
      this.makeOrder = false
    }
  }

  private checkBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('dishes')) {
      this.orders = JSON.parse(localStorage.getItem('dishes'));
    }
    this.total()
  }

  public orderCount(dish: IDish, status: boolean): void {
    if (status) {
      dish.count++;
    }
    else {
      if (dish.count > 1) {
        dish.count--;
      }
    }
    this.updateLocalStorage();
    this.total()
  }

  public deleteOrder(dish: IDish) {
    const index = this.orders.findIndex(d => d.id === dish.id);
    this.orders.splice(index, 1);
    this.total()
    this.updateLocalStorage();
    // console.log(this.orders)
  }

  private updateLocalStorage() {
    localStorage.setItem('dishes', JSON.stringify(this.orders));
    this.orderService.basket.next(this.orders);
  }

  private total() {
    this.totalPrice = this.orders.reduce((total, elem) => {
      return total + (elem.price * elem.count);
    }, 0);
  }

  public addOrder(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
    console.log(JSON.parse(localStorage.getItem('user')))
    const user = JSON.parse(localStorage.getItem('user'))
    this.userFirstName = user.firstName
    this.userLastName = user.lastName
    this.userAddress = user.address
    this.userPhone = user.phone
    this.userEmail=user.email
    console.log(user.email)
    // alert('Your order is being prepared')

    // else if (!localStorage.getItem('user')){this.makeOrder=false}
    const newOrder: IOrder = new Order(`${this.uuid()}`,user,this.orders,this.totalPrice)
      console.log(newOrder)
    this.orders = [];
    localStorage.setItem('dishes', JSON.stringify(this.orders));
    this.orderService.basket.next(this.orders);
    this.orderService.addCloudOrder(newOrder)
  }

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  orderWithoutLogIn(): void {
    console.log(this.userFirstName)
    console.log(this.userLastName)
    console.log(this.userEmail)
    console.log(this.userPhone)
    console.log(this.userAddress)
    console.log(this.totalPrice)
    console.log(this.orders)
    let preferencesWithoutLogIn:IPreference
    if(localStorage.getItem('preference')){
      preferencesWithoutLogIn=JSON.parse(localStorage.getItem('preference'))
      // preferencesWithoutLogIn=preferencesWithoutLogIn1
    } else {
      preferencesWithoutLogIn=new Preference(`${this.uuid()}`,true,true,true,true,true)
      localStorage.setItem('preference',JSON.stringify(preferencesWithoutLogIn))
    }
    console.log(preferencesWithoutLogIn)
    const userWithoutLogIn=new User(`${this.uuid()}`,this.userFirstName,this.userLastName,
    this.email,'111111',this.userAddress,this.phone,preferencesWithoutLogIn,'user')
    localStorage.setItem('user', JSON.stringify(userWithoutLogIn));

    const newOrder: IOrder = new Order(`${this.uuid()}`,
    userWithoutLogIn,
      this.orders,
      this.totalPrice)
      console.log(this.orders)
      console.log(newOrder)
    this.orders = [];
    localStorage.setItem('dishes', JSON.stringify(this.orders));
    this.orderService.basket.next(this.orders);
    this.orderService.addCloudOrder(newOrder)
  }

}