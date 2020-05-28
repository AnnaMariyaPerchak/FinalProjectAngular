import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private firestore: AngularFirestore) {}s
  
  addCloudUser(user:IUser):any{
    return this.firestore.collection('users').doc(user.id).set({id:user.id,
                                                   firstName:user.firstName,
                                                   lastName:user.lastName,
                                                   email:user.email,
                                                   password:user.password,
                                                   address:user.address,
                                                   phone:user.phone,
                                                   preferences:{},
                                                  //  preferences:{
                                                  //   id:user.preferences.id,
                                                  //   optionMeat: user.preferences.optionMeat,
                                                  //   optionFish: user.preferences.optionFish,
                                                  //   optionDairyProduct: user.preferences.optionDairyProduct,
                                                  //   optionSugar: user.preferences.optionSugar,
                                                  //   optionGluten: user.preferences.optionGluten},
                                                   role:user.role})
  }
  updateCloudUser(user:IUser): any {
    // delete dish.id
    return this.firestore.doc('users/'+user.id).update({
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      password:user.password,
      address:user.address,
      phone:user.phone,
      // preferences:{},
      preferences:{
       id:user.preferences.id,
       optionMeat: user.preferences.optionMeat,
       optionFish: user.preferences.optionFish,
       optionDairyProduct: user.preferences.optionDairyProduct,
       optionSugar: user.preferences.optionSugar,
       optionGluten: user.preferences.optionGluten},
      role:user.role})
  }
  getCloudUser():any{
    return this.firestore.collection('users').snapshotChanges();
  }
  getCloudOneUser(id:number):any{
    return this.firestore.collection('users').doc('id').snapshotChanges()
    // return this.http.get<IUser>(`${this.url}/${id}`)
  }
}
