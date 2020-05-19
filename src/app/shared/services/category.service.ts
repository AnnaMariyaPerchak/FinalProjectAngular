import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';
import { AngularFirestore} from '@angular/fire/firestore';
import 'firebase/firestore'
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore) {}

  addCloudCategory(category:ICategory):any{
    return this.firestore.collection('categories').doc(category.id).set({id:category.id,name:category.name})
    // .add({id:category.id,name:category.name})
  }
  getCloudCategories():any{
    return this.firestore.collection('categories').snapshotChanges();
  }
  deleteCloudCategory(category:ICategory):any{
    // return firebase.firestore().collection('categories').where('name','==','category.name')
    return this.firestore.doc('categories/'+category.id).delete()
  }
  updateCloudCategory(category: ICategory): any {
    // delete category.id
    return this.firestore.doc('categories/'+category.id).update({name:category.name})
  }
  getCloudOneCategory(name:string):any{
    return this.firestore.collection('categories').ref.where('name','==',name).onSnapshot(
      data=>console.log(data)
    )
  }
}