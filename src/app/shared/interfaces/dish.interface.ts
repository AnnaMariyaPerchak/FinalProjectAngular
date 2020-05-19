import { ICategory } from './category.interface';

export interface IDish{
    id:string,
    category:ICategory,
    name:string,
    description:string,
    weight:string,
    price:number,
    image:string,
    count:number
}