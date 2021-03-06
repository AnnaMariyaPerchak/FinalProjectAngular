import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { IDish } from 'src/app/shared/interfaces/dish.interface';
import { DishService } from 'src/app/shared/services/dish.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Dish } from 'src/app/shared/modules/dish.module';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

export interface DishId extends Dish { id: string }

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  private dishCollection: AngularFirestoreCollection<Dish>;

  dishes: Array<Dish>
  currentDish: any
  categoryName: string
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
        this.categoryName = nameOfCategory
        this.getDishes(nameOfCategory)
      }
    });
  }

  ngOnInit(): void { }

  private getDishes(categoryName: string = 'soup'): void {
    this.dishService.getCloudCategoryDishes(categoryName).subscribe(
      data => {
        this.dishes = data
      }
    )
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
