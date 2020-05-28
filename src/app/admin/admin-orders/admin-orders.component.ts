import { Component, OnInit, TemplateRef } from '@angular/core';
import { IDish } from 'src/app/shared/interfaces/dish.interface';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { DishService } from 'src/app/shared/services/dish.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Dish } from 'src/app/shared/modules/dish.module';
import { Category } from 'src/app/shared/modules/category.module';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Order } from 'src/app/shared/modules/order.module';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  arrayOrders:Array<IOrder>=[]
  orderId:string

  deleteO:IOrder;

  modalRef: BsModalRef;

  search:string
  
  searchName:string
  
  constructor(private modalService: BsModalService,private orderService:OrdersService) {}

  ngOnInit(): void {
    this.getOrders()
  }

  private getOrders():void{
    this.orderService.getCloudOrders().subscribe(data => {
      this.arrayOrders = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Order;
      })
    });
  }

  

}
