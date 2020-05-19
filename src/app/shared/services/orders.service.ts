import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IOrder } from '../interfaces/order.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  basket: Subject<any> = new Subject<any>();

  constructor(private firestore: AngularFirestore) {}
  
  addCloudOrder(order:IOrder):any{
    return this.firestore.collection('orders').add({id:order.id,
                                                    userFirstName:order.userFirstName,
                                                    userLastName:order.userLastName,
                                                    userAddress:order.userAddress,
                                                    userPhone:order.userPhone,
                                                    dishesForOrder:order.dishesForOrder,
                                                    totalPayment:order.totalPayment})
  }
  getCloudOrders():any{
    return this.firestore.collection('orders').snapshotChanges();
  }
}