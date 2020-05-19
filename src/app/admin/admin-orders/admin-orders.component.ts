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

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  arrayOrders:Array<IOrder>=[]
  orderId:string
  // arrayProducts:Array<IDish>=[]
  
  // arrayCategories:Array<ICategory>=[
    // {id:'a0ef7164-e581-4263-a448-58281db45376',name:'soup'},
    // {id:'f928ea93-325f-49ca-b6d0-fb0f840ed240',name:'pasta'},
    // {id:'872f6f9c-c4e8-44d8-ac3f-ac84569afd4d',name:'bowl'},
    // {id:'f518b3de-9f52-4026-93b9-48dfe7fa78a7',name:'fish'},
    // {id:'09908d69-016d-45bb-bcff-d64e9cbac52d',name:'meat'},
    // {id:'4a46c615-fe81-4bfe-83d0-0f88e6a46a5d',name:'salad'},
    // {id:'e2323444-744f-46da-b805-db409cafb4cd',name:'bakery'},
    // {id:'c9edd853-cc17-4967-85e4-7899d844a9ef',name:'sweets'},
    // {id:'9e7e1a5d-725f-4227-b851-44e319fdbebb',name:'smoothie'},
  // ]

  // category:string
  
  // newCategory:ICategory={id:1,name:'soup'}
  // newCategory:string
  // cat:number
  // categoryId:string
  // categoryName:string
  // newName:string
  // newDescription:string
  // newWeight:string
  // newPrice:number
  // productImage:string
  // productImage:'https://www.lapiec-pizza.com.ua/wp-content/uploads/2018/07/Flamingo-1.jpg'

  // productId:string

  // deleteProd:IDish;

  modalRef: BsModalRef;

  search:string
  
  searchName:string
  
  // editStatus: boolean;

  // selected :string

  // uploadProgress: Observable<number>;
  
  constructor(private modalService: BsModalService,
              // private productService:DishService,
              // private categoryService:CategoryService,
              // private afStorage:AngularFireStorage,
              private orderService:OrdersService) {}
//  
  ngOnInit(): void {
    // this.getProduct()
    // this.getCategory()
    // console.log(this.arrayCategories)
    // console.log(this.arrayCategories)
    this.getOrders()
  }


  // deleteModal(template: TemplateRef<any>,product:IDish) {
  //   this.modalRef = this.modalService.show(template);
  //   this.modalRef.setClass('modal-sm');
  //   this.deleteProd=product
  // }
  
  private getOrders():void{
    this.orderService.getCloudOrders().subscribe(data => {
      this.arrayOrders = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Dish;
      })
    });
  }


  
  // deleteProduct(product:IDish):void{
  //   this.productService.deleteCloudDish(product)
  //   this.getProduct()
  //   // .subscribe(
  //   //   ()=>{this.getProduct()}
  //   // )
  //   this.modalRef.hide()
  // }
  // dismissProduct():void{
  //   this.modalRef.hide()
  // }
  

}
