import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { IDish } from 'src/app/shared/interfaces/dish.interface';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { Order } from 'src/app/shared/modules/order.module';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  orders: Array<IDish> = [];
  userFirstName:string='Ivan'
  userLastName:string='Ivanov'
  userAddress:string='Naykova 45,67'
  userPhone:string='380673459027'

  totalPrice:number

  makeOrder:boolean=true

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.checkBasket();
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

  public addOrder(): void {
    if (localStorage.getItem('user')){
      this.makeOrder=true;
      console.log(localStorage.getItem('user'))
      alert('Your order is being prepared')
    }
    else if (!localStorage.getItem('user')){this.makeOrder=false}
    const newOrder: IOrder = new Order(null,
                                      this.userFirstName,
                                      this.userLastName,
                                      this.userAddress,
                                      this.userPhone,
                                      this.orders,
                                      this.totalPrice)
    this.orders = [];
    localStorage.setItem('dishes', JSON.stringify(this.orders));
    this.orderService.basket.next(this.orders);
    this.orderService.addCloudOrder(newOrder)
  }
}
