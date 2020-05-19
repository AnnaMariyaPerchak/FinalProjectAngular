import { ICategory } from '../interfaces/category.interface';
import { IDish } from '../interfaces/dish.interface';

export class Dish implements IDish{
    constructor(public id:string,
        public category:ICategory,
        public name:string,
        public description:string,
        public weight:string,
        public price:number,
        public image:string,
        public count:number=1
    ){}
}