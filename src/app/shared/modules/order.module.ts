import { IOrder } from '../interfaces/order.interface';
import { IDish } from '../interfaces/dish.interface';

export class Order implements IOrder{
    constructor(public id:number,
        public userFirstName:string='Ivan',
        public userLastName:string='Ivamov',
        public userAddress:string='Naykova 45,67',
        public userPhone:string='+380673459027',
        public dishesForOrder:Array<IDish>,
        public totalPayment:number){}
}