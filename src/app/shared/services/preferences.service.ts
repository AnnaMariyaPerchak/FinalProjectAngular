import { Injectable } from '@angular/core';
import { IPreference } from '../interfaces/preference.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  preference: Subject<IPreference> = new Subject<IPreference>();

  constructor(private firestore: AngularFirestore) { }
  
  addCloudPreference(preference:IPreference):any{
    return this.firestore.collection('preferences').doc(preference.id).set({id:preference.id,
                                                    optionMeat: preference.optionMeat,
                                                    optionFish: preference.optionFish,
                                                    optionDairyProduct: preference.optionDairyProduct,
                                                    optionSugar: preference.optionSugar,
                                                    optionGluten: preference.optionGluten})
  }
  getCloudPreferences():any{
    return this.firestore.collection('preferences').snapshotChanges();
  }
  getCloudOneUserPreference(id:number):any{
    return this.firestore.collection('preferences').doc('id').snapshotChanges()
    // return this.http.get<IPreference>(`${this.url}/${id}`)
  }
  updateCloudPreference(preference:IPreference): any {
    // delete category.id
    return this.firestore.doc('preferences/'+preference.id).update({optionMeat: preference.optionMeat,
      optionFish: preference.optionFish,
      optionDairyProduct: preference.optionDairyProduct,
      optionSugar: preference.optionSugar,
      optionGluten: preference.optionGluten})
  }
}
