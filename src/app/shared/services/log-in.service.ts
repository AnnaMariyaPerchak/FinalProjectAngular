import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import 'firebase/firestore'
import { IPreference } from '../interfaces/preference.interface';

@Injectable({
  providedIn: 'root'
})
export class LogInService {


  

  userStatusChanges: Subject<any> = new Subject<any>();
  currentUser: any;
  checkUserLogin: boolean;
  checkAdminLogin: boolean;

  constructor(private http: HttpClient, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
    
  }

  // login(): Observable<IUser> {
  //   return this.http.get<IUser>(this.url);  
  // }

  signUp(firstName: string,lastName: string,
        email: string, password: string,
        phone: string,address: string,
        preferences:IPreference) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        const user = {
          role: 'user',
          id: userResponse.user.uid,
          firstName:firstName,
          lastName:lastName,
          email: userResponse.user.email,
          password:password,
          phone:phone,
          address:address,
          preferences:{id:preferences.id,optionMeat:preferences.optionMeat,
            optionFish: preferences.optionFish,
            optionDairyProduct: preferences.optionDairyProduct,
            optionSugar: preferences.optionSugar,
            optionGluten: preferences.optionGluten}
          // preferences:{}
        }
        this.firestore.collection('users').doc(user.id).set(user)
          // .then(data => {
          //   data.get().then(x => {
          //     console.log(x.data());
          //   });
          // })
          // .catch(err => console.log('get data firestore collection', err));
          // alert(err)
      })
      .catch(err => {console.log('create user', err);});
  }

  signIn(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        // console.log(user);
        this.firestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(
          users => {
            users.forEach(userRef => {
              this.currentUser = userRef.data();
              console.log(this.currentUser)
              localStorage.setItem('user', JSON.stringify(this.currentUser));
              if (this.currentUser.role !== 'admin') {
                this.checkUserLogin = true;
                this.userStatusChanges.next('user');
                this.router.navigateByUrl('profile');
              }
              else {
                this.checkAdminLogin = true;
                this.userStatusChanges.next('admin');
                this.router.navigateByUrl('admin');
              }
            });
          }
        );
      })
      .catch(
        err => {
          // console.log('user sign in ', err)
          alert(`user sign in ${err}`)
          this.router.navigateByUrl('log-in')
        }
      );
  }

  signOut() {
    this.afAuth.signOut()
      .then(() => {
        console.log('user signed out successfully');
        localStorage.removeItem('user');
        this.userStatusChanges.next('signOut');
        this.checkUserLogin = false;
        this.checkAdminLogin = false;
        this.router.navigateByUrl('home');
      })
      .catch(err => console.log('SignOut error', err));
  }
}
