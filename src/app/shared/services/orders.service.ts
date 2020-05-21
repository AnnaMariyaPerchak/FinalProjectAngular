import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IOrder } from '../interfaces/order.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators'
import 'firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  basket: Subject<any> = new Subject<any>();

  constructor(private firestore: AngularFirestore) {}
  
  addCloudOrder(order:IOrder):any{
    return this.firestore.collection('orders').doc(order.id).set({id:order.id,
      user:order.user,
                                                    // userFirstName:order.userFirstName,
                                                    // userLastName:order.userLastName,
                                                    // userAddress:order.userAddress,
                                                    // userPhone:order.userPhone,
                                                    dishesForOrder:order.dishesForOrder,
                                                    totalPayment:order.totalPayment,
                                                    // userEmail:userEmail
                                                  })
  }
  getCloudOrders():any{
    return this.firestore.collection('orders').snapshotChanges();
  }
  getCloudOrdersPersonal(email:string):any{
    return this.firestore.collection<any>('orders',ref=>ref.where('user.email','==',email)).snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        const data=a.payload.doc.data()
        const id=a.payload.doc.id
        console.log(email)
        return {id,...data}
      }))
    )
  }
}