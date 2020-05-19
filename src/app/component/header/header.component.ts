import { Component, OnInit } from '@angular/core';
import { IDish } from 'src/app/shared/interfaces/dish.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { LogInService } from 'src/app/shared/services/log-in.service';

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
  constructor(private orderService: OrdersService, private auth: LogInService) { }

  ngOnInit(): void {
    this.checkBasket();
    this.getLocalStorage();
    this.checkUser()
    this.checkUserLocalStorage()
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
