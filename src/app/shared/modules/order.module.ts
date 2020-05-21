import { IOrder } from '../interfaces/order.interface';
import { IDish } from '../interfaces/dish.interface';
import { User } from './user.module';

export class Order implements IOrder{
    constructor(public id:string,
        public     user:User,
        // public userFirstName:string,
        // public userLastName:string,
        // public userAddress:string,
        // public userPhone:string,
        public dishesForOrder:Array<IDish>,
        public totalPayment:number
        // public userEmail:string
        ){}
}