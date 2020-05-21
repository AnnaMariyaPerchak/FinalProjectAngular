import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { IDish } from 'src/app/shared/interfaces/dish.interface';
import { DishService } from 'src/app/shared/services/dish.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Dish } from 'src/app/shared/modules/dish.module';
// import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';

export interface DishId extends Dish { id: string }

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  private dishCollection: AngularFirestoreCollection<Dish>;

  dishes: Array<Dish>
  currentDish:any
  // arrayProducts: Array<IDish> 
  category: string
  i: number = 0
  constructor(private dishService: DishService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderService: OrdersService,
    private afs: AngularFirestore) {
    this.dishCollection = afs.collection('dishes')

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const nameOfCategory = this.activatedRoute.snapshot.paramMap.get('category');
        this.getDishes(nameOfCategory)
      }
    });
  }

  ngOnInit(): void {
    // this.dishService.getCloudDishes().subscribe(
    //   data => {
    //     this.dishes = data.map(e => {
    //       return {
    //         id: e.payload.doc.id,
    //         ...e.payload.doc.data()
    //       } as Dish;
    //     })
    //   }
    // )
  }

  private getDishes(categoryName: string = 'soup'): void {
    console.log(categoryName)
    this.dishService.getCloudCategoryDishes(categoryName).subscribe(
      data => {
        this.dishes=data
      }
    )
    // this.dishService.getCloudCategoryDishes(categoryName).onSnapshot(data => {
    //   this.dishes = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data()
    //     } as Dish;
    //   })
    // });
  }

  public addBasket(dish: IDish): void {
    let localDishes: Array<IDish> = [];
    if (localStorage.length > 0 && localStorage.getItem('dishes')) {
      localDishes = JSON.parse(localStorage.getItem('dishes'));
      if (localDishes.some(d => d.id === dish.id)) {
        const index = localDishes.findIndex(d => d.id === dish.id);
        localDishes[index].count += dish.count;
      } else {
        localDishes.push(dish);
      }
    } else {
      localDishes.push(dish);
    }
    localStorage.setItem('dishes', JSON.stringify(localDishes));
    dish.count = 1;
    this.orderService.basket.next(localDishes);
  }

  public dishCount(dish: IDish, status: boolean): void {
    if (status) {
      dish.count++;
    }
    else {
      if (dish.count > 1) {
        dish.count--;
      }
    }
  }
}
