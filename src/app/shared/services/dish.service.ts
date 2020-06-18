import { Injectable } from '@angular/core';
import { IDish } from '../interfaces/dish.interface';
import { AngularFirestore,DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators'
import 'firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class DishService {

  currentDish: any

  constructor(private firestore: AngularFirestore, private router: Router) {
  }


  addCloudDish(dish: IDish): any {
    return this.firestore.collection('dishes').doc(dish.id).set({
      id: dish.id,
      category: { id: dish.category.id, name: dish.category.name },
      name: dish.name,
      description: dish.description,
      weight: dish.weight,
      price: dish.price,
      image: dish.image,
      count: dish.count})
  }
  getCloudDishes(): any {
    return this.firestore.collection('dishes').snapshotChanges();
  }
  deleteCloudDish(dish: IDish): any {
    return this.firestore.doc('dishes/' + dish.id).delete()
  }
  updateCloudDish(dish: IDish): any {
    return this.firestore.doc('dishes/' + dish.id).update({
      category: { id: dish.category.id, name: dish.category.name },
      name: dish.name,
      description: dish.description,
      weight: dish.weight,
      price: dish.price,
      image: dish.image,
      count: dish.count
    })
  }
  getCloudOneDish(id: string): any {
    return this.firestore.collection('dishes').doc('id').snapshotChanges()
  }
  getCloudCategoryDishes(categoryName: string): any {
    return this.firestore.collection<any>('dishes',ref=>ref.where('category.name', '==', categoryName)).snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        const data=a.payload.doc.data();
          const id=a.payload.doc.id;
        // console.log({id,...data})
        return {id,...data}
      }))
    )
  }
}
