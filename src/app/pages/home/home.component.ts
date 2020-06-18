import { Component, OnInit } from '@angular/core';
import { DishService } from 'src/app/shared/services/dish.service';
import { Dish } from 'src/app/shared/modules/dish.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dishes: Array<Dish>=[]
  
  constructor(public dishService:DishService) { }

  ngOnInit(): void {
    this.getDish('soup')
  }

  getDish(category:string='soup'):void{
    this.dishService.getCloudCategoryDishes(category).subscribe(
      data => {
        this.dishes.unshift(data[0])
        this.dishes.unshift(data[1])
        this.dishes.unshift(data[2])
      }
      
    )
    this.dishes=[]
  }
}
