import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDish } from '../interfaces/dish.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  currentDish:any

  constructor(private firestore: AngularFirestore,private router: Router) {
  }


  addCloudDish(dish:IDish):any{
    return this.firestore.collection('dishes').doc(dish.id).set({id:dish.id,
                                                        category:{id:dish.category.id,name:dish.category.name},
                                                        name:dish.name,
                                                        description:dish.description,
                                                        weight:dish.weight,
                                                        price:dish.price,
                                                        image:dish.image,
                                                        count:dish.count})
  }
  getCloudDishes():any{
    return this.firestore.collection('dishes').snapshotChanges();
  }
  deleteCloudDish(dish:IDish):any{
    return this.firestore.doc('dishes/'+dish.id).delete()
  }
  updateCloudDish(dish:IDish): any {
    // delete dish.id
    return this.firestore.doc('dishes/'+dish.id).update({
      category:{id:dish.category.id,name:dish.category.name},
      name:dish.name,
      description:dish.description,
      weight:dish.weight,
      price:dish.price,
      image:dish.image,
      count:dish.count})
  }
  getCloudOneDish(id:string):any{
    return this.firestore.collection('dishes').doc('id').snapshotChanges()
  }
  getCloudCategoryDishes(categoryName: string):any{
    return this.firestore.collection('dishes').ref.where('category.name','==',categoryName).onSnapshot(
      dishes=>dishes.forEach(dish=>{
        this.currentDish=dish.data()
        // console.log(this.currentDish)
        if (this.currentDish.category.name===categoryName){
          console.log(this.currentDish)
        }
      }
        )
    )
      // dish=>dish.forEach(dishRef=>
      //   this.currentDish=dishRef.data()
      //   // console.log(dishRef.data())
      //   if (this.currentDish.category.name==categoryName){}
      // )
      // )
    
    // return this.http.get<Array<IDish>>(`${this.url}?category.name=${categoryName}`);
  }
}
