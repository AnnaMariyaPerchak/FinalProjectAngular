import { IDish } from './dish.interface';

export interface IOrder{
    id:number,
    userFirstName:string,
    userLastName:string,
    userAddress:string,
    userPhone:string,
    dishesForOrder:Array<IDish>,
    totalPayment:number
}
    // orderStatus: boolean;